import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { CommonService } from 'app/modules/admin/common/common.service';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: any } = {
        type: 'success',
        message: null,
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    availableLangs: AvailableLangs;

    /**
     * Constructor
     */
    constructor(
        private titleService: Title,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _translocoService: TranslocoService,
        public _commonService: CommonService,

        private _errorService: ErrorHandlingService
    ) {
        this.titleService.setTitle('FracProp - Sign In');
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
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
            // rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }
        // let obj = {
        //     UserName: 'volumetreeadmin',
        //     Password:
        //         '6d880c09e57fd294f4fcc1b8bb031c11778d281a728e18c2d5c71a6bf3b18066f2aed5565c3ef173b94f0f4d2f39ba05e0d4f66cc0d5e235ab6bfe3af0ef8024',
        //     Capchavalue:
        //         '03AGdBq265tjKcehDeoc21om_JKlvupwDwhLBzTVOm3wqt71GTqDB7oEk_9QLCnVdJ6L5mn6uxOOD0dOM46q6FCyazTut-3SzcDbMXPa-ueV2KQU7yviRrJ5r0v9SIDNBUdy9hReTtnb8UMvEBsChWTXYhKPcSblEwSj4iusxKd8mkfaXZyBuRoR0ZIkUBr5ykk8xj8YtL2WEg7dRWPwKCHGHikZ731R8UlVFMKCjb2dHzQWWLklUjdGRCpTJrAuFh69a33gEqXxmwDyg4zVFrBFtG7CgUGE4-5Cz_mohzWGO_25hz_X7agmZV8nMJhY_IrOYnCDlGLyUTq9pUU8s9WhpAWSXVkLs-KD0zbo-IoSM3MJnMWzcwWfNYlSic76UDsoMs77Dl72TqgvFJR9N4R9D9LqahQKdL6jP6HMx5l-MVpwjjRTzCpxCwwzhdzb-nW4i7k2_uAGJb9gtRch1zLRjAoYXisABtiw',
        // };

        let obj = { ...this.signInForm.value };

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(obj).subscribe(
            (response) => {
                if (response?.userValue?.role!=='ADMIN') {
                    let msg = this._errorService.errorMessage(response);
                    this.alert = {
                        type: 'error',
                        message: msg,
                    };

                    // Show the alert
                    this.signInForm.enable();
                    this.showAlert = true;

                    return;
                } else {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL =
                        this._activatedRoute.snapshot.queryParamMap.get(
                            'redirectURL'
                        ) || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                }
            },
            (error) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email and password',
                };

                // Show the alert
                this.showAlert = true;
                setTimeout(()=>{
                    this.showAlert = false;

                },3000)
            }
        );
    }

    // change language event
    setActiveLang(lang: string) {
        this._translocoService.setActiveLang(lang);
        this._translocoService.getActiveLang();
    }
}
