import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  public loading: boolean = false;
  users$: any = [];
  isLoading1: boolean = false;
  isLoading: boolean = false;


  isBlocked: boolean = false;
  pagination: any = {
      LimitRecords: 10,
      SkipRecords: 0,
      TotalCount: 0,
      PageNo: 0,
  };


  constructor(private _CountryService:CountriesService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

    /**
     * Fetching  user list
     */
    getCountries() {
      let paginationParams = {
         
          SkipRecords: this.pagination?.SkipRecords,
          LimitRecords: this.pagination?.LimitRecords,
      };
     
      this.isLoading = true;
      this._CountryService.getCountriesList({ ...paginationParams }).subscribe(
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
  
      this.getCountries();
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
      this.getCountries();
  }

}
