import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { CommonService } from 'app/modules/admin/common/common.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    showAvatar: boolean = true;
    user: User;
    configForm: FormGroup;
    incomingcallForm: FormGroup;
    userAvatar: any;
    userDetails: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user$: Observable<any[]>;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService,
        public _commonService: CommonService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this.user$ = this._commonService.user$;
        this._commonService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                this.userDetails = res;
                if (res?.profilePicture == '') {
                    this.showAvatar = false;
                } else {
                    this.showAvatar = true;
                    this.viewProfile(res?.profilePicture);
                }
                this._changeDetectorRef.markForCheck();
            });
        // this._userService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user: any) => {
        //         this.user = user;
        //         // Mark for check
        //
        //         this._changeDetectorRef.markForCheck();
        //     });

        this.initializeForm();
    }

    initializeForm() {
        // Build the config form
        // Build the config form
        this.incomingcallForm = this._formBuilder.group({
            title: 'Upcoming Consultation Request!',
            message: 'Imcoming call from RAVI KUMAR',
            icon: this._formBuilder.group({
                show: true,
                name: 'mat_outline:call',
                color: 'success',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'ACCEPT',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'DENY',
                    color: 'warn',
                }),
            }),
            dismissible: false,
        });

        // Build the config form
        this.configForm = this._formBuilder.group({
            title: this._translocoService.translate('logout'),
            message: this._translocoService.translate('logout_message'),
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: this._translocoService.translate('yes'),
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: this._translocoService.translate('no'),
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService
            .update({
                ...this.user,
                status,
            })
            .subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this.initializeForm();
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                //sign out
                this._authService.signOut().subscribe();
            }
        });
    }

    /**
     * Incoming call
     */
    incomingCall(): void {
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(
            this.incomingcallForm.value
        );
    }

    viewProfile(fileName: string) {
        if (fileName) {
            this._commonService
                .getFileFromServer({ ImageName: fileName })
                .subscribe(
                    (res) => {
                        this.userAvatar = res?.result;
                        //if(res?.result) this.showAvatar = true
                        this._changeDetectorRef.detectChanges();
                    },
                    (err) => {
                        this._commonService.throwErr(
                            'Not able to access the file.'
                        );
                    }
                );
        }
    }
}
