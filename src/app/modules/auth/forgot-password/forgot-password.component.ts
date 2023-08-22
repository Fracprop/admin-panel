import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: FormGroup;
    showAlert: boolean = false;
    availableLangs: AvailableLangs;

    /**
     * Constructor
     */
    constructor(
        private titleService: Title,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService
    ) {
        this.titleService.setTitle('FracProp - Forgot Password');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // get configure language
        this.availableLangs = this._translocoService.getAvailableLangs();
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService
            .forgotPassword(this.forgotPasswordForm.get('email').value)
            .subscribe(
                () => {
                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                    // Set the alert
                    this.alert = {
                        type: 'success',
                        message:
                            this._translocoService.translate('received_email'),
                    };
                },
                (err) => {
                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message:
                            this._translocoService.translate('email_not_found'),
                    };
                }
            );
    }

    // change language event
    setActiveLang(lang: string) {
        this._translocoService.setActiveLang(lang);
        this._translocoService.getActiveLang();
    }
}
