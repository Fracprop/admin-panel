import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuctionCalenderService } from '../auction-calender.service';
import { CommonService } from 'app/modules/admin/common/common.service';

@Component({
    selector: 'app-approval-dialog',
    templateUrl: './approval-dialog.component.html',
    styleUrls: ['./approval-dialog.component.scss'],
})
export class ApprovalDialogComponent implements OnInit {
    form: FormGroup;
    loading = false;
    constructor(
        public matDialogRef: MatDialogRef<ApprovalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _auctionService: AuctionCalenderService,
        private _commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            startDate: [null, []],
            endDate: [null, []],
        });
    }
    approve() {
        this.loading = true;
        if (this.data.message.isApprove) {
            if (this.form.invalid) {
                this.loading = false;
                return;
            }
            if (
                Date.parse(this.form.value.startdate) <=
                Date.parse(this.form.value.endadate)
            ) {
                this.loading = false;
                this._commonService.error(
                    'End Date should be greater than start date'
                );
                this.loading = false;
                return;
            }
        }
        let data: {};
        this.data.message.isApprove ? (data = { ...this.form.value }) : '';

        this._auctionService
            .approveAuction({
                auctionId: this.data.message.id,
                admin_status: this.data.message.isApprove,
                ...data
            })
            .subscribe(
                (response) => {
                    this.loading = false;
                    this.close('confirmed');
                },
                (err) => {
                    this.loading = false;
                    this._commonService.error(err.error.message);
                }
            );
    }
    /**
     * Close Dialog
     */
    close(action: any) {
        this.matDialogRef.close(action);
    }
}
