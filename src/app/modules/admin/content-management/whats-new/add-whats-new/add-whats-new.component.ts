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
import { WhatsNewService } from '../whats-new.service';

@Component({
    selector: 'app-add-whats-new',
    templateUrl: './add-whats-new.component.html',
    styleUrls: ['./add-whats-new.component.scss'],
})
export class AddWhatsNewComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public communityList$: any;
    

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _whatsNewService: WhatsNewService,
      
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            heading: [null, [Validators.required]],
            description: [null, [Validators.required]],
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
        if (this.form.invalid) {
            return;
        }
        this._whatsNewService.addWhatsNewContent(this.form.value).subscribe(
            (response) => {
                this._router.navigate(['/whats-new/list']);
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    
}
