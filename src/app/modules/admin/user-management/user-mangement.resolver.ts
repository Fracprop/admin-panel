import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { CommonService } from '../common/common.service';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserMangementResolver implements Resolve<boolean> {
    /**
     * Constructor
     */
    constructor(private _commanService: CommonService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return forkJoin([
            //  this._commanService.getQualification(),
            // this._commanService.getGender(),
        ]);
    }
}
