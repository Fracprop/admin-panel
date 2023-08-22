import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DashboardService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getDasboard(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'ProfileReports/DashBoardReports', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    getCounters(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'AdminDashboardHWC/GetCounters', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    getGenderCounters(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint + 'AdminDashboardHWC/GetGenderCounters',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    GetBacthActiveMembersCount(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint +
                    'AdminDashboardHWC/GetBacthActiveMembersCount',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    getActiveMemberDetails(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint +
                    'AdminDashboardHWC/GetBacthOnlyActiveMembersCount',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    GetBacthVCCount(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint + 'AdminDashboardHWC/GetBacthVCCount',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    GetDistrictLineChart(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint +
                    'AdminDashboardHWC/GetDistrictLineChart',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getAdmins(obj) {
        return this._httpClient
            .get(environment.apiEndPoint + 'Masters/GetDoctorList', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }
}
