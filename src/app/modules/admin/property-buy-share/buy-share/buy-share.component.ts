import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { PropertyBuyShareService } from '../property-buy-share.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-buy-share',
    templateUrl: './buy-share.component.html',
    styleUrls: ['./buy-share.component.scss'],
})
export class BuyShareComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public categoryList$: any;
    public images: any = [];
    public videos: any = [];
    public propertyList$: any = [];
    public propertyDetails: any = {};
    public userId: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _buyShareService: PropertyBuyShareService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            property_id: [null, [Validators.required]],

            auction_id: [null, [Validators.required]],
            amount: [null, [Validators.required]],
        });
        this.getProperties();
        this.userId = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).id
            : undefined;
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
        console.log(id);
        this.propertyDetails = {};

        this.propertyList$.filter((e) => {
            if (e.groupcriteriaId == id) {
                this.propertyDetails = { ...e };
                console.log(e);
               // this.form.patchValue({ property_id: e.groupcriteriaId });
                this.form.patchValue({ auction_id: e.id });
                console.log(this.form.value);
            }
        });
    }

    add() {
        this.loading = true;
        console.log(this.form);
        if (this.form.invalid) {
            this.loading = false;
            return;
        }
        this._buyShareService
            .buyShare({
                ...this.form.value,
                user_id: this.userId,
                amount:this.form.value.amount.toString()
                
            })
            .subscribe(
                (response) => {
                    this.loading = false;
                    this._router.navigate(['/buy-share/list']);
                },
                (err) => {
                    this.loading = false;
                    this._commonService.error(err.error.message);
                    // this.isLoading = false;
                }
            );
    }
}
