import { Component, OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserManagementService } from '../user-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import {
    MOBILE_NUMBER,
    EMAIL_REGEX,
    PINCODE,
    ONLYCHARACTERS,
} from '../../common/regex.constants';
import { CommonService } from '../../common/common.service';
import { SELECTED_STATE } from '../../common/common.constants';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import {
    gender,
    qualifications,
    Weekdays,
    namePrefixes,
} from '../../common/common.constants';
import { TranslocoService } from '@ngneat/transloco';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';
import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { AuthService } from 'app/core/auth/auth.service';

/**
 * Creating service for seven days selection date range
 */
@Injectable()
export class SevenDayRangeSelectionStrategy<D>
    implements MatDateRangeSelectionStrategy<D>
{
    constructor(private _dateAdapter: DateAdapter<D>) {}

    selectionFinished(date: D | null): DateRange<D> {
        return this._createSevenDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createSevenDayRange(activeDate);
    }

    private _createSevenDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = this._dateAdapter.addCalendarDays(date, 0);
            const end = this._dateAdapter.addCalendarDays(date, 6);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}
@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: SevenDayRangeSelectionStrategy,
        },
    ],
})
export class EditUserComponent implements OnInit {
    public facilityTypes$ = [];
    public facilities$ = [];
    public facilityNames$ = [];
    public userRoleList$ = [];
    public userList$ = [];
    public speciality$ = [];
    public namePrefixes$ = namePrefixes;
    public districts$ = [];
    public cities$ = [];
    public subFacilityTypes$ = [];
    public blocksList$ = [];
    public loading = false;
    public isQuery = false;
    public query: any = {};
    public municipalityList$ = [];
    public wardList$ = [];
    public gramPanchayatList$ = [];
    public gender$ = [...gender];
    public qualifications$ = [...qualifications];
    public weekdays$ = [...Weekdays];
    public selectedDateRange: DateRange<Date> = new DateRange(
        new Date(),
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    public dates_list: any = [];
    form: FormGroup;
    selectedUser: any;
    get userRoles() {
        return this.form.controls.userMenu as FormArray;
    }

    public currentDate = new Date();
    constructor(
        private titleService: Title,
        private _userService: UserManagementService,
        private _r: Router,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _translocoService: TranslocoService,
        private _errorService: ErrorHandlingService,
        private _authService: AuthService
    ) {
        /**
         * Fetching params here to further get user details
         */
        this.titleService.setTitle('FracProp - Edit User');
        this._activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id')) {
                this.selectedUser = params.get('id');
                this.fetchUserDetails();
            }
        });
    }
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            userType: [null],
            userMenu: new FormArray([]),
            institutionTypeId: [null, [Validators.required]],
            facility_id: [this.selectedUser],
            institutionId: [null, [Validators.required]],
            institutionSubTypeId: [null, [Validators.required]],
            prefix: ['Dr.'],

            firstName: [
                null,
                [
                    Validators.required,
                    Validators.pattern(ONLYCHARACTERS),

                    this._commonService.noWhitespaceValidator,
                ],
            ],
            middleName: [null, [Validators.pattern(ONLYCHARACTERS)]],
            lastName: [
                null,
                [
                    Validators.required,
                    Validators.pattern(ONLYCHARACTERS),
                    this._commonService.noWhitespaceValidator,
                ],
            ],

            qualificationId: [null, [Validators.required]],
            specializationId: [null, [Validators.required]],
            day: [[], [Validators.required]],
            dob: [null, [Validators.required]],
            genderId: [null, [Validators.required]],

            slotFrom: [null, [Validators.required]],
            slotTo: [null, [Validators.required]],
            userName: [null, [Validators.required]],
            pinCode: [null, [Validators.required, Validators.pattern(PINCODE)]],
            wardId: [null],
            grampanchayatId: [null],
            cityId: [null],
            districtId: [null, [Validators.required]],
            blockId: [null],
            municipalityId: [null],
            regionType: ['Urban', [Validators.required]],
            addressLine1: [
                null,
                [
                    Validators.required,
                    this._commonService.noWhitespaceValidator,
                ],
            ],
            addressLine2: [null, []],

            email: [
                null,
                [Validators.required, Validators.pattern(EMAIL_REGEX)],
            ],
            mobile: [
                null,
                [Validators.required, Validators.pattern(MOBILE_NUMBER)],
            ],
        });
    }

    getFacilityTypesList(): void {
        this.facilityNames$ = [];
        this._commonService.getFacilityTypes({}).subscribe((response) => {
            this.facilityTypes$ = response.lstModel?.length
                ? [...response.lstModel]
                : [];

            this.getSubFacilityTypesList();
        });
    }
    getSubFacilityTypesList(): void {
        this.facilityNames$ = [];
        // this.form.patchValue({
        //     userType: null,
        // });
        if (this.form.value.institutionTypeId == 1) {
            this.form.patchValue({
                userType: 'doctor',
            });
        }
        if (this.form.value.institutionTypeId == 3) {
            this.form.patchValue({
                userType: 'cho',
            });
        }
        this._commonService
            .getSubFacilityTypes({
                typeid: this.form.value['institutionTypeId'],
            })
            .subscribe((response) => {
                this.subFacilityTypes$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];
                this.getFacilities();
            });
    }

    getFacilities() {
        this.facilityNames$ = [];
        let parms = {
            Facility_Type_ID: this.form.value['institutionTypeId'] || 1,
            Facility_SubType_ID: this.form.value['institutionSubTypeId'] || 0,
        };
        this._commonService
            .getFacilities({ ...parms })
            .subscribe((response) => {
                if (response.lstModel?.length) {
                    this.facilityNames$ = [...response?.lstModel];
                }
            });
    }
    getDistrictsList(): void {
        this._commonService.getDistricts({}).subscribe((response) => {
            this.districts$ = response.lstModel?.length
                ? [...response.lstModel]
                : [];
            this.getCities();
        });
    }

    /**
     * Fetching all cities over selected district
     */
    getCities() {
        this._commonService
            .getCities(this.form.value?.districtId)
            .subscribe((response) => {
                this.cities$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];
                this.getBlocksList();
                this.getMunicipalityList();
            });
    }
    /**
     * Fetching all blocks over selecting district
     */
    getBlocksList(): void {
        this._commonService
            .getBlocks({
                districtId: this.form.value['districtId'],
            })
            .subscribe((response) => {
                this.blocksList$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];
                if (this.form.value['districtId']) {
                    this.getGramPanchayatList();
                }
            });
    }

    /**
     * Fetching all blocks over selecting district
     */
    getMunicipalityList(): void {
        this._commonService
            .getMunicipality({
                districtId: this.form.value['districtId'],
                cityId: this.form.value['cityId'],
            })
            .subscribe((response) => {
                this.municipalityList$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];

                if (
                    this.form.value['districtId'] &&
                    this.form.value['cityId']
                ) {
                    this.getWardList();
                }
            });
    }

    getWardList(): void {
        this._commonService
            .getWards({
                districtId: this.form.value['districtId'],
                cityId: this.form.value['cityId'],
                municipalityId: this.form.value['municipalityId'],
            })
            .subscribe((response) => {
                this.wardList$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];
            });
    }

    getGramPanchayatList(): void {
        this._commonService
            .getGramPanchayat({
                districtId: this.form.value['districtId'],
                blockId: this.form.value['blockId'],
            })
            .subscribe((response) => {
                this.gramPanchayatList$ = response.lstModel?.length
                    ? [...response.lstModel]
                    : [];
            });
    }

    /**
     * Fetching all qualification list
     */
    getQualificationList(): void {
        this._commonService.getQualification().subscribe((response) => {
            this.qualifications$ = response.lstModel?.length
                ? [...response.lstModel]
                : [];
        });
    }
    /**
     * Fetching all speciality list
     */
    getSpecialityList(): void {
        this._commonService.getSpeciality().subscribe((response) => {
            this.speciality$ = response.lstModel?.length
                ? [...response.lstModel]
                : [];
        });
    }
    specialityChange(id) {
        if (id === 24 || id === 25) {
            this.form.controls['slotFrom'].setValue('12:00 AM');
            this.form.controls['slotTo'].setValue('12:00 PM');
        } else {
            this.form.controls['slotFrom'].setValue('9:00 AM');
            this.form.controls['slotTo'].setValue('5:00 PM');
        }
    }
    /**
     * Fetching all gender list
     */
    getGenderList(): void {
        this._commonService.getGender().subscribe((response) => {
            this.gender$ = response.lstModel?.length
                ? [...response.lstModel]
                : [];
        });
    }

    /**
     * Editing Doctor/cho
     */

    submit() {
        if (this.form.valid) {
            if (
                new Date('1/1/1999 ' + this.form.value.slotFrom) >=
                new Date('1/1/1999 ' + this.form.value.slotTo)
            ) {
                this._commonService.error(
                    this._translocoService.translate('time_range_validation')
                );
                this.loading = false;
                return false;
            }

            let adminMenu = this.form.value.userMenu
                .map((checked, i) =>
                    checked
                        ? { ...this.userRoleList$[i], isAdminMenu: true }
                        : null
                )
                .filter((v) => v !== null);
            if (!adminMenu.length) {
                this._commonService.error('Assign Roles are mandatory');
                return;
            }
            // if (this.loading) return false;
            //if (!this.form.valid) return false;
            let params = {
                ...this.createParams(),
                memberId: this.selectedUser,
                stateId: 19,
                lstSubMenuModel: adminMenu,
            };

            this.loading = true;
            this._userService.updateAdmin(params).subscribe(
                (response) => {
                    if (!response.success) {
                        if (response.requestCode == 401) {
                            this.loading = false;
                            return;
                        } else {
                            let msg = this._errorService.errorMessage(response);
                            this._commonService.error(msg);

                            this.loading = false;
                        }
                    } else {
                        this.loading = false;
                        this._r.navigate(['/users/list']);
                    }
                },
                (err) => {
                    this.loading = false;
                    this._commonService.throwErr(
                        err?.error[0] ||
                            this._translocoService.translate(
                                'issue_while_updating'
                            )
                    );
                }
            );
        }
    }

    createParams() {
        let obj = {};
        Object.keys(this.form.value).forEach((k) => {
            if (this.form.value[k]) {
                if (k === 'day') {
                    obj['day'] = this.form.value[k].toString();
                } else if (k === 'mobile') {
                    obj['mobile'] = this.form.value[k].toString();
                } else if (k === 'userMenu') {
                    return;
                } else {
                    obj[k] = this.form.value[k];
                }
            }
        });
        return obj;
    }
    getUserRoleList() {
        this._userService.getUserMenu({}).subscribe((response) => {
            this.userRoleList$ = response?.lstModel;
            let roles = this.userRoleList$.map((e) => {
                var result = this.userList$.filter((t) => {
                    return t.menuMappingId == e.menuMappingId;
                });

                if (result.length != 0) {
                    return { ...e, isAdminMenu: true };
                } else {
                    return { ...e, isAdminMenu: false };
                }
            });

            roles.forEach((e) => {
                if (e.isAdminMenu == true) {
                    this.userRoles.push(new FormControl(true));
                    return;
                } else {
                    this.userRoles.push(new FormControl(false));
                    return;
                }
            });
        });
    }

    fetchUserDetails() {
        this._userService
            .getUserDetails({ id: this.selectedUser })
            .subscribe((res) => {
                this.patchValuestOfForm(res?.model?.membersModel);
                this.userList$ = res?.model?.lstSubMenuModel;
                this.getUserRoleList();
            });
    }

    patchValuestOfForm(res) {
        if (res)
            Object.keys(this.form['controls']).forEach((key) => {
                if (key === 'dob') {
                    this.form['controls'][key].setValue(new Date(res['dob']));
                } else if (key === 'mobile') {
                    this.form['controls'][key].setValue(Number(res['mobile']));
                } else if (key === 'day') {
                    this.form['controls'][key].setValue(res['day']?.split(','));

                    return;
                } else if (key === 'userMenu') {
                    return;
                } else
                    this.form['controls'][key].setValue(
                        res[key] ? res[key] : ''
                    );
            });

        this.getFacilityTypesList();
        this.getDistrictsList();
        this.getGenderList();
        this.getFacilities();
        this.getQualificationList();
        this.getSpecialityList();
        if (
            this.form.value.specializationId === 24 ||
            this.form.value.specializationId === 25
        ) {
            this.form.controls['slotFrom'].setValue('12:00 AM');
            this.form.controls['slotTo'].setValue('12:00 PM');
        }
        //this.getFacilities();
    }
    resetOnChange(type) {
        switch (type) {
            case 1: {
                this.form.get('districtId')?.reset();
                this.form.get('cityId')?.reset();
                this.form.get('blockId')?.reset();
                this.form.get('municipalityId')?.reset();
                this.form.get('wardId')?.reset();
                this.form.get('grampanchayatId')?.reset();
                break;
            }
            case 2: {
                this.form.get('cityId')?.reset();
                this.form.get('blockId')?.reset();
                this.form.get('municipalityId')?.reset();
                this.form.get('wardId')?.reset();
                this.form.get('grampanchayatId')?.reset();
                break;
            }
            case 3: {
                this.form.get('municipalityId')?.reset();
                this.form.get('wardId')?.reset();
                break;
            }

            case 4: {
                this.form.get('wardId')?.reset();
                break;
            }

            case 5: {
                this.form.get('grampanchayatId')?.reset();
                break;
            }

            default: {
                this.form.get('districtId')?.reset();
                this.form.get('cityId')?.reset();
                this.form.get('blockId')?.reset();
                this.form.get('municipalityId')?.reset();
                this.form.get('wardId')?.reset();
                this.form.get('grampanchayatId')?.reset();
            }
        }
    }
}
