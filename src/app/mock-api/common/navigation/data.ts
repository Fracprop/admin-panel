/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const SuperAdminNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard',
    },
    {
        id: 'user',
        title: 'User Mangement',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/users/list',
    },
    {
        id: 'banks',
        title: 'Banks',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/banks/list',
    },
    {
        id: 'countries',
        title: 'Countries',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/countries/list',
    },
    {
        id: 'propterties',
        title: 'Propterties',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/properties/list',
    },
    // {
    //     id: 'users',
    //     title: 'User Mangement',
    //     type: 'collapsable',
    //     icon: 'heroicons_outline:user',

    //     children: [
    //         {
    //             id: 'users',
    //             title: 'Users',
    //             type: 'basic',

    //             link: '/users/list',
    //         },

    //         // {
    //         //     id: 'admins',
    //         //     title: 'Admins',
    //         //     type: 'basic',
    //         //     icon: 'mat_outline:supervisor_account',
    //         //     link: '/admins/list',
    //         // },
    //     ],
    // },
    // {
    //     id: 'patients',
    //     title: 'Patients',
    //     type: 'basic',
    //     icon: 'mat_outline:supervisor_account',
    //     link: '/patients/list',
    // },
    // {
    //     id: 'consultations',
    //     title: 'Consultations',
    //     type: 'basic',
    //     icon: 'mat_outline:supervisor_account',
    //     link: '/consultations/list',
    // },

   
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'add-rrf',
        title: 'RRF',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-list',
        link: '/add-rrf',
    },
    {
        id: 'rrf-logs',
        title: 'RRF Logs',
        type: 'basic',
        icon: 'heroicons_outline:annotation',
        link: '/rrf-logs',
    },
    {
        id: 'patients',
        title: 'Patients',
        type: 'collapsable',
        icon: 'heroicons_outline:finger-print',
        children: [
            {
                id: 'patients.list',
                title: 'Patients List',
                type: 'basic',
                link: '/patients/list',
            },
            {
                id: 'patients.add',
                title: 'Add Patient',
                type: 'basic',
                link: '/patients/add-patient',
            },
        ],
    },
    {
        id: 'facilities',
        title: 'Facilities',
        type: 'collapsable',
        icon: 'heroicons_outline:office-building',
        children: [
            {
                id: 'facilities.list',
                title: 'Facilities List',
                type: 'basic',
                link: '/facilities/list',
            },
            {
                id: 'facilities.add',
                title: 'Add Facility',
                type: 'basic',
                link: '/facilities/add-facility',
            },
        ],
    },
    {
        id: 'users',
        title: 'Users',
        type: 'collapsable',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'users.list',
                title: 'Users List',
                type: 'basic',
                link: '/users/list',
            },
            {
                id: 'users.add',
                title: 'Add User',
                type: 'basic',
                link: '/users/add-user',
            },
        ],
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:view-grid',
        link: '/dashboard',
    },
    {
        id: 'facilities',
        title: 'User Mangement',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/users/list',
    },
    // {
    //     id: 'users',
    //     title: 'User Mangement',
    //     type: 'collapsable',
    //     icon: 'heroicons_outline:user',

    //     children: [
    //         {
    //             id: 'users',
    //             title: 'Users',
    //             type: 'basic',
    //             icon: 'heroicons_outline:user',
    //             link: '/users/list',
    //         },

    //         {
    //             id: 'admins',
    //             title: 'Admins',
    //             type: 'basic',
    //             icon: 'mat_outline:supervisor_account',
    //             link: '/admins/list',
    //         },
    //     ],
    // },
    // {
    //     id: 'patients',
    //     title: 'Patients',
    //     type: 'basic',
    //     icon: 'mat_outline:supervisor_account',
    //     link: '/patients/list',
    // },
    // {
    //     id: 'consultations',
    //     title: 'Consultations',
    //     type: 'basic',
    //     icon: 'mat_outline:supervisor_account',
    //     link: '/consultations/list',
    // },

    // {
    //     id: 'reports',
    //     title: 'Reports',
    //     type: 'collapsable',
    //     icon: 'heroicons_outline:chart-square-bar',
    //     children: [
    //         {
    //             id: 'health-facilities-report',
    //             title: 'Health Facilities',
    //             type: 'basic',
    //             icon: 'mat_outline:supervisor_account',
    //             link: '/health-facilities',
    //         },
    //     ],
    // },
];
// export const futuristicNavigation: FuseNavigationItem[] = [
//     {
//         id: 'add-rrf',
//         title: 'RRF',
//         type: 'basic',
//         icon: 'heroicons_outline:clipboard-list',
//         link: '/add-rrf',
//     },
//     {
//         id: 'rrf-logs',
//         title: 'RRF Logs',
//         type: 'basic',
//         icon: 'heroicons_outline:annotation',
//         link: '/rrf-logs',
//     },
//     {
//         id: 'patients',
//         title: 'Patients',
//         type: 'collapsable',
//         icon: 'heroicons_outline:finger-print',
//         children: [
//             {
//                 id: 'patients.list',
//                 title: 'Patients List',
//                 type: 'basic',
//                 link: '/patients/list',
//             },
//             {
//                 id: 'patients.add',
//                 title: 'Add Patient',
//                 type: 'basic',
//                 link: '/patients/add-patient',
//             },
//         ],
//     },
//     {
//         id: 'facilities',
//         title: 'Facilities',
//         type: 'collapsable',
//         icon: 'heroicons_outline:office-building',
//         children: [
//             {
//                 id: 'facilities.list',
//                 title: 'Facilities List',
//                 type: 'basic',
//                 link: '/facilities/list',
//             },
//             {
//                 id: 'facilities.add',
//                 title: 'Add Facility',
//                 type: 'basic',
//                 link: '/facilities/add-facility',
//             },
//         ],
//     },
//     {
//         id: 'users',
//         title: 'Users',
//         type: 'collapsable',
//         icon: 'heroicons_outline:user',
//         children: [
//             {
//                 id: 'users.list',
//                 title: 'Users List',
//                 type: 'basic',
//                 link: '/users/list',
//             },
//             {
//                 id: 'users.add',
//                 title: 'Add User',
//                 type: 'basic',
//                 link: '/users/add-user',
//             },
//         ],
//     },
// ];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'add-rrf',
        title: 'RRF',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-list',
        link: '/add-rrf',
    },
    {
        id: 'rrf-logs',
        title: 'RRF Logs',
        type: 'basic',
        icon: 'heroicons_outline:annotation',
        link: '/rrf-logs',
    },
    {
        id: 'patients',
        title: 'Patients',
        type: 'collapsable',
        icon: 'heroicons_outline:finger-print',
        children: [
            {
                id: 'patients.list',
                title: 'Patients List',
                type: 'basic',
                link: '/patients/list',
            },
            {
                id: 'patients.add',
                title: 'Add Patient',
                type: 'basic',
                link: '/patients/add-patient',
            },
        ],
    },
    {
        id: 'facilities',
        title: 'Facilities',
        type: 'collapsable',
        icon: 'heroicons_outline:office-building',
        children: [
            {
                id: 'facilities.list',
                title: 'Facilities List',
                type: 'basic',
                link: '/facilities/list',
            },
            {
                id: 'facilities.add',
                title: 'Add Facility',
                type: 'basic',
                link: '/facilities/add-facility',
            },
        ],
    },
    {
        id: 'users',
        title: 'Users',
        type: 'collapsable',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'users.list',
                title: 'Users List',
                type: 'basic',
                link: '/users/list',
            },
            {
                id: 'users.add',
                title: 'Add User',
                type: 'basic',
                link: '/users/add-user',
            },
        ],
    },
];
