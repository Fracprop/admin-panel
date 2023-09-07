import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from '../../../environments/environment';
import { CommonService } from 'app/modules/admin/common/common.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'app/shared/services/error-handling.service';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        public _commonService: CommonService,
        public _router: Router,
        private _errorService: ErrorHandlingService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Setter & getter for user
     */
    set user(obj: any) {
        localStorage.setItem('user', JSON.stringify(obj));
    }

    get user(): any {
        return JSON.parse(localStorage.getItem('user')) ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param UserName
     */
    forgotPassword(UserName: string): Observable<any> {
        return this._httpClient.post(
            environment.apiEndPoint + 'Auth/AdminForgotRequestOTP',
            { UserName }
        );
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Fetch User Details
     *
     * @param password
     */
    fetchUserDetails(): Observable<any> {
        return this._httpClient.get(
            environment.apiEndPoint + 'ValidateUser/GetLoggedUser',
            {
                params: {
                    username: this.user?.userEmail,
                },
            }
        );
    }

    checkRolesForNavigation(obj) {
        // let roles = this.user['user_role_m'];
        // let result = [];
        // roles.forEach(e => {
        //     obj.forEach(n=>{
        //         if(e?.role_name === n?.id){
        //         }
        //     })
        // });
    }

    /**
     * Sign in
     *
     * @param credentials
     */
     
    signIn(credentials: {
        email: string;
        Password: string;
    }): Observable<any> {
        let c = {
            email: credentials['email'],
            password: credentials['password'],
        };
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        // return this._httpClient
        //     .get(environment.apiEndPoint + 'PersonDetails/GetAllPersons', {})
        //     .pipe();

        return this._httpClient
            .post(environment.apiEndPoint + 'user/login', c)
            .pipe(
                switchMap((response: any) => {
                    if (response?.userValue?.role==='ADMIN') {
                        console.log('-login')
                        
                        // Store the access token in the local storage
                        this.accessToken = response.access_token;

                        this.user = response.userValue;

                        // Set the authenticated flag to true
                        this._authenticated = true;

                        // Store the user on the user service
                        this._commonService.user = response.model;
                        // Return a new observable with the response
                    }

                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Return true
        return of(true);
        // Renew token
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'user/logout', {})
            .pipe(
                switchMap((response: any) => {
                    localStorage.removeItem('accessToken');

                    localStorage.removeItem('email');
                    localStorage.removeItem('user');

                    // Set the authenticated flag to false
                    this._authenticated = false;
                    this._router.navigate(['/sign-in']);

                    return of(true);
                })
            );

        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        localStorage.removeItem('email');
        localStorage.removeItem('user');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
