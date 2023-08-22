/*eslint-disable*/
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonService } from '../common.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-mapped-facilities',
    templateUrl: './mapped-facilities.component.html',
    styleUrls: ['./mapped-facilities.component.scss'],
})
export class MappedFacilitiesComponent implements OnInit {
    facilities = [];
    loading = false;
    public clickHistory: any = [];

    /**
     * Constructor
     */
    constructor(
        private _commonService: CommonService,
        public matDialogRef: MatDialogRef<MappedFacilitiesComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.clickHistory.push({
            ...this.data.type,
        });
        this.fetchFacilities();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save and close
     */
    close(): void {
        // Close the dialog
        this.matDialogRef.close(false);
    }

    /**
     *Fetch All facilies
     */

    fetchFacilities() {
        this.loading = true;
        this._commonService
            .getFacilities({
                Parent_Id: this.data.type?.Facility_id,
                Skip_Records: 0,
                Limit_Records: 1000,
            })
            .subscribe(
                (response) => {
                    this.loading = false;
                    this.facilities = [...response?.results];

                    this._changeDetectorRef.detectChanges();
                },
                (err) => {
                    this.loading = false;
                }
            );
    }

    /**
     *View Child Facilities
     */

    viewMappedFacilities(data) {
        this.data.type = { ...data };
        this.clickHistory.push({
            ...data,
        });
        this.fetchFacilities();
    }

    /**
     * Fetching previously selected facility/parent
     */

    backTrackFacility() {
        this.clickHistory.pop();
        this.data.type = { ...this.clickHistory[this.clickHistory.length - 1] };
        this.fetchFacilities();
    }
}
