import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {
    configForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,

        private _router: Router,
        private _toastrService: ToastrService
    ) {}

    errorMessage(data: any): Observable<any> {
        if (data?.requestCode === 401 && data?.success === false) {
            if (this.configForm) return;

            this.configForm = this._formBuilder.group({
                title: 'Session Expired',
                message:
                    'Seems like your session is expired. Please login again.',
                icon: this._formBuilder.group({
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn',
                }),
                actions: this._formBuilder.group({
                    confirm: this._formBuilder.group({
                        show: true,
                        label: 'OK',
                        color: 'accent',
                    }),
                    cancel: this._formBuilder.group({
                        show: false,
                        label: 'No',
                    }),
                }),
                dismissible: false,
            });

            const dialogRef = this._fuseConfirmationService.open(
                this.configForm.value
            );
            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    //sign out
                    localStorage.removeItem('accessToken');

                    localStorage.removeItem('email');
                    localStorage.removeItem('user');
                    // Redirecting to login
                    this._router.navigate(['/sign-in']);
                }
            });

            return;
        } else if (data?.requestCode === 200 && data?.success === false) {
            data?.message ? this._toastrService.error(data?.message) : '';
        } else {
            //this._toastrService.error(data?.message);
        }
        return data?.message;
    }
    sessionExpired(): void {
        this.configForm = this._formBuilder.group({
            title: 'Session Expired',
            message: 'Seems like your session is expired. Please login again.',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'OK',
                    color: 'accent',
                }),
                cancel: this._formBuilder.group({
                    show: false,
                    label: 'No',
                }),
            }),
            dismissible: false,
        });

        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                //sign out
                localStorage.removeItem('accessToken');

                // Remove the user type from the local storage
                localStorage.removeItem('type');

                // Redirecting to login
                this._router.navigate(['/sign-in']);
            }
        });
    }
}
