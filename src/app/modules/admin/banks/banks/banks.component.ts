import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BanksService } from '../banks.service';

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
    public loading: boolean = false;
    users$: any = [];
    isLoading1: boolean = false;
    isLoading: boolean = false;
    public form: FormGroup;

    isBlocked: boolean = false;
    pagination: any = {
        LimitRecords: 10,
        SkipRecords: 0,
        TotalCount: 0,
        PageNo: 0,
    };

    constructor(
        private _bankService: BanksService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}
    /**
     * Fetching  user list
     */
    getBanks() {
        let paginationParams = {
            SkipRecords: this.pagination?.SkipRecords,
            LimitRecords: this.pagination?.LimitRecords,
        };

        this.isLoading = true;
        this._bankService.getBanksList({ ...paginationParams }).subscribe(
            (response) => {
                if (!response.success) {
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

                    this.pagination.TotalCount = response?.total_Records;

                    this.users$ = response?.lstModel
                        ? [...response?.lstModel]
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
        if (e?.pageSize !== this.pagination?.LimitRecords) {
            this.pagination.LimitRecords = e?.pageSize;
            this.resetPagination();
            return;
        }
        this.pagination.LimitRecords = e?.pageSize;
        this.pagination.PageNo = e?.pageIndex;
        this.pagination.SkipRecords =
            this.pagination?.LimitRecords * this.pagination?.PageNo;

        this.getBanks();
    }
    /**
     *Reset pagination
     */

    resetPagination() {
        this.pagination = {
            LimitRecords: this.pagination.LimitRecords,
            SkipRecords: 0,
            TotalCount: 0,
            PageNo: 0,
        };
        this.getBanks();
    }
    /**
     *Reset filter
     */
    resetFilter() {
        this.form.reset();

        this.pagination = {
            LimitRecords: this.pagination.LimitRecords,
            SkipRecords: 0,
            TotalCount: 0,
            PageNo: 0,
        };
        this.getBanks();
    }
}
