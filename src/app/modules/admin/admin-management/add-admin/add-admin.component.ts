import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminManagementService } from '../admin-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MOBILE_NUMBER, EMAIL_REGEX } from '../../common/regex.constants';
import { CommonService } from '../../common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
    public isQuery = false;
    public query: any = {};
    form: FormGroup;
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
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params?.id && params?.type) {
                this.isQuery = true;
                this.query = params;
            }
        });
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            adminTypeId: [this.query?.type, [Validators.required]],
            state_id: [[]],
            district_id: [[]],
            region_id: [0],
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
            .getStates({ RegionID: this.form.value.region_id })
            .subscribe((response) => {
                this.states$ = [...response];
            });
    }

    /**
     * Fetching all districts over selecting state
     */
    getDistrictsList(): void {
        this._commonService
            .getDistricts({ StateID: this.form.value.state_id })
            .subscribe((response) => {
                this.districts$ = [...response];
            });
    }

    submit() {
        if (this.loading) return false;
        if (!this.form.valid) return false;
        let params = { ...this.createParams() };
        this.loading = true;
        this._adminService.addAdmin(params).subscribe(
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

    createParams() {
        let obj = {
            adminTypeId: this.form.value.adminTypeId,
            state_id: this.form.value.state_id,
            district_id: this.form.value.district_id,
            region_id: this.form.value.region_id,
            first_name: this.form.value.first_name,
            last_name: this.form.value.last_name,
            userEmail: this.form.value.userEmail,
            phone_number: this.form.value.phone_number,
        };
        if (this.form.value?.adminTypeId) {
            obj['adminTypeId'] = this.form.value?.adminTypeId;
        }
        if (this.form.value?.state_id) {
            obj['state_id'] = this.form.value?.state_id.toString();
        }
        if (this.form.value?.district_id) {
            obj['district_id'] = this.form.value?.district_id.toString();
        }
        if (this.form.value?.region_id) {
            obj['region_id'] = this.form.value?.region_id;
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
}
