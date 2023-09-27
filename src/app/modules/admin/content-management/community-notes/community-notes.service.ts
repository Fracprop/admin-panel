import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommunityNotesService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getList(obj) {
        return this._httpClient
            .get(environment.apiEndPoint + 'community-notes/getAll/' +
            obj.pageNo +
            '/' +
            obj.limit,)
            .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'community-notes/findeOne/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addCommunityNotes(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'community-notes', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    editCommunityNotesContent(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'community-notes/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteCommunityNotesContent(id:string): Observable<any> {
      return this._httpClient
          .delete(environment.apiEndPoint + 'community-notes/'+id)
          .pipe(switchMap((response: any) => of(response)));
  }
}
