import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { DividendCalenderService } from '../dividend-calender.service';

@Component({
    selector: 'app-edit-dividend-content',
    templateUrl: './edit-dividend-content.component.html',
    styleUrls: ['./edit-dividend-content.component.scss'],
})
export class EditDividendContentComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public dividendId: any;
    public categoryList$ = [
        { text: 'Yearly', value: 'Yearly' },
        { text: 'Quaterly', value: 'Quaterly' },
        { text: 'halfyearly', value: 'halfyearly' },
    ];

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _dividendService: DividendCalenderService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.dividendId = params['id'];
        });
    }

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            type: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
        });
        this.fetchContent();
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
        this._dividendService
            .editContent(this.form.value, this.dividendId)
            .subscribe(
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
    fetchContent() {
        this._dividendService.getDetails(this.dividendId).subscribe(
            (response) => {
                this.patchValuestOfForm(response);
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
    }
}
