/*eslint-disable*/
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../common.service';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';

export interface DialogData {
    type: any;
}

@Component({
    selector: 'app-add-value-to-dropdown',
    templateUrl: './add-value-to-dropdown.component.html',
    styleUrls: ['./add-value-to-dropdown.component.scss'],
})
export class AddValueToDropdownComponent implements OnInit {
    composeForm: FormGroup;
    loading = false;
    userDetails = JSON.parse(localStorage.getItem('user')) || '';
    comments = [];
    dialogHeader: string = '';
    availableLangs: AvailableLangs;
    /**
     * Constructor
     */
    constructor(
        private _commonService: CommonService,
        public matDialogRef: MatDialogRef<AddValueToDropdownComponent>,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.setDialogHead();
        // Create the form
        this.composeForm = this._formBuilder.group({
            name: ['', [Validators.required]],
        });
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
     * Save file
     */

    sendComment() {
        if (this.loading) return false;
        if (this.composeForm.value.name.trim()) {
            this.loading = true;
            switch (this.data?.type) {
                case 'toxicity': {
                    this._commonService
                        .addNewTypeOfToxicity({
                            ...this.composeForm.value,
                        })
                        .subscribe(
                            (res) => {
                                this.matDialogRef.close('toxicity');
                            },
                            (err) => {
                                this.loading = false;
                            }
                        );
                    break;
                }
                case 'grade': {
                    this._commonService
                        .addNewGradeOfToxicity({
                            ...this.composeForm.value,
                        })
                        .subscribe(
                            (res) => {
                                this.matDialogRef.close('grade');
                            },
                            (err) => {
                                this.loading = false;
                            }
                        );
                    break;
                }
                case 'coinfection': {
                    this._commonService
                        .addNewCoinfection({
                            ...this.composeForm.value,
                        })
                        .subscribe(
                            (res) => {
                                this.matDialogRef.close('coinfection');
                            },
                            (err) => {
                                this.loading = false;
                            }
                        );
                    break;
                }
                case 'concomitant': {
                    this._commonService
                        .addNewConcomitantDrug({
                            ...this.composeForm.value,
                        })
                        .subscribe(
                            (res) => {
                                this.matDialogRef.close('concomitant');
                            },
                            (err) => {
                                this.loading = false;
                            }
                        );
                    break;
                }
            }
        }
    }

    /**
     * Setting dialog head, upon type passed from parent
     */
    setDialogHead() {
        switch (this.data?.type) {
            case 'toxicity': {
                this.dialogHeader = this._translocoService.translate(
                    'add_new_toxicity_type'
                );
                break;
            }
            case 'grade': {
                this.dialogHeader =
                    this._translocoService.translate('add_new_grade');
                break;
            }
            case 'coinfection': {
                this.dialogHeader = this._translocoService.translate(
                    'add_new_co-infection'
                );
                break;
            }
            case 'concomitant': {
                this.dialogHeader =
                    this._translocoService.translate('add_new_codrug');
                break;
            }
            default: {
                this.dialogHeader = this._translocoService.translate('add');
                break;
            }
        }
    }
}
