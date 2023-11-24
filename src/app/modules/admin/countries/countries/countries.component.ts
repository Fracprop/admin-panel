import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CountriesService } from '../countries.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class CountriesComponent implements OnInit {
    public loading: boolean = false;
    countries$: any = [];
    isLoading1: boolean = false;
    isLoading: boolean = false;
    isBlocked: boolean = false;
    pagination: any = {
        limit: 10,
        pageNo: 0,
        TotalCount: 0,
        PageNo: 0,
    };

    constructor(
        private _CountryService: CountriesService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getCountries();
    }

    /**
     * Fetching  user list
     */
    getCountries() {
        let paginationParams = {
            pageNo: this.pagination?.PageNo,
            limit: this.pagination?.limit,
        };

        this.isLoading = true;
        this._CountryService
            .getCountriesList({ ...paginationParams })
            .subscribe(
                (response) => {
                    this.isLoading = false;

                    this.pagination.TotalCount = response?.totalCount;

                    this.countries$ = response?.country
                        ? [...response?.country]
                        : [];
                    this._changeDetectorRef.detectChanges();
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

        this.getCountries();
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
        this.getCountries();
    }
}
