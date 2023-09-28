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
    getCountries(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint + 'country',

                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getProvines(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint + 'province/',

                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getCities(countryId: String, provinceId: String) {
        return this._httpClient
            .get(
                environment.apiEndPoint +
                    'city/getCity' +
                    {
                        p_id: provinceId,
                        c_id: countryId,
                    }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

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
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'what-new/getWhatNewId/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addProperty(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'bank', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteProperty(id: string): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + 'what-new/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }

    upload(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'upload', obj)
            .pipe(switchMap((response: any) => of(response)));
    }
}
