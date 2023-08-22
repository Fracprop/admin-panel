import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getCountriesList(obj) {
        return this._httpClient
            .get(environment.apiEndPoint + 'country', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    addCountry(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'country', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
