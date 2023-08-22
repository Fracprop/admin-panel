import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();
        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;
            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            en: 'us',
            hn: 'hn',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                'mainNavigation'
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const DashboardItem = this._fuseNavigationService.getItem(
            'dashboard',
            navigation
        );
        if (DashboardItem) {
            this._translocoService
                .selectTranslate('dashboard')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    DashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        const userDashboardItem = this._fuseNavigationService.getItem(
            'users',
            navigation
        );
        const facilitiesDashboardItem = this._fuseNavigationService.getItem(
            'facilities',
            navigation
        );
        const facilityDashboardItem = this._fuseNavigationService.getItem(
            'Facility',
            navigation
        );
        const plhivDashboardItem = this._fuseNavigationService.getItem(
            'patients',
            navigation
        );
        const rrfsDashboardItem = this._fuseNavigationService.getItem(
            'RRF',
            navigation
        );
        const teleRequestDashboardItem = this._fuseNavigationService.getItem(
            'teleconsultations-requests',
            navigation
        );
        const teleConsultationDashboardItem =
            this._fuseNavigationService.getItem(
                'teleconsultations-meetings',
                navigation
            );
        const reportsDashboardItem = this._fuseNavigationService.getItem(
            'reports',
            navigation
        );
        const adminsDashboardItem = this._fuseNavigationService.getItem(
            'admins',
            navigation
        );

        if (adminsDashboardItem) {
            this._translocoService
                .selectTranslate('admins')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    adminsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (userDashboardItem) {
            this._translocoService
                .selectTranslate('users')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    userDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (facilitiesDashboardItem) {
            this._translocoService
                .selectTranslate('facilities')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    facilitiesDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (facilityDashboardItem) {
            this._translocoService
                .selectTranslate('facility')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    facilityDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (plhivDashboardItem) {
            this._translocoService
                .selectTranslate('plhiv_list')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    plhivDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (rrfsDashboardItem) {
            this._translocoService
                .selectTranslate('list_of_rrfs')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    rrfsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (teleRequestDashboardItem) {
            this._translocoService
                .selectTranslate('teleconsultation_requests')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    teleRequestDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (teleConsultationDashboardItem) {
            this._translocoService
                .selectTranslate('teleconsultation')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    teleConsultationDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        if (reportsDashboardItem) {
            this._translocoService
                .selectTranslate('reports')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    reportsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}
