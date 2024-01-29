import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyBuyShareService {

  constructor(private _httpClient: HttpClient) {}
  getList(obj: any) {
      return this._httpClient
      .get(
          environment.apiEndPoint +
              'fund-account/auctionListForAdmin' ,
              
          {}
      )
      .pipe(switchMap((response: any) => of(response)));
  }
  getDetails(id: string) {
      return this._httpClient
          .get(environment.apiEndPoint + 'fund-account/getAuction/' + id)
          .pipe(switchMap((response: any) => of(response)));
  }
  buyShare(obj: any): Observable<any> {
      return this._httpClient
          .post(environment.apiEndPoint + 'user-bids/userBidForAdmin', {
              ...obj,
          })
          .pipe(switchMap((response: any) => of(response)));
  }

}
