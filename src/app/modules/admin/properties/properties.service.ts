import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PropertiesService {
    public _form: ReplaySubject<any> = new ReplaySubject<any>(1);
    formData: any = {
        step1Data: 'invalid',
        step2Data: 'invalid',
        step3Data:'invalid',
      };
      set formStatus(value: any) {
        // Store the value
        this._form.next(value);
      }
      get formStatus$(): Observable<any> {
        return this._form.asObservable();
      }
    
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
                    obj.pageNo+'/'+
                    obj.limit
                    ,
                   
                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'property/'+id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addProperty(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'property', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    editProperty(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'property/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteProperty(id: string): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + 'property/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }

    upload(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'upload', obj)
            .pipe(switchMap((response: any) => of(response)));
    }
}
