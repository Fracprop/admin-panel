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
import { CommonService } from '../../common/common.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AdminManagementService } from '../admin-management.service';
import { TranslocoService } from '@ngneat/transloco';
@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss'],
    styles: [
        `
            .admin-grid {
                grid-template-columns: auto auto auto;

                @screen sm {
                    grid-template-columns: auto auto auto auto;
                }

                @screen md {
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                }

                @screen lg {
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class AdminsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    confirmationDialog: FormGroup;
    users$: any = [];
    isLoading: boolean = false;
    isBlocked: boolean = false;
    pagination: any = {
        Limit_Records: 10,
        Skip_Records: 0,
        Total_Count: 0,
        Page_No: 0,
    };
    searchInputControl: FormControl = new FormControl();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private titleService: Title,
        private _changeDetectorRef: ChangeDetectorRef,
        private _adminService: AdminManagementService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService
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
        // Get the facilities
        //   this.getUsers();
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

    getUsers() {
        let paginationParams = {
            SkipRecords: this.pagination?.Skip_Records,
            LimitRecords: this.pagination?.Limit_Records,
        };
        if (this.searchInputControl.value) {
            paginationParams['Enter_Search'] = this.searchInputControl.value;
        }
        // this.isLoading = true;
        this._adminService.getAdmins({ ...paginationParams }).subscribe(
            (response) => {
                this.isLoading = false;
                this.pagination.Total_Count =
                    response?.totalRecords[0]['total'];
                this.users$ = [...response?.results];
                this._changeDetectorRef.detectChanges();
            },
            (err) => {
                this.isLoading = false;
            }
        );
    }

    pageChanged(e) {
        if (e?.pageSize !== this.pagination?.Limit_Records) {
            this.pagination.Limit_Records = e?.pageSize;
            this.resetPagination();
            return;
        }
        this.pagination.Limit_Records = e?.pageSize;
        this.pagination.Page_No = e?.pageIndex;
        this.pagination.Skip_Records =
            this.pagination?.Limit_Records * this.pagination?.Page_No;

        this.getUsers();
    }

    resetPagination() {
        this.pagination = {
            Limit_Records: this.pagination.Limit_Records,
            Skip_Records: 0,
            Total_Count: 0,
            Page_No: 0,
        };
        this.getUsers();
    }

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

    deleteAdmin(userId, fname, lname) {
        this.confirmationDialog.controls['title']?.setValue('Delete ');
        this.confirmationDialog.controls['message']?.setValue(
            'Are you sure you want to delete ' + fname + ' ' + lname + ' ?'
        );
        // Opening popup
        const dialogRef = this._fuseConfirmationService.open(
            this.confirmationDialog.value
        );

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._adminService.deleteAdmin({ userid: userId }).subscribe(
                    (response) => {
                        this.getUsers();
                    },
                    (err) => {
                        this.getUsers();
                    }
                );
            }
        });
    }

    onChange(userId, value) {
        if (value == true) {
            this._adminService
                .unblockAdmin({ userId })
                .subscribe((response) => {
                    this.getUsers();
                });
            return;
        } else {
            this._adminService.blockAdmin({ userId }).subscribe((response) => {
                this.getUsers();
            });
        }
    }
}
