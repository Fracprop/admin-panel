import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { WhatsNewService } from '../whats-new.service';

@Component({
    selector: 'app-whats-new-listing',
    templateUrl: './whats-new-listing.component.html',
    styleUrls: ['./whats-new-listing.component.scss'],
    styles: [
        `
            .content-grid {
                grid-template-columns: auto auto auto auto auto;

                @screen sm {
                    grid-template-columns: auto auto auto auto auto;
                }

                @screen md {
                    grid-template-columns: 200px 200px 200px 200px 200px;
                }

                @screen lg {
                    grid-template-columns: 200px 200px 200px 200px 200px;
                }
            }
        `,
    ],
})
export class WhatsNewListingComponent implements OnInit {
    confirmationDialog: FormGroup;
    public loading: boolean = false;
    contentList$: any = [];
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

    constructor(
        private _whatsNewService: WhatsNewService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _commonService: CommonService
    ) {
        this.confirmationForm();
    }
    ngOnInit(): void {
        this.getListing();
    }
    /**
     * Fetching  banks list
     */
    getListing() {
        let paginationParams = {
            pageNo: this.pagination?.pageNo,
            limit: this.pagination?.limit,
        };

        this.isLoading = true;
        this._whatsNewService.getList({ ...paginationParams }).subscribe(
            (response) => {
                this.isLoading = false;

                this.pagination.TotalCount = response?.totalCount || 10;

                this.contentList$ = response.getRecords ? [...response.getRecords] : [];

                this._changeDetectorRef.detectChanges();
            },
            (err) => {
                this._commonService.error(err.message);
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

        this.getListing();
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
        this.getListing();
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
                this._whatsNewService.deleteWhatsNewContent(userId).subscribe(
                    (response) => {
                        this.getListing();
                    },
                    (err) => {
                        this._commonService.error(err.error.message);
                    }
                );
            }
        });
    }
}
