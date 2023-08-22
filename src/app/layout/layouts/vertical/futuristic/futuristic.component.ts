import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { WebSocketService } from 'app/modules/admin/common/web-socket.service';
import { CommonService } from 'app/modules/admin/common/common.service';

@Component({
    selector: 'futuristic-layout',
    templateUrl: './futuristic.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            :host ::ng-deep.ps > .ps__rail-y .ps__thumb-y {
                background: white !important;
            }
        `,
    ],
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userDetails: any;
    showAvatar: boolean = true;
    userAvatar: any;

    user$: Observable<any[]>;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _authService: AuthService,
        private _webSocket: WebSocketService,
        public _commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this.user$ = this._commonService.user$;
        this._commonService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (res?.profilePicture == '') {
                    this.showAvatar = false;
                } else {
                    this.showAvatar = true;
                    this.viewProfile(res?.profilePicture);
                }
                this._changeDetectorRef.markForCheck();
            });
        /**
         * Initializing web sockets
         */
        // this._webSocket.connectSockets(
        //     JSON.parse(localStorage.getItem('user'))['adminId']
        // );

        // fetch user details after login
        this.fetchUserDetails();
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.userDetails = JSON.parse(localStorage.getItem('user'));
                this.navigation = navigation;
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    fetchUserDetails() {}

    /**
     * Fetching navigation items array upon condition
     */
    fetchNavItems(id) {
        switch (id) {
            case 2:
                return this.navigation?.superAdmin;

            default:
                return this.navigation?.superAdmin;
        }
    }
    viewProfile(fileName: string) {
        if (fileName) {
            this._commonService
                .getFileFromServer({ ImageName: fileName })
                .subscribe(
                    (res) => {
                        this.userAvatar = res?.result;
                        this._changeDetectorRef.detectChanges();
                    },
                    (err) => {
                        this._commonService.throwErr(
                            'Not able to access the file.'
                        );
                    }
                );
        }
    }
}
