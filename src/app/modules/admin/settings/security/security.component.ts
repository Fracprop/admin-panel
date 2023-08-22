import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonService } from '../../common/common.service';
import { SettingsService } from '../settings.service';
import { PASSWORD_REGEX } from '../../common/regex.constants';
import { sha512 } from 'js-sha512';

@Component({
    selector: 'settings-security',
    templateUrl: './security.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurityComponent implements OnInit {
    @ViewChild('securityNgForm') securityNgForm: NgForm;
    loading: boolean = false;
    securityForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _commonService: CommonService,
        private _settingService: SettingsService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword: [null, [Validators.required]],
            newPassword: [
                null,
                [Validators.required, Validators.pattern(PASSWORD_REGEX)],
            ],
            confirmPassword: [null, [Validators.required]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    submit() {
        let data = { ...this.securityForm.value };

        data.currentPassword = sha512.hex(
            this.securityForm.value.currentPassword
        );
        data.newPassword = sha512.hex(data.newPassword);
        let obj = {
            adminId: JSON.parse(localStorage.getItem('user'))?.['adminId'],
            password: data?.newPassword,
            oldPassword: data?.currentPassword,
        };

        if (this.securityForm.valid) {
            if (
                this.securityForm?.value?.newPassword !==
                this.securityForm?.value?.confirmPassword
            ) {
                this._commonService.throwErr(
                    'New password does not match with confirmed password'
                );
                return false;
            }

            this.loading = true;

            this._settingService.updatePassword({ ...obj }).subscribe(
                (res) => {
                    this.securityNgForm.resetForm();
                    this._commonService.throwSuccess(
                        'Your password has been successfully updated.'
                    );
                    this.loading = false;
                },
                (err) => {
                    this.securityNgForm.resetForm();
                    this._commonService.throwErr(
                        'Some issue occurred while updating the password'
                    );
                    this.loading = false;
                }
            );
        }
    }
}
