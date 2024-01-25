import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../common/common.service';
import { FinanceService } from '../finance.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
    selector: 'app-tax-management',
    templateUrl: './tax-management.component.html',
    styleUrls: ['./tax-management.component.scss'],
})
export class TaxManagementComponent implements OnInit {
    form: FormGroup;
    public isLoading = false;
    public openForm = false;
    transactionFee:string;
    listingFee:string
    id:string;

    constructor(
        private _formBuilder: FormBuilder,
        private _financeService: FinanceService,
        private _commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
          transactionFee: [null,[Validators.required]],
            listingFee: [null,[Validators.required]],
        });
       this.fetchFeeDetails();
    }
    /**
     * Fetching  banks list
     */
    fetchFeeDetails() {
        this.isLoading = true;
        this._financeService.getList({}).subscribe(
            (response) => {
                this.isLoading = false;
             
                this.patchValuestOfForm(response);
                this.transactionFee=response?.transactionFee
                this.listingFee=response?.listingFee
                this.id=response?.id
          
                this._changeDetectorRef.detectChanges();
            },
            (err) => {
                this._commonService.error(err.message);
                this.isLoading = false;
            }
        );
    }
    addFeeDetails() {
        this.isLoading = true;
        if (this.form.invalid) {
            this.isLoading = false;
            return;
        }
        this.patchValuestOfForm(this.form.value)
        this._financeService.addFeeParameters(this.form.value).subscribe(
            (response) => {
                this.isLoading = false;
                this.openForm=false;
                console.log(response);
            },
            (err) => {
                this.isLoading = false;
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
    editFeeDetails() {
        this.isLoading = true;
        if (this.form.invalid) {
            this.isLoading = false;
            return;
        }
        this.patchValuestOfForm(this.form.value)
        this._financeService.editFeeParameters(this.form.value, this.id).subscribe(
            (response) => {
                this.isLoading = false;
                this.fetchFeeDetails();
                this.openForm=false;
                this.id=response?.id
            },

            (err) => {
                this.isLoading = false;
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
    patchValuestOfForm(res: any) {
      Object.keys(this.form['controls']).forEach((key) => {
          this.form['controls'][key].setValue(res[key] ? res[key].toString() : '');
      });
  }
}
