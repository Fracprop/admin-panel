import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { AuctionCalenderService } from '../auction-calender.service';
import { UserService } from 'app/core/user/user.service';
import { ONLYNUMBER } from 'app/modules/admin/common/regex.constants';

@Component({
    selector: 'app-add-auction-calender',
    templateUrl: './add-auction-calender.component.html',
    styleUrls: ['./add-auction-calender.component.scss'],
})
export class AddAuctionCalenderComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public todayDate=new Date();
    public loading = false;
    public propertyDetails: any;
    public userID: String;
    public communityList$ = [
        { text: 'Yearly', value: 'Yearly' },
        { text: 'Quaterly', value: 'Quaterly' },
        { text: 'halfyearly', value: 'halfyearly' },
    ];
    public propertyList$: any = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _auctionService: AuctionCalenderService,
        private _userService: UserService
    ) {
        this.userID = JSON.parse(localStorage.getItem('user')).id;
    }

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            property_id: [null, [Validators.required]],
            group_id: [null, [Validators.required]],
            startdate: [null, [Validators.required]],
            enddate: [null, [Validators.required]],
            sellingPrice: [null, [Validators.required,Validators.pattern(ONLYNUMBER)]],

            noofsharetoAuction: [null, [Validators.required,Validators.pattern(ONLYNUMBER)]],
        });
        this.getProperties();
        this.getCommunities();
    }
    /**
     * Fetching  communities list
     */
    getCommunities() {
        this._commonService.getCommunityList({ searcString: 'test' }).subscribe(
            (response) => {
                this.communityList$ = response ? [...response] : [];
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    getProperties() {
        this._commonService.getPropertyList({}).subscribe(
            (response) => {
                this.propertyList$ = response ? [...response] : [];
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    getDetailOnSelect(id: any) {
        this.propertyDetails = {};
        this.propertyList$.filter((e) => {
            if (e.id == id) {
                this.propertyDetails = { ...e };

                this.form.patchValue({ group_id: e.groupcriteriaId });
            }
        });
    }
    addData() {
        this.loading = true;
        if (this.form.invalid) {
            this.loading = false;
            return;
        }
        if (
            Date.parse(this.form.value.startdate) <=
            Date.parse(this.form.value.endadate)
        ) {
            this.loading = false;
            this._commonService.error(
                'End Date should be greater than start date'
            );
            this.loading = false;
            return;
        }
        if (
            Number(this.form.value.noofsharetoAuction) >
            Number(this.propertyDetails.
                fracropShare)
        ) {
            this._commonService.error(
                'Number of shares cannot be greater than total number of available shares'
            );
            this.loading = false;
            return;
        }
        this._auctionService
            .addAuction({
                ...this.form.value,
                admin_status: 'true',
                noofsharetoAuction:
                    this.form.value.noofsharetoAuction.toString(),
                sellingPrice: this.form.value.sellingPrice.toString(),
                user_id: this.userID,
            })
            .subscribe(
                (response) => {
                    this.loading = false;
                    this._router.navigate(['/auction-calendar/list']);
                },
                (err) => {
                    this.loading = false;
                    this._commonService.error(err.error.message);
                    // this.isLoading = false;
                }
            );
    }
}
