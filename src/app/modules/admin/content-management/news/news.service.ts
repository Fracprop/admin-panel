import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

   /**
     * Constructor
     */
   constructor(private _httpClient: HttpClient) {}
   getList(obj) {
       return this._httpClient
           .get(environment.apiEndPoint + 'news/' +
           obj.pageNo +
           '/' +
           obj.limit,)
           .pipe(switchMap((response: any) => of(response)));
   }
   getDetails(id: string) {
       return this._httpClient
           .get(environment.apiEndPoint + 'news/' + id)
           .pipe(switchMap((response: any) => of(response)));
   }
   addNews(obj): Observable<any> {
       return this._httpClient
           .post(environment.apiEndPoint + 'news', {
               ...obj,
           })
           .pipe(switchMap((response: any) => of(response)));
   }

   editNews(obj: any, id: string): Observable<any> {
       return this._httpClient
           .patch(environment.apiEndPoint + 'news/' + id, {
               ...obj,
           })
           .pipe(switchMap((response: any) => of(response)));
   }
   deleteNews(id:string): Observable<any> {
     return this._httpClient
         .delete(environment.apiEndPoint + 'news/'+id)
         .pipe(switchMap((response: any) => of(response)));
 }
}
