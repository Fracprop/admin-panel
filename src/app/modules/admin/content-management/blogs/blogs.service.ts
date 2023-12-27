import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BlogsService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
    getList(obj) {
        return this._httpClient
            .get(
                environment.apiEndPoint +
                    'user-blog/' +
                    obj.pageNo +
                    '/' +
                    obj.limit
            )
            .pipe(switchMap((response: any) => of(response)));
    }
    getDetails(id: string) {
        return this._httpClient
            .get(environment.apiEndPoint + 'user-blog/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    addBlogs(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'user-blog', {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    editBlogs(obj: any, id: string): Observable<any> {
        return this._httpClient
            .patch(environment.apiEndPoint + 'user-blog/' + id, {
                ...obj,
            })
            .pipe(switchMap((response: any) => of(response)));
    }
    deleteBlogs(id: string): Observable<any> {
        return this._httpClient
            .delete(environment.apiEndPoint + 'user-blog/' + id)
            .pipe(switchMap((response: any) => of(response)));
    }
    upload(obj): Observable<any> {
      return this._httpClient
          .post(environment.apiEndPoint + 'upload', obj)
          .pipe(switchMap((response: any) => of(response)));
  }
}
