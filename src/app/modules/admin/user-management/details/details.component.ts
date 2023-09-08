import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserManagementService } from '../user-management.service';
import { CommonService } from '../../common/common.service';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    isLoading: boolean = false;
    selectedUserId: String = '';
    userDetails$: any;
    status: String = '';

    /**
     * Constructor
     */
    constructor(
        private titleService: Title,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserManagementService,
        private _commonService: CommonService,
        private _errorService: ErrorHandlingService,
        private _authService: AuthService,
        private _router: Router
    ) {
        this.titleService.setTitle('FracProp');
        this._activatedRoute.paramMap.subscribe((params) => {
            if (params.get('id')) {
                this.selectedUserId = params.get('id');
                this.status = params.get('status');
                this.fetchUserDetails();
            }
        });
    }

    ngOnInit(): void {}
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fetching  user list
     */
    fetchUserDetails() {
        this.isLoading = true;
        this._userService.getUserDetails(this.selectedUserId).subscribe(
            (response) => {
                if (!response) {
                    if (response.requestCode == 401) {
                        this.isLoading = false;
                        return;
                    } else {
                        console.log(response);
                        let msg = this._errorService.errorMessage(
                            response.message
                        );
                        this._commonService.error(msg);

                        this.isLoading = false;
                    }
                } else {
                    this.isLoading = false;
                    this.userDetails$ = {
                        ...response?.kycDetails,
                        ...response?.userDetails,
                        upload_director_id_document: response?.kycDetails
                            .upload_director_id_document
                            ? response?.kycDetails.upload_director_id_document.split(
                                  ','
                              )
                            : '',
                    };
                    console.log(this.userDetails$);

                    //this._changeDetectorRef.detectChanges();
                }
            },
            (err) => {
                console.log(err.error.message);
                let msg = this._errorService.errorMessage(err.error.message);
                this._commonService.error(err.error.message);
                this._router.navigate(['/users/list']);
                this.isLoading = false;
            }
        );
    }
    updateStatus(status) {
        this.isLoading = true;
        this._userService
            .updateUserStatus({ id: this.selectedUserId, status: status })
            .subscribe(
                (response) => {
                    if (!response) {
                       
                        if (response.requestCode == 401) {
                            this.isLoading = false;
                            return;
                        } else {
                            let msg = this._errorService.errorMessage(response);
                            this._commonService.error(msg);

                            this.isLoading = false;
                        }
                    } else {
                        if(status==='APPROVED' && this.userDetails$?.role === 'STANDARD_USER'){

                            this.matchingGrps();
                        }else{
                            this._router.navigate(['/users/list']);

                        }
                      
                       
                        this.isLoading = false;
                    }
                },
                (err) => {
                    this.isLoading = false;
                }
            );
    }
    matchingGrps() {
        this.isLoading = true;
        this._userService.matchingForGrps(this.selectedUserId).subscribe(
            (response) => {
                this.isLoading = false;
                this._router.navigate(['/users/list']);
                console.log('matching')
                this._changeDetectorRef.detectChanges();
            },
            (err) => {
                console.log('error')
                // let msg = this._errorService.errorMessage(err.error.message);
                // this._commonService.error(err.error.message);
               // this._router.navigate(['/users/list']);
                this.isLoading = false;
            }
        );
    }
}
