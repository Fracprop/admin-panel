import { Component, OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserManagementService } from '../user-management.service';
import { DateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    MOBILE_NUMBER,
    EMAIL_REGEX,
    PINCODE,
    ONLYCHARACTERS,
} from '../../common/regex.constants';
import { CommonService } from '../../common/common.service';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { SELECTED_STATE } from '../../common/common.constants';
import { Weekdays, namePrefixes } from '../../common/common.constants';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';

import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { AuthService } from 'app/core/auth/auth.service';

/**
 * Creating service for seven days selection date range
 */
@Injectable()
export class SevenDayRangeSelectionStrategy<D>
    implements MatDateRangeSelectionStrategy<D>
{
    constructor(private _dateAdapter: DateAdapter<D>) {}

    selectionFinished(date: D | null): DateRange<D> {
        return this._createSevenDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createSevenDayRange(activeDate);
    }

    private _createSevenDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = this._dateAdapter.addCalendarDays(date, 0);
            const end = this._dateAdapter.addCalendarDays(date, 6);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: SevenDayRangeSelectionStrategy,
        },
    ],
})
export class AddUserComponent implements OnInit {
    public loading = false;
    form: FormGroup;
    constructor(
        private titleService: Title,
        private _userService: UserManagementService,
        private _r: Router,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _errorService: ErrorHandlingService,
        private _translocoService: TranslocoService,
        private _authService: AuthService
    ) {}
    ngOnInit(): void {}

    submit() {
        if (this.form.valid) {
            this.loading = true;

            let params = {
                ...this.createParams(),
                stateId: SELECTED_STATE,
            };

            this.loading = true;
            this._userService.addAdmin(params).subscribe(
                (response) => {
                    if (!response.success) {
                        this.loading = false;
                        if (response.requestCode === 401) {
                            this.loading = false;
                            return;
                        } else {
                            this.loading = false;
                            let msg = this._errorService.errorMessage(response);
                            this._commonService.error(msg);

                            this.loading = false;
                        }
                    } else {
                        this.loading = false;

                        this._r.navigate(['/users/list']);
                    }
                },
                (err) => {
                    this.loading = false;
                    this._commonService.throwErr(err?.error[0]);
                }
            );
        }
    }
    /**
     * Creating params
     */

    createParams() {
        let obj = {};
        Object.keys(this.form.value).forEach((k) => {
            if (this.form.value[k]) {
                obj[k] = this.form.value[k];
            }
        });
        return obj;
    }
}
