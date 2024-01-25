import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { CommunityNotesService } from '../community-notes.service';

@Component({
    selector: 'app-add-community-notes',
    templateUrl: './add-community-notes.component.html',
    styleUrls: ['./add-community-notes.component.scss'],
})
export class AddCommunityNotesComponent implements OnInit {
    form: FormGroup;
    public loading = false;
    public communityList$: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _communityNotesService: CommunityNotesService
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            Notes: [null, [Validators.required]],
            GroupCriteriaId: [null, [Validators.required]],
        });
        this.getCommunities();
    }
    /**
     * Fetching  communities list
     */
    getCommunities() {
        this._commonService.getCommunityList({ searcString: 'test' }).subscribe(
            (response) => {
                this.communityList$ = response ? [...response] : [];
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    addContent() {
        this.loading = true;
        if (this.form.invalid) {
          this.loading=false;
            return;
        }
        this._communityNotesService
            .addCommunityNotes(this.form.value)
            .subscribe(
                (response) => {
                  this.loading=false;
                    this._router.navigate(['/community-notes/list']);
                },
                (err) => {
                    this.loading = false;
                    this._commonService.error(err.error.message);
                }
            );
    }
}
