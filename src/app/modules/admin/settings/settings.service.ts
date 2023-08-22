import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SettingsService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    updatePassword(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'AdminProfile/ChangePassword', obj)

            .pipe(switchMap((response: any) => of(response)));
    }
}
