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
    getProvines( countryId) {
        return this._httpClient
            .get(
                environment.apiEndPoint + 'province/'+countryId,

                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getCities(countryId: string, provinceId: string) {
        console.log(provinceId,countryId)
        return this._httpClient
            .post(
                environment.apiEndPoint +
                    'city/getCity' ,
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
                    'property/' +
                    obj.limit+'/' +
                    obj.pageNo ,
                   
                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'property' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addProperty(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'bank', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    editProperty(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'what-new/' + id, {
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
