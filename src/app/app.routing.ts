import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AdminMangementResolver } from './modules/admin/admin-management/admin-mangement.resolver';
import { UserMangementResolver } from './modules/admin/user-management/user-mangement.resolver';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
         canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            layout: 'futuristic',
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/admin/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
           

            
            {
                path: 'users',
                loadChildren: () =>
                    import(
                        'app/modules/admin/user-management/user-management.module'
                    ).then((m) => m.UserManagementModule),
                resolve: {
                    // commanDataForUser: UserMangementResolver,
                },
            },
            {
                path: 'banks',
                loadChildren: () =>
                    import(
                        'app/modules/admin/banks/banks.module'
                    ).then((m) => m.BanksModule),
            },
            {
                path: 'countries',
                loadChildren: () =>
                    import(
                        'app/modules/admin/countries/countries.module'
                    ).then((m) => m.CountriesModule),
            },

            // {
            //     path: 'admins',
            //     loadChildren: () =>
            //         import(
            //             'app/modules/admin/admin-management/admin-management.module'
            //         ).then((m) => m.AdminManagementModule),
            //     resolve: {
            //         commanData: AdminMangementResolver,
            //     },
            // },
            
            

            // {
            //     path: 'settings',
            //     loadChildren: () =>
            //         import('app/modules/admin/settings/settings.module').then(
            //             (m) => m.SettingsModule
            //         ),
            // },
        ],
    },
];
