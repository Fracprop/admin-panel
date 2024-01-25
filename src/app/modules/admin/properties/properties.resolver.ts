import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { CommonService } from '../common/common.service';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from './properties.service';
@Injectable({
  providedIn: 'root'
})
export class PropertiesResolver implements Resolve<boolean> {
  public id=''
  constructor(private _commanService: CommonService,private _activatedRoute:ActivatedRoute,private _propertiesSerives:PropertiesService) {
    this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<any> {
      return forkJoin([
       //this._propertiesSerives.getDetails(this.id)
          //  this._commanService.getQualification(),
          // this._commanService.getGender(),
      ]);
  }
}
