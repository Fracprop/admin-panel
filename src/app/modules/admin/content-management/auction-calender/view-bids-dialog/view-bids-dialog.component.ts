import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuctionCalenderService } from '../auction-calender.service';
import { CommonService } from 'app/modules/admin/common/common.service';

@Component({
    selector: 'app-view-bids-dialog',
    templateUrl: './view-bids-dialog.component.html',
    styleUrls: ['./view-bids-dialog.component.scss'],
    styles: [
        `
            .auction-grid {
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
export class ViewBidsDialogComponent implements OnInit {
    public loading: boolean = false;
    auctionList$: any = [];
    propertyList$: any = [];
    isLoading1: boolean = false;
    isLoading: boolean = false;
    public form: FormGroup;
    displayedColumns: string[] = ['id', 'name', 'date', 'amount', 'action'];

    isBlocked: boolean = false;
    pagination: any = {
        limit: 10,
        pageNo: 0,
        TotalCount: 0,
        PageNo: 0,
    };

    constructor(
        private _auctionService: AuctionCalenderService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _commonService: CommonService,
        private _matDialog: MatDialog,
        public matDialogRef: MatDialogRef<ViewBidsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    ngOnInit(): void {
        this.getListing();
    }

    /**
     * Fetching  banks list
     */
    getListing() {
        console.log(this.data);

        let paginationParams = {
            pageNo: this.pagination?.pageNo || 0,
            limit: this.pagination?.limit || 10,
        };

        this.isLoading = true;
        this._auctionService.getBidList({ id: this.data.message.id }).subscribe(
            (response) => {
                this.isLoading = false;

                this.pagination.TotalCount = response?.totalAuction || 5;
                

                this.auctionList$ = response
                    ? [...response]
                    : [];

                this._changeDetectorRef.detectChanges();
            },
            (err) => {
                console.log(err);
                this._commonService.error(err.error.message);
                this.isLoading = false;
            }
        );
    }
    changeStatusOfBid(id: any, auctionId: any, user_id: any) {
        this.isLoading = true;
        this._auctionService
            .updateBidStatus({
                bidId: id,
                auction_id: auctionId,
                user_id: user_id,
            })
            .subscribe(
                (response) => {
                    this.isLoading = false;

                    this._commonService.success('Bid is successfully accepted');
                   this.close('cancelled')

                    this._changeDetectorRef.detectChanges();
                },
                (err) => {
                    console.log(err);
                    this._commonService.error(err.error.message);
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
    /**
     * Close Dialog
     */
    close(action: any) {
        this.matDialogRef.close(action);
    }
}
