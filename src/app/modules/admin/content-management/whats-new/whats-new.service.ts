import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class WhatsNewService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getList(obj: any) {
        return this._httpClient
        .get(
            environment.apiEndPoint +
                'what-new/getAll/' +
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
    addWhatsNewContent(obj: any): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'what-new', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    editWhatsNewContent(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'what-new/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteWhatsNewContent(id: string): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + 'what-new/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
}
