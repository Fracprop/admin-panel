import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import {
    FuseNavigationItem,
    FuseNavigationService,
} from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';

@Injectable({
    providedIn: 'root',
})
export class SearchMockApi {
    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _fuseNavigationService: FuseNavigationService
    ) {
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
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/common/search')
            .reply(({ request }) => {
                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if (query === '') {
                    return [200, { results: [] }];
                }

                // Prepare the results array
                const results = [];

                // Return the response
                return [200, results];
            });
    }
}
