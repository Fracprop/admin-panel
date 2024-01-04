import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { AuctionCalenderService } from '../auction-calender.service';

@Component({
    selector: 'app-add-auction-calender',
    templateUrl: './add-auction-calender.component.html',
    styleUrls: ['./add-auction-calender.component.scss'],
})
export class AddAuctionCalenderComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public propertyList$ = [
        { text: 'Yearly', value: 'Yearly' },
        { text: 'Quaterly', value: 'Quaterly' },
        { text: 'halfyearly', value: 'halfyearly' },
    ];
    public communityList$ = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _auctionService: AuctionCalenderService
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            property: [null, [Validators.required]],
            coummiunity: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            sharePrice: [null, [Validators.required]],
            offerPrice: [null, [Validators.required]],
            noOfShares: [null, [Validators.required]],
        });
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
        this._commonService.getCommunityList({ searcString: 'test' }).subscribe(
            (response) => {
                this.communityList$ = response ? [...response] : [];
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    addData() {
        this.loading = true;
        if (this.form.invalid) {
            this.loading = false;
            return;
        }
        if (
            Date.parse(this.form.value.closingDate) <=
            Date.parse(this.form.value.openingDate)
        ) {
            this._commonService.error(
                'End Date should be greater than start date'
            );
            return;
        }
        this._auctionService.addAuction(this.form.value).subscribe(
            (response) => {
                this.loading = false;
                this._router.navigate(['/dividend-calender/list']);
            },
            (err) => {
                this.loading = false;
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
}
