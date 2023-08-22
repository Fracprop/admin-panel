import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminManagementService } from '../admin-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MOBILE_NUMBER, EMAIL_REGEX } from '../../common/regex.constants';
import { CommonService } from '../../common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-edit-admin',
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.scss'],
})
export class EditAdminComponent implements OnInit {
    public isQuery = false;
    public query: any = {};
    form: FormGroup;
    selectedUser: any;
    public regions$ = [];
    public states$ = [];
    public districts$ = [];
    public loading = false;
    constructor(
        private titleService: Title,
        private _r: Router,
        private _commonService: CommonService,
        private _adminService: AdminManagementService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute
    ) {
        this.titleService.setTitle('FracProp - Add Admin');
        this._activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id')) {
                this.selectedUser = params.get('id');
                this.fetchUserDetails();
            }
        });
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            adminTypeId: [this.query?.type, [Validators.required]],
            StateList: [[]],
            State_ID: [null],
            DistrictList: [[]],
            Region_ID: [0],
            first_name: [
                '',
                [
                    Validators.required,
                    this._commonService.noWhitespaceValidator,
                ],
            ],
            last_name: [
                '',
                [
                    Validators.required,
                    this._commonService.noWhitespaceValidator,
                ],
            ],

            userEmail: [
                '',
                [
                    Validators.required,
                    this._commonService.noWhitespaceValidator,
                    Validators.pattern(EMAIL_REGEX),
                ],
            ],
            phone_number: [
                null,
                [Validators.required, Validators.pattern(MOBILE_NUMBER)],
            ],
        });
        this.getRegionsList();
    }

    /**
     * Fetching all regions
     */
    getRegionsList(): void {
        this._commonService.getRegions({}).subscribe((response) => {
            this.regions$ = [...response];
        });
    }

    /**
     * Fetching all states over selecting region
     */
    getStatesList(): void {
        this._commonService
            .getStates({ RegionID: this.form.value.Region_ID })
            .subscribe((response) => {
                this.states$ = [...response];
            });
    }

    /**
     * Fetching all districts over selecting state
     */
    getDistrictsList(): void {
        this._commonService
            .getDistricts({ state_id: this.form.value.StateList })
            .subscribe((response) => {
                this.districts$ = [...response];
            });
    }

    fetchUserDetails() {
        this._commonService
            .getUserDetails({ id: this.selectedUser })
            .subscribe((response) => {
                this.patchValuestOfForm(response);
            });
    }

    submit() {
        if (this.loading) return false;
        if (!this.form.valid) return false;
        let params = {
            ...this.createParams(),
            userid: parseInt(this.selectedUser),
        };
        this.loading = true;
        this._adminService.updateAdmin(params).subscribe(
            (res) => {
                this.loading = false;
                this._r.navigate(['/admins/list']);
            },
            (err) => {
                this.loading = false;
                this._commonService.throwErr(err?.error[0]);
            }
        );
    }

    // createParams() {
    //     let obj = {};
    //     Object.keys(this.form.value).forEach((k) => {
    //         if (this.form.value[k]) {
    //             if (k === 'District_id') {
    //                 if (this.form.value[k].length)
    //                     obj[k] = this.form.value[k].toString();
    //             } else {
    //                 obj[k] = this.form.value[k];
    //             }
    //         }
    //     });
    //     return obj;
    // }

    createParams() {
        let obj = {
            adminTypeId: this.form.value.adminTypeId,
            StateList: this.form.value.StateList,
            State_ID: this.form.value.State_ID,
            DistrictList: this.form.value.DistrictList,
            Region_ID: this.form.value.Region_ID || 0,
            first_name: this.form.value.first_name,
            last_name: this.form.value.last_name,
            userEmail: this.form.value.userEmail,
            phone_number: this.form.value.phone_number,
        };
        if (this.form.value?.adminTypeId) {
        }
        if (this.form.value?.StateList) {
            obj['StateList'] = this.form.value?.StateList;
            if (typeof this.form.value?.StateList === 'number') {
                obj['StateList'] = [{ State_ID: this.form.value?.StateList }];
            } else {
                obj['StateList'] = this.form.value?.StateList.map((x) => {
                    return {
                        State_ID: x,
                        State_Name: '',
                    };
                });
            }
        }
        if (this.form.value?.DistrictList) {
            obj['DistrictList'] = this.form.value?.DistrictList.map((x) => {
                return {
                    District_Id: x,
                    District_Name: '',
                };
            });
        }
        if (this.form.value?.State_ID) {
            obj['State_ID'] = this.form.value?.State_ID.toString();
        }

        if (this.form.value?.first_name) {
            obj['first_name'] = this.form.value?.first_name;
        }
        if (this.form.value?.last_name) {
            obj['last_name'] = this.form.value?.last_name;
        }
        if (this.form.value?.userEmail) {
            obj['userEmail'] = this.form.value?.userEmail;
        }
        if (this.form.value.phone_number) {
            obj['phone_number'] = this.form.value.phone_number;
        }
        return { ...obj };
    }
    patchValuestOfForm(res) {
        if (res)
            Object.keys(this.form['controls']).forEach((key) => {
                if (key == 'StateList') {
                    let rs = res['StateList'];

                    if (rs.length === 1) {
                        this.form['controls'][key].setValue(rs[0].State_ID);
                    } else {
                        let _vals = rs.map((it) => it.State_ID);
                        this.form['controls'][key].setValue(_vals);
                    }
                } else if (key == 'DistrictList')
                    this.form['controls'][key].setValue(
                        res['DistrictList'].map((r) => {
                            return r?.District_Id;
                        })
                    );
                else
                    this.form['controls'][key].setValue(
                        res[key] ? res[key] : ''
                    );
            });
        this.getStatesList();
        this.getDistrictsList();
    }
}
