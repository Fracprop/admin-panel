import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private _httpClient: HttpClient) {}
    getList(obj: any) {
        return this._httpClient
        .get(
            environment.apiEndPoint +
                'fund-account/financeList' ,
                
            {}
        )
        .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'what-new/getWhatNewId/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addFeeParameters(obj: any): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'fund-account/finance', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    editFeeParameters(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'fund-account/finance/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
