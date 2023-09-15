import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  styles: [
    `
        .properties-grid {
            grid-template-columns: auto auto auto;

            @screen sm {
                grid-template-columns: auto auto auto auto;
            }

            @screen md {
                grid-template-columns: auto auto auto;
            }

            @screen lg {
                grid-template-columns: auto auto auto;
            }
        }
    `,
]
})
export class PropertiesComponent implements OnInit {
  properties$: any = [];
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
        private _propertiesService: PropertiesService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
       
    }
    /**
     * Fetching  properties list
     */
    /* getPropertiesList() {
        let paginationParams = {
            pageNo: this.pagination?.pageNo,
            limit: this.pagination?.limit,
        };

        this.isLoading = true;
        this._bankService.getBanksList({ ...paginationParams }).subscribe(
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

                    this.pagination.TotalCount = response?.totalCount;

                    this.banks$ = response?.banks
                        ? [...response?.banks]
                        : [];

                      
                    this._changeDetectorRef.detectChanges();
                }
            },
            (err) => {
                this.isLoading = false;
            }
        );
    } */

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

}
