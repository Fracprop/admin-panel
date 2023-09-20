import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { WhatsNewService } from '../whats-new.service';

@Component({
    selector: 'app-edit-whats-new',
    templateUrl: './edit-whats-new.component.html',
    styleUrls: ['./edit-whats-new.component.scss'],
})
export class EditWhatsNewComponent implements OnInit {
    form: FormGroup;
    public loading = false;
    public contentId = '';
    public communityList$: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _commonService: CommonService,
        private _whatsNewService: WhatsNewService
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params) => {
            this.contentId = params['id'];
        });
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            heading: [null, [Validators.required]],
            description: [null, [Validators.required]],
            GroupCriteriaId: [null, [Validators.required]],
        });
        this.fetchContent();
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
    fetchContent() {
        this._whatsNewService.getDetails(this.contentId).subscribe(
            (response) => {
                console.log(response);
                this.patchValuestOfForm(response)
                this.getCommunities();
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    editContent() {
        if (this.form.invalid) {
            return;
        }
        this._whatsNewService.editWhatsNewContent(this.form.value,this.contentId).subscribe(
            (response) => {
                this._router.navigate(['/whats-new/list']);
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(res[key] ? res[key] : '');
        });
    }
}
