import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BanksService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getBanksList(obj) {
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
    addBank(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'bank', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
