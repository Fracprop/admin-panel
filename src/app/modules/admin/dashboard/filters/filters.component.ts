import {
    Component,
    OnInit,
    ChangeDetectorRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { CommonService } from '../../common/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    /**
     * Properties declarations
     */
    public facilities$ = [];
    public facilityTypes$ = [];
    public states$ = [];
    public districts$ = [];
    public form: FormGroup;
    public currentDate = new Date();
    public userDetails: any = JSON.parse(localStorage.getItem('user')) || null;

    @Output() dashboardData = new EventEmitter();
    @Output() facilityData = new EventEmitter();
    @Output() genderData = new EventEmitter();
    @Output() consultationData = new EventEmitter();
    @Output() consultationPerData = new EventEmitter();
    @Output() districtData = new EventEmitter();
    @Output() districtId = new EventEmitter();
    @Output() resetData = new EventEmitter();

    /**
     * Constructor method
     * @param _commonService
     * @param _formBuilder
     * @param _changeDetectorRef
     */
    constructor(
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dashboardService: DashboardService
    ) {
        this.getDashboardData();
        this.getDistrictsList();
        this.getGenderData();
        this.getFacilityTypeData();
        this.getConsultationsData();
        this.getConsultationsPerData();
    }

    ngOnInit(): void {
        /**
         * Filter's form initialization
         */
        this.form = this._formBuilder.group({
            Facility_Type_Id: [null],
            State_Id: [[]],
            District_Id: [''],
            Facility_Id: [[]],
            from_date: [null],
            to_date: [null],
        });

        /**
         * initialising arrays
         */

        // this.getDashboardData();
        // this.getDistrictsList();
        // this.getGenderData();
        // this.getFacilityTypeData();
        // this.getConsultationsData();
        // this.getConsultationsPerData();
    }

    /**
     * On selecting Facility type, Facility or State update the Dashboard
     */
    submit(): void {
        this.districtId.emit(this.form?.value.District_Id);
        this.resetData.emit(null);
        this.getDashboardData();
        this.getDistrictsList();
        this.getGenderData();
        this.getFacilityTypeData();
        this.getConsultationsData();
        this.getConsultationsPerData();
        this.getDistrictLineChart();
    }

    /**
     * get Facility Types List
     */

    getFacilityTypesList(): void {
        this._commonService.getFacilityTypes({}).subscribe((response) => {
            this.facilityTypes$ = [...response];
        });
    }

    /**
     * get District
     */

    getDistrictsList(): void {
        this._commonService.getDistricts({}).subscribe((response) => {
            this.districts$ = [...response.lstModel];
        });
    }
    /**
     * Reset Filters
     */
    resetFilter() {
        this.form.reset();

        this.getDashboardData();
        this.resetDashboard();
        this.getGenderData();
        this.getFacilityTypeData();
        this.getConsultationsData();
        this.getConsultationsPerData();
    }

    /**
     * Get dashboard data
     */
    resetDashboard() {
        this.resetData.emit('resetDashboard');
    }

    getDashboardData() {
        this._dashboardService
            .getCounters({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.dashboardData.emit({ ...res.model });
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }
    /**
     * Get Pie chart data
     */
    getGenderData() {
        this._dashboardService
            .getGenderCounters({ ...this.createParams() })
            .subscribe(
                (res) => {
                    let data = res.lstModel.map(({ value }) => {
                        return value;
                    });
                    let label = res.lstModel.map(({ label }) => {
                        return label;
                    });
                    this.genderData.emit({ value: data, label: label });
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }
    getFacilityTypeData() {
        this._dashboardService
            .GetBacthActiveMembersCount({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.facilityData.emit({ ...res.model, isFacility: true });
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }
    /**
     * Get graph data
     */
    getConsultationsPerData() {
        this._commonService
            .GetConsultationPerDay({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.consultationPerData.emit([...res.lstModel]);
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }
    /**
     * Get graph data
     */
    getConsultationsData() {
        this._dashboardService
            .GetBacthVCCount({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.consultationData.emit({
                        ...res.lstModel[0],
                        isConsultation: true,
                    });
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }
    /**
     * Get graph data
     */
    getDistrictLineChart() {
        this._dashboardService
            .GetDistrictLineChart({ ...this.createParams() })
            .subscribe(
                (res) => {
                    let data = res.lstModel.map(({ value }) => {
                        return value;
                    });
                    let label = res.lstModel.map(({ label }) => {
                        return label;
                    });
                    this.districtData.emit({ value: data, label: label });
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {}
            );
    }

    /**
     * Creating params for dashboard API
     */

    createParams(): object {
        let obj = {
            FieldName: '',
            MapSelectionType: 'HealthFacility',
            RecordId: this.form?.value.District_Id || '19',
            SelectionType: 'W',
            Type: this.form?.value.District_Id ? 3 : 2,
        };

        return { ...obj };
    }
}
