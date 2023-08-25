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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserManagementService } from '../user-management.service';
import { CommonService } from '../../common/common.service';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';
import { userTypes, userStatus } from '../../common/common.constants';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from '../../../../../environments/environment';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    styles: [
        `
            .admin-grid {
                grid-template-columns: auto auto auto;

                @screen sm {
                    grid-template-columns: auto auto auto auto;
                }

                @screen md {
                    grid-template-columns: 50px 200px 200px 200px 200px 200px 200px;
                }

                @screen lg {
                    grid-template-columns: 50px 200px 200px 200px 200px 200px 200px;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    confirmationDialog: FormGroup;
    public loading: boolean = false;
    users$: any = [];
    isLoading1: boolean = false;
    isLoading: boolean = false;
    public form: FormGroup;

    isBlocked: boolean = false;
    pagination: any = {
        limit: 10,
        pageNo: 0,
        TotalCount: 0,
        PageNo: 0,
    };
    public currentTab = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private titleService: Title,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _userService: UserManagementService,
        private _commonService: CommonService,
        private _errorService: ErrorHandlingService,
        private _authService: AuthService
    ) {
        this.titleService.setTitle('FracProp');
        this.confirmationForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getUsers();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {}

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
     * Fetching  user list
     */
    getUsers() {
        let paginationParams = {
          
            pageNo: this.pagination?.pageNo,
            limit: this.pagination?.limit,
        };
        /* if (this.form?.value.EnterSearch) {
            paginationParams['EnterSearch'] = this.form?.value.EnterSearch;
        }
        if (this.form?.value.Speciality) {
            paginationParams['Speciality'] = this.form?.value.Speciality;
        }
        if (this.form?.value.DistrictID) {
            paginationParams['DistrictID'] = this.form?.value.DistrictID;
        } */
        this.isLoading = true;
        this._userService.getUsers({ ...paginationParams,currentTab:this.currentTab }).subscribe(
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
                    this.isLoading = false;

                    this.pagination.TotalCount = response?.totalCount;

                    this.users$ = response?.users
                        ? [...response?.users]
                        : []; 
                    this._changeDetectorRef.detectChanges();
                }
            },
            (err) => {
                this.isLoading = false;
            }
        );
    }

    pageChanged(e) {
        if (e?.pageSize !== this.pagination?.limit) {
            this.pagination.limit = e?.pageSize;
            this.resetPagination();
            return;
        }
        this.pagination.limit = e?.pageSize;
        this.pagination.PageNo = e?.pageIndex;
        this.pagination.pageNo =
            this.pagination?.limit * this.pagination?.PageNo;

        this.getUsers();
    }
    /**
     *Reset pagination
     */

    resetPagination() {
        this.pagination = {
            limit: this.pagination.limit,
            pageNo: 0,
            TotalCount: 0,
            PageNo: 0,
        };
        this.getUsers();
    }
    /**
     *Reset filter
     */
    resetFilter() {
        this.form.reset();
        this.form.controls['DistrictID'].setValue(
            this._authService.user.districtId
        );
        this.pagination = {
            limit: this.pagination.limit,
            pageNo: 0,
            TotalCount: 0,
            PageNo: 0,
        };
        this.getUsers();
    }
    /**
     *confirmation form
     */

    confirmationForm() {
        /**
         * CALL CONFIG FORM
         */
        this.confirmationDialog = this._formBuilder.group({
            title: '',
            message: '',
            icon: this._formBuilder.group({
                show: true,
                name: 'mat_outline:delete',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * Block user
     */
    blockUser(id) {
        this._userService.blockUser(id).subscribe(
            (res) => {
                if (!res.success) {
                    let msg = this._errorService.errorMessage(res);
                    this._commonService.error(msg);
                    this.isLoading = false;
                } else {
                    this.isLoading = false;
                    this.getUsers();
                }
            },
            (err) => {
                this.isLoading = false;
            }
        );
    }

    /**
     * Upload Signature
     * @param value
     */
    onFileChange(event) {
        // return
        let files = event.target.files[0];

        if (files.size < 1000000) {
            this.saveFiles(files);
        } else
            this._commonService.throwErr(
                'Please upload excel file with size less than 1 Mb.'
            );
    }

    /**
     * Save Uploaded Files
     */

    saveFiles(files: FileList) {
        this.isLoading1 = true;
        this._commonService.uploadFile(files).subscribe(
            (response) => {
                this.isLoading1 = false;
                this._changeDetectorRef.detectChanges();
                if (!response.success) {
                    if (response.requestCode == 401) {
                        this.isLoading1 = false;
                        return;
                    } else {
                        let msg = this._errorService.errorMessage(response);
                        this._commonService.throwErr(msg);
                        this.isLoading1 = false;
                    }
                } else {
                    this.isLoading1 = false;
                    this._commonService.success('Users imported successfully');
                    this.getUsers();
                }
            },
            (err) => {
                this.isLoading1 = false;
            }
        );
    }

    downloadSampleFile() {
        environment.apiEndPoint === 'https://dev-api.swasthyaingit.in/api/'
            ? this._commonService.downloadReport(
                  'https://dev-swasthyaingit.s3.ap-south-1.amazonaws.com/Uploads/User-management-demo-list.xlsx'
              )
            : this._commonService.downloadReport(
                  'https://s3.ap-south-1.amazonaws.com/swasthyaingit.in-s3-bucket/Uploads/User-management-demo-list.xlsx'
              );
    }
}
