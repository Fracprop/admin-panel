import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { DividendCalenderService } from '../dividend-calender.service';

@Component({
    selector: 'app-add-dividend-content',
    templateUrl: './add-dividend-content.component.html',
    styleUrls: ['./add-dividend-content.component.scss'],
})
export class AddDividendContentComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public categoryList$ = [
        { text: 'Yearly', value: 'Yearly' },
        { text: 'Quaterly', value: 'Quaterly' },
        { text: 'halfyearly', value: 'halfyearly' },
    ];

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _faqService: DividendCalenderService
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            type: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
        });
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
        this._faqService.addContent(this.form.value).subscribe(
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
