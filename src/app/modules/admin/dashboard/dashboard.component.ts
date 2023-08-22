import { Title } from '@angular/platform-browser';

import {
    Component,
    OnInit,
    SimpleChanges,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import { CommonService } from '../common/common.service';
import { DashboardService } from './dashboard.service';

import { FormBuilder, Form } from '@angular/forms';
import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexFill,
    ApexXAxis,
    ApexDataLabels,
    ApexLegend,
    ChartComponent,
    ApexAxisChartSeries,
    ApexTooltip,
    ApexStroke,
    ApexPlotOptions,
    ApexYAxis,
} from 'ng-apexcharts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup } from '@angular/forms';
import { values } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    fill: ApexFill;
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
    markers: ApexFill;
};

export type ChartOptions1 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
};

export type ChartOptions2 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public dashboardData: any = null;
    public genderData: any = [];
    public facilityData: any = null;
    public activefacilityData: any = null;
    public consultationData: any = null;
    public consultationPerData: any = null;
    public districtData: any = null;
    public districtID = null;
    public resetData = null;
    public isFacilityData = false;
    public isAtiveFacilityData = false;
    public loadingConsultationTime = false;
    public isDashboardCounters = false;
    // public usershub: any = null;
    // public userspoke: any = null;
    // public userhubspoke: any = null;
    // public users: any = null;
    form: FormGroup;
    commonForm: FormGroup;

    public districtListInner$: any = [];
    public districtGraphData: any = [];
    public districtGraphData1: any = [];
    public districtGraphData2: any = [];

    @ViewChild('chart')
    chart: ChartComponent;
    @ViewChild('chart1') chart1: ChartComponent;
    @ViewChild('chart2') chart2: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions1: Partial<ChartOptions1>;
    public chartOptions2: Partial<ChartOptions2>;

    constructor(
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dashboardService: DashboardService,
        private _router: Router,
        private _authService: AuthService,
        private _errorService: ErrorHandlingService
    ) {}

    ngOnInit(): void {
        this.commonForm = this._formBuilder.group({
            District_Id: [''],
        });
        this.commonForm.controls['District_Id'].setValue(
            this._authService.user.districtId
        );
        this.form = this._formBuilder.group({
            RecordId: [0],
            RecordId1: [0],
            SelectionType: ['W'],
        });
        this.form.controls['RecordId'].setValue(
            this._authService.user.districtId
        );
        this.form.controls['RecordId1'].setValue(
            this._authService.user.districtId
        );

        // this.getDistrictsList();
        // this.getDashboardData();
        if (this._authService.user.districtDisplayName) {
            this.getDistrictLineChart();
        }
        // this.getGenderData();
        // this.getFacilityTypeData();
        // this.getActiveFacilityTypeData();
        // this.getConsultationsData();
        // this.getConsultationsPerData();
        // this.getAllUser();
        // this.getUsershub();
    }

    ngOnChanges(changes: SimpleChanges): void {}
    getLineChart(item: any) {
        let data = item.map(({ value }) => {
            return value;
        });
        let label = item.map(({ label }) => {
            return label;
        });
        this.chartOptions2 = {
            series: [
                {
                    name: 'facilities',
                    data: data,
                },
            ],
            chart: {
                type: 'bar',
                height: 500,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                labels: {
                    rotate: -90,
                },
                categories: label,
            },
            yaxis: {
                title: {
                    text: 'No. of Active Health facilities',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' ';
                    },
                },
            },
        };
    }
    getDonutChart(item: any) {
        var label = item.map(({ label }) => {
            return label;
        });
        var value = item.map(({ value }) => {
            return value;
        });

        this.chartOptions = {
            series: value,
            chart: {
                width: 380,
                type: 'donut',
            },

            labels: label,
            dataLabels: {
                enabled: true,
            },

            legend: {
                formatter: function (val, opts) {
                    return (
                        val + ' - ' + opts.w.globals.series[opts.seriesIndex]
                    );
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        };
    }
    getGraph(item: any, item1: any, item2: any) {
        let seriesArray: any = [];

        if (item.length) {
            var label = item.map(({ label }) => {
                return label;
            });
            var value = item.map(({ value }) => {
                return value;
            });
            seriesArray.push({
                name: this.commonForm.value.District_Id
                    ? this.getDistrictsName(this.commonForm.value.District_Id)
                    : 'WB',
                data: value,
            });
        }

        if (item1.length) {
            var label = item1.map(({ label }) => {
                return label;
            });
            var value1 = item1.map(({ value }) => {
                return value;
            });
            seriesArray.push({
                name: this.getDistrictsName(this.form.value.RecordId1),
                data: value1,
            });
        }
        if (item2.length) {
            var label = item2.map(({ label }) => {
                return label;
            });
            var value2 = item2.map(({ value }) => {
                return value;
            });
            seriesArray.push({
                name: this.getDistrictsName(this.form.value.RecordId),
                data: value2,
            });
        }

        this.chartOptions1 = {
            series: seriesArray,

            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                //type: 'numeric',
                categories: label,
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy',
                },
            },
        };
    }
    getDistrictsList(): void {
        this._commonService.getDistricts({}).subscribe((response) => {
            this.districtListInner$ = response.lstModel
                ? [...response.lstModel]
                : [];
        });
    }

    getDashboardData() {
        this.isDashboardCounters = true;
        this._dashboardService
            .getCounters({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.isDashboardCounters = false;
                    this.dashboardData = { ...res.model };
                },
                (err) => {
                    this.isDashboardCounters = false;
                }
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
                    this.genderData = res.lstModel ? [...res.lstModel] : [];
                    this.getDonutChart(this.genderData);
                },
                (err) => {}
            );
    }
    getFacilityTypeData() {
        this.facilityData = null;
        this.isFacilityData = true;
        this._dashboardService
            .GetBacthActiveMembersCount({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.facilityData = { ...res.model };
                },
                (err) => {
                    this.isFacilityData = false;
                }
            );
    }

    // getAllUser() {
    //     let paginationParams = {
    //         InstitutionTypeId: 0,
    //         SkipRecords: 0,
    //         LimitRecords: 10,
    //     };
    //     if (this.commonForm?.value.District_Id) {
    //         paginationParams['DistrictID'] = this.commonForm?.value.District_Id;
    //     }
    //     this._dashboardService.getAdmins({ ...paginationParams }).subscribe(
    //         (response) => {
    //             if (!response.success) {
    //                 if (response.requestCode == 401) {
    //                     return;
    //                 } else {
    //                     let msg = this._errorService.errorMessage(response);
    //                     this._commonService.error(msg);
    //                 }
    //             } else {
    //                 this.users = response;
    //                 this._changeDetectorRef.detectChanges();
    //             }
    //         },
    //         (err) => {}
    //     );
    // }

    getActiveFacilityTypeData() {
        this.isFacilityData = true;
        this.activefacilityData = {};
        this._dashboardService
            .getActiveMemberDetails({ ...this.createParams() })
            .subscribe(
                (res) => {
                    this.isFacilityData = false;

                    this.activefacilityData = { ...res.model };
                },
                (err) => {
                    this.isFacilityData = false;
                }
            );
    }
    /**
     * Get graph data
     */
    // getConsultationsPerData() {
    //     this._commonService
    //         .GetConsultationPerDay({ ...this.createParams() })
    //         .subscribe(
    //             (res) => {
    //                 this.consultationPerData.emit([...res.lstModel]);
    //                 this._changeDetectorRef.detectChanges();
    //             },
    //             (err) => {}
    //         );
    // }
    /**
     * Get graph data
     */
    getConsultationsData() {
        this.loadingConsultationTime = true;
        this._dashboardService
            .GetBacthVCCount({
                ...this.createParams(),
            })
            .subscribe(
                (res) => {
                    this.loadingConsultationTime = false;
                    this.consultationData = {
                        ...res?.lstModel[0],
                    };
                    this._changeDetectorRef.detectChanges();
                },
                (err) => {
                    this.loadingConsultationTime = false;
                }
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
                    this.districtData =
                        res?.lstModel !== null ? [...res?.lstModel] : [];
                    this.getLineChart(this.districtData);
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
            RecordId: this.commonForm?.value.District_Id || '19',
            SelectionType: 'W',
            type: this.commonForm?.value.District_Id ? 3 : 2,
        };

        return { ...obj };
    }
    /**
     * Get graph data
     */
    /**
     * Get graph data
     */
    getConsultationsPerData() {
        this.districtGraphData = [];
        let obj = {
            FieldName: '',
            MapSelectionType: 'HealthFacility',
            RecordId: this.commonForm?.value.District_Id || '19',
            SelectionType: this.form?.value.SelectionType || 'W',

            Type: this.commonForm?.value.District_Id ? 3 : 2,
        };
        this._commonService.GetConsultationPerDay({ ...obj }).subscribe(
            (res) => {
                this.consultationPerData =
                    res?.lstModel !== null ? [...res?.lstModel] : [];
                this.districtGraphData =
                    res?.lstModel !== null ? [...res?.lstModel] : [];
                this.getGraph(
                    this.districtGraphData,
                    this.districtGraphData1,
                    this.districtGraphData2
                );
            },
            (err) => {}
        );
    }
    getDataByDistrict() {
        this.districtGraphData2 = [];
        let obj = {
            FieldName: '',
            MapSelectionType: 'HealthFacility',
            RecordId: this.form?.value.RecordId || '19',
            SelectionType: this.form?.value.SelectionType || 'W',

            Type: this.form?.value.RecordId ? 3 : 2,
        };

        if (this.form?.value.RecordId) {
            obj['RecordId'] = this.form?.value.RecordId;
        }
        if (this.form?.value.SelectionType) {
            obj['SelectionType'] = this.form?.value.SelectionType;
        }
        this._commonService.GetConsultationPerDay({ ...obj }).subscribe(
            (res) => {
                this.districtGraphData2 =
                    res?.lstModel !== null ? [...res?.lstModel] : [];

                this.getGraph(
                    this.districtGraphData,
                    this.districtGraphData1,
                    this.districtGraphData2
                );
                //  this.consultationPerData.emit({ ...res.lstModel });
            },
            (err) => {}
        );
    }
    getDataByDistrict1() {
        this.districtGraphData1 = [];
        let obj = {
            FieldName: '',
            MapSelectionType: 'HealthFacility',
            RecordId: this.form?.value.RecordId1 || '19',
            SelectionType: this.form?.value.SelectionType || 'W',

            Type: this.form?.value.RecordId1 ? 3 : 2,
        };
        if (this.form?.value.RecordId) {
            obj['RecordId'] = this.form?.value.RecordId1;
        }
        if (this.form?.value.SelectionType) {
            obj['SelectionType'] = this.form?.value.SelectionType;
        }
        this._commonService.GetConsultationPerDay({ ...obj }).subscribe(
            (res) => {
                this.districtGraphData1 =
                    res?.lstModel !== null ? [...res?.lstModel] : [];

                this.getGraph(
                    this.districtGraphData,
                    this.districtGraphData1,
                    this.districtGraphData2
                );
                //  this.consultationPerData.emit({ ...res.lstModel });
            },
            (err) => {}
        );
    }
    getDataByWMY() {
        this.districtGraphData1 = [];
        this.districtGraphData = [];
        this.districtGraphData2 = [];

        this.getConsultationsPerData();

        if (this.form.value.RecordId != 0) {
            this.getDataByDistrict();
        }
        if (this.form.value.RecordId != 0) {
            this.getDataByDistrict1();
        }
    }
    resetFilter() {
        this.commonForm.reset();
        this.form.reset();
        // this.form.value.SelectionType = 'W';
        this.form['controls']['SelectionType'].setValue('W');
        this.districtGraphData1 = [];
        this.districtGraphData = [];
        this.districtGraphData2 = [];

        this.getDashboardData();
        this.getGenderData();
        this.getFacilityTypeData();
        this.getActiveFacilityTypeData();
        this.getConsultationsData();
        this.getConsultationsPerData();
        // this.getAllUser();
        // this.getUsershub();
    }
    submit(): void {
        this.getDashboardData();
        this.getDistrictsList();
        this.getGenderData();
        this.getFacilityTypeData();
        this.getActiveFacilityTypeData();
        this.getConsultationsData();
        this.getConsultationsPerData();
        this.getDistrictLineChart();
        // this.getAllUser();
        // this.getUsershub();
    }
    /**
     * Fetching district name over selected district id
     */
    getDistrictsName(id): void {
        let districtName;

        this.districtListInner$.filter((e) => {
            id == e.districtId ? (districtName = e.districtName) : '';
        });

        return districtName;
    }
    navigateToOnlineDoctors() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/reports/active-users'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                },
            });
        } else this._router.navigateByUrl('/reports/active-users');
    }
    navigateToInactiveUsers() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/reports/inactive-users'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                },
            });
        } else this._router.navigateByUrl('/reports/inactive-users');
    }
    navigateToDormantUsers() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/reports/dormant-users'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                },
            });
        } else this._router.navigateByUrl('/reports/dormant-users');
    }

    navigateToUniquePatients() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/reports/unique-patients'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                },
            });
        } else this._router.navigateByUrl('/reports/unique-patients');
    }

    navigateToHealthFacilities() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/facilities/list'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                },
            });
        } else this._router.navigateByUrl('/facilities/list');
    }

    navigateToConsultationStatus() {
        if (this.commonForm?.value.District_Id) {
            this._router.navigate(['/reports/consultation-status'], {
                queryParams: {
                    DistrictID: this.commonForm?.value.District_Id,
                    status: 'complete',
                },
            });
        } else
            this._router.navigate(['/reports/consultation-status'], {
                queryParams: {
                    status: 'complete',
                },
            });
    }
}
