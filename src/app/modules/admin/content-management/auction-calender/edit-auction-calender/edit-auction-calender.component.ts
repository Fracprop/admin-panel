import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { AuctionCalenderService } from '../auction-calender.service';

@Component({
    selector: 'app-edit-auction-calender',
    templateUrl: './edit-auction-calender.component.html',
    styleUrls: ['./edit-auction-calender.component.scss'],
})
export class EditAuctionCalenderComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public todayDate=new Date();
    public propertyDetails: any;
    public userID: String;
    public propertyList$ = [
        { text: 'Yearly', value: 'Yearly' },
        { text: 'Quaterly', value: 'Quaterly' },
        { text: 'halfyearly', value: 'halfyearly' },
    ];
    public communityList$ = [];
    public auctionId: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _auctionService: AuctionCalenderService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.auctionId = params['id'];
        });
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
            sellingPrice: [null, [Validators.required]],

            noofsharetoAuction: [null, [Validators.required]],
        });
        this.getCommunities();
        this.getProperties();
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
                this.fetchContent();
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    getDetailOnSelect(id: any) {
        this.propertyDetails = {};
        this.propertyList$.filter((e: any) => {
            if (e.id == id) {
                this.propertyDetails = { ...e };

                this.form.patchValue({ group_id: e.groupcriteriaId });
            }
        });
    }
    editData() {
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
            Number(this.propertyDetails.totalnumberShareavailable)
        ) {
            this._commonService.error(
                'Number of shares cannot be greater than total number of available shares'
            );
            this.loading = false;
            return;
        }
        this._auctionService
            .editAuction(
                {
                    ...this.form.value,
                    admin_status: true,
                    noofsharetoAuction:
                        this.form.value.noofsharetoAuction.toString(),
                    sellingPrice: this.form.value.sellingPrice.toString(),
                    user_id: this.userID,
                },
                this.auctionId
            )
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
    fetchContent() {
        this._auctionService.getDetails(this.auctionId).subscribe(
            (response) => {
                this.patchValuestOfForm(response[0]);
            },
            (err) => {
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(res[key] ? res[key] : '');
        });
        this.getDetailOnSelect(this.form.value.property_id);
    }
}
