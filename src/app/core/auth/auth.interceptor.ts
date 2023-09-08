import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { CommonService } from '../../modules/admin/common/common.service';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _commonService: CommonService,
        private _errorService: ErrorHandlingService
    ) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if (
            newReq?.url === 'http://43.204.0.14:8080/csnoserv/api/search/search'
        ) {
            newReq = req.clone({});
        } else {
            if (this._authService.accessToken) {
                newReq = req.clone({
                    setHeaders: {
                        'x-jwttoken':
                            'Bearer ' + this._authService.accessToken,
                     //   rejectUnauthorized: 'false',
                    },
                });
            } else {
                newReq = req.clone({
                    setHeaders: {
                       // rejectUnauthorized: 'false',
                    },
                });
            }
        }

        // Response
        return next.handle(newReq).pipe(
            tap({
                //Succeeds when there is a response; ignore other events
                next: (event) => {
                    let successError = event['body'];

                    if (!successError?.success) {
                        return this._errorService.errorMessage(successError);
                    }
                },

                // Operation failed; error is an HttpErrorResponse
                //  error: (error) => console.log(error),
            }),
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    //Sign out
                    console.log('----signout---')
                    this._authService.signOut();
                    //Reload the app
                    location.reload();
                }

                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 500
                ) {
                    this._commonService.throwErr(
                        'There is some issue at the server end, we are fixing it asap '
                    );
                }

                return throwError(error);
            })
        );
    }
}
