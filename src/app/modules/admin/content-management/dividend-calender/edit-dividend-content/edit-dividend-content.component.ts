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
        { text: 'Yearly', value: 'YEARLY' },
        { text: 'Quaterly', value: 'QUATERLY' },
        { text: 'Half Yearly', value: 'HALFYEARLY' },
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
            Date1: [null, [Validators.required]],
            Date2: [null, []],
            Date3: [null, []],
            Date4: [null, []],
        });
        this.fetchContent();
    }
    validateDates() {
        let dateFields = ['Date1', 'Date2', 'Date3', 'Date4'];
        let validationMessage = '';
        const dates = dateFields.map(
            (field) => new Date(this.form.get(field).value)
        );
        if (dates.every((date) => dates.length === 4)) {
            let isValid = true;
            for (let i = 0; i < dates.length - 1; i++) {
                const monthDifference =
                    (dates[i + 1].getFullYear() - dates[i].getFullYear()) * 12 +
                    dates[i + 1].getMonth() -
                    dates[i].getMonth();
                console.log(monthDifference);
                if (monthDifference !== 4) {
                    isValid = false;
                    break;
                }
            }

            return (validationMessage = isValid
                ? undefined
                : 'Each consecutive pair of dates must have a 4-month difference.');
        } else {
            return (validationMessage = 'Invalid date format.');
        }
    }
    conditionallyManageValidation(
        fieldName: string,
        action: 'set' | 'reset'
    ): void {
        const control = this.form.get(fieldName);

        if (action === 'set') {
            control.setValidators([Validators.required]);
        } else if (action === 'reset') {
            control.clearValidators();
        }

        control.updateValueAndValidity();
    }
    resetData() {
        this.form.get('Date1').patchValue('');
        this.form.get('Date2').patchValue('');
        this.form.get('Date3').patchValue('');
        this.form.get('Date4').patchValue('');
        if (this.form.value.type === 'HALFYEARLY') {
            this.conditionallyManageValidation('Date2', 'set');
            this.conditionallyManageValidation('Date3', 'reset');
            this.conditionallyManageValidation('Date4', 'reset');
        } else if (this.form.value.type === 'QUATERLY') {
            this.conditionallyManageValidation('Date2', 'set');
            this.conditionallyManageValidation('Date3', 'set');
            this.conditionallyManageValidation('Date4', 'set');
        } else if (this.form.value.type === 'YEARLY') {
            this.conditionallyManageValidation('Date2', 'reset');
            this.conditionallyManageValidation('Date3', 'reset');
            this.conditionallyManageValidation('Date4', 'reset');
        }
    }
    editData() {
        this.loading = true;
        console.log(this.form);
        if (this.form.invalid) {
            this.loading = false;
            return;
        } else if (this.form.value.type) {
            let error = null;
            let month1 = this.form.value.Date1
                ? new Date(this.form.value.Date1)
                : undefined;
            let month2 = this.form.value.Date2
                ? new Date(this.form.value.Date2)
                : undefined;
            if (this.form.value.type === 'YEARLY') {
            } else if (this.form.value.type === 'HALFYEARLY') {
                this.form.get('Date2').setValidators([Validators.required]);
                this.form.get('Date2').updateValueAndValidity();
                console.log(this.form.value.Date1)
                const monthDifference =
                    (new Date(this.form.value.Date1).getFullYear() -
                    new Date( this.form.value.Date2).getFullYear()) *
                        12 +
                    month1.getMonth() -
                    month2.getMonth();
                console.log(Math.abs(monthDifference) < 6);
                if (Math.abs(monthDifference) < 6) {
                    this._commonService.error(
                        'The difference between dates must be at least 6 months.'
                    );
                    this.loading = false;
                    return;
                }
            } else if (this.form.value.type === 'QUATERLY') {
                error = this.validateDates();
                console.log(this.validateDates(), error);
                if(error){
                    this._commonService.error(error) 
                    this.loading=false;
                    return;

                }}
        }
        this._dividendService
            .editContent(this.form.value, this.dividendId)
            .subscribe(
                (response) => {
                    this.loading = false;
                    this._router.navigate(['/dividend-calendar/list']);
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
