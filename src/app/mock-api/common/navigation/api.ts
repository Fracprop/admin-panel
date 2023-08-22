import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
    // AdminNavigation,
    compactNavigation,
    // defaultNavigation,
    futuristicNavigation,
    horizontalNavigation,
    SuperAdminNavigation,
} from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private readonly _compactNavigation: FuseNavigationItem[] =
        compactNavigation;
    // private readonly _superAdminNavigation: FuseNavigationItem[] =
    //     defaultNavigation;
    // private readonly _adminNavigation: FuseNavigationItem[] = AdminNavigation;
    private readonly _superAdminNavigation: FuseNavigationItem[] =
        SuperAdminNavigation;
    // private readonly _default2Navigation: FuseNavigationItem[] =
    //     default2Navigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] =
        futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] =
        horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            // Fill compact navigation children using the default navigation
            this._compactNavigation.forEach((compactNavItem) => {
                this._superAdminNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === compactNavItem.id) {
                        compactNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Fill futuristic navigation children using the default navigation
            this._futuristicNavigation.forEach((futuristicNavItem) => {
                this._superAdminNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === futuristicNavItem.id) {
                        futuristicNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Fill horizontal navigation children using the default navigation
            this._horizontalNavigation.forEach((horizontalNavItem) => {
                this._superAdminNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === horizontalNavItem.id) {
                        horizontalNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Return the response
            return [
                200,
                {
                    compact: cloneDeep(this._compactNavigation),
                    default: cloneDeep(this._superAdminNavigation),
                    futuristic: cloneDeep(this._futuristicNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation),
                    //   admin: cloneDeep(this._adminNavigation),
                    superAdmin: cloneDeep(this._superAdminNavigation),
                    //  default2: cloneDeep(this._default2Navigation),
                },
            ];
        });
    }
}
