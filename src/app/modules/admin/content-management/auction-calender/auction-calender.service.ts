import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuctionCalenderService {

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getList(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint +
                    'faq/' +
                    obj.pageNo +
                    '/' +
                    obj.limit
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'faq/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addAuction(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'faq', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    editAuction(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'faq/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteAuction(id: string): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + 'faq/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
}
