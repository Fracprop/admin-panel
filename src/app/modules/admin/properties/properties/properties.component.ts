import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from '../../common/common.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss'],
    styles: [
        `
            .properties-grid {
                grid-template-columns: auto auto auto auto auto;

                @screen sm {
                    grid-template-columns: auto auto auto auto auto;
                }

                @screen md {
                    grid-template-columns: 150px 200px 200px 200px 200px 200px;
                }

                @screen lg {
                    grid-template-columns: 150px 200px 200px 200px 200px 200px;
                }
            }
        `,
    ],
})
export class PropertiesComponent implements OnInit {
    properties$: any = [];
    isLoading1: boolean = false;
    isLoading: boolean = false;
    public form: FormGroup;
    confirmationDialog: FormGroup;

    isBlocked: boolean = false;
    pagination: any = {
        limit: 5,
        pageNo: 0,
        TotalCount: 0,
        PageNo: 0,
    };

    constructor(
        private _propertiesService: PropertiesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _commonService: CommonService
    ) {
        this.confirmationForm();
    }

    ngOnInit(): void {
        this.getPropertiesList();
    }
    /**
     * Fetching  properties list
     */
    getPropertiesList() {
        let paginationParams = {
            pageNo: this.pagination?.pageNo,
            limit: this.pagination?.limit,
        };

        this.isLoading = true;
        this._propertiesService
            .getPropertiesList({ ...paginationParams })
            .subscribe(
                (response) => {
                    if (!response) {
                        if (response.requestCode == 401) {
                            this.isLoading = false;
                            return;
                        } else {
                            // let msg = this._errorService.errorMessage(response);
                            // this._commonService.error(msg);

                            this.isLoading = false;
                        }
                    } else {
                        this.isLoading = false;
                        localStorage.removeItem('propertyDetails');
                        localStorage.removeItem('fundingDetails');
                        localStorage.removeItem('financialDetails');

                        this.pagination.TotalCount = response?.Totalcount || 10;

                        this.properties$ = response?.PropertyRecords
                            ? [...response?.PropertyRecords]
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

        /* this.getBanks(); */
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
        /* this.getBanks(); */
    }
    /**
     *Reset filter
     */
    resetFilter() {
        this.form.reset();

        this.pagination = {
            limit: this.pagination.limit,
            pageNo: 0,
            TotalCount: 0,
            PageNo: 0,
        };
        /* this.getBanks(); */
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
    deleteContent(userId: string) {
        this.confirmationDialog.controls['title']?.setValue('Delete ');
        this.confirmationDialog.controls['message']?.setValue(
            'Are you sure you want to delete ?'
        );
        // Opening popup
        const dialogRef = this._fuseConfirmationService.open(
            this.confirmationDialog.value
        );

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._propertiesService.deleteProperty(userId).subscribe(
                    (response) => {
                        this.getPropertiesList();
                    },
                    (err) => {
                        this._commonService.error(err.error.message);
                    }
                );
            }
        });
    }
}
