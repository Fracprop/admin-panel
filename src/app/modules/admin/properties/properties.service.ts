import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PropertiesService {
    constructor(private _httpClient: HttpClient) {}

    getPropertiesList(obj) {
      return this._httpClient
          .get(
              environment.apiEndPoint +
                  'bank/getallBanks/' +
                  obj.pageNo +
                  '/' +
                  obj.limit,
              {}
          )
          .pipe(switchMap((response: any) => of(response)));
  }
  addProperty(obj): Observable<any> {
      return this._httpClient
          .post(environment.apiEndPoint + 'bank', {
              ...obj,
          })
          .pipe(switchMap((response: any) => of(response)));
  }
}
