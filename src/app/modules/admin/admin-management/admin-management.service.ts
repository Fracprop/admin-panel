import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AdminManagementService {
    constructor(private _httpClient: HttpClient) {}

    addAdmin(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/NacoAdminUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    updateAdmin(obj): Observable<any> {
        return this._httpClient
            .put(
                environment.apiEndPoint + 'user_master_m/NacoAdminUserUpdate',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    getAdmins(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint + 'user_master_m/GetAllNacoAdminUser',
                {
                    params: { ...obj },
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    deleteAdmin(obj): Observable<any> {
        return this._httpClient
            .delete(
                environment.apiEndPoint + 'user_master_m/DeleteUserDetail',
                {
                    params: { ...obj },
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    blockAdmin(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/BlockUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    unblockAdmin(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/UnBlockUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
