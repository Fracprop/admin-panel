import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UserManagementService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // ----------------------------------------------------------------------------------------------------
    getRoles(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'user_role_m/GetAll', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    getUserDetails(obj) {
        return this._httpClient
            .get(environment.apiEndPoint + 'Doctors/GetDoctor', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    addAdmin(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'Doctors/InsertDoctor', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    updateAdmin(obj): Observable<any> {
        return this._httpClient
            .put(environment.apiEndPoint + 'Doctors/UpdateDoctor', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    addUser(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/Add_NormalUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    updateUser(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/Add_NormalUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    getAdmins(obj) {
        return this._httpClient
            .get(environment.apiEndPoint + 'Masters/GetDoctorList', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    getUserMenu(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint + 'AdminInstitution/GetUserDefaultMenu',
                {}
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    deleteUser(obj): Observable<any> {
        return this._httpClient
            .delete(
                environment.apiEndPoint + 'user_master_m/DeleteUserDetail',
                {
                    params: { ...obj },
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    blockUser(id): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + `Doctors/BlockDoctor/${id}`, {})
            .pipe(switchMap((response: any) => of(response)));
    }

    unblockUser(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user_master_m/UnBlockUser', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
