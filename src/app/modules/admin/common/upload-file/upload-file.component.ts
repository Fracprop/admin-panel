/*eslint-disable*/
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { CommonService } from '../common.service';

export interface DialogData {
    type:
        | 'All Clinical Records'
        | 'Address proofs with photo'
        | 'All relevant material docs'
        | 'Toxicity documentations'
        | 'All Lab reports';
}
@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
    composeForm: FormGroup;
    dragAreaClass: string;
    returnObj = {
        upload_file_path: '',
        document_type: '',
        filename: '',
    };
    loading = false;

    /**
     * Constructor
     */
    constructor(
        private _commonService: CommonService,
        public matDialogRef: MatDialogRef<UploadFileComponent>,
        private _formBuilder: FormBuilder,
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
        this.dragAreaClass = 'dragarea';
        // Create the form
        this.composeForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            fileType: ['CD4', Validators.required],
        });
    }

    @HostListener('dragover', ['$event']) onDragOver(event: any) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }
    @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }
    @HostListener('dragend', ['$event']) onDragEnd(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }

    @HostListener('drop', ['$event']) onDrop(event: any) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            let files = event.dataTransfer.files[0];
            this.saveFiles(files);
        }
    }

    onFileChange(event: any) {
        let files = event.target.files[0];
        if (this._commonService.checkFileSizeAndType(files))
            this.saveFiles(files);
        else
            this._commonService.throwErr(
                this._translocoService.translate('file_size_validation')
            );
    }

    /**
     * Save Uploaded Files
     */

    saveFiles(files: FileList) {
        let f = files;
        this.loading = true;
        this._commonService.uploadFile(files).subscribe((res) => {
            this.loading = false;
            if (res.length) this.returnObj['upload_file_path'] = res[0]['name'];
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

    send(): void {
        if (!this.composeForm.valid) return;
        if (!this.returnObj.upload_file_path) {
            return;
        }

        this.returnObj['filename'] = this.composeForm.value.name;
        if (this.data?.type === 'All Lab reports') {
            this.returnObj['document_type'] = this.getHeaderText();
        } else this.returnObj['document_type'] = this.getHeaderText();

        this.matDialogRef.close(this.returnObj);
    }

    /**
     * Get Text For Dialog Header
     */

    getHeaderText() {
        switch (this.data?.type) {
            case 'All Clinical Records':
                return 'All Clinical Records';
                break;
            case 'Address proofs with photo':
                return 'Address proofs with photo';
                break;
            case 'All relevant material docs':
                return 'All relevant material docs';
                break;
            case 'Toxicity documentations':
                return 'Toxicity documentations';
                break;
            case 'All Lab reports':
                return 'All Lab reports';
                break;
        }
    }

    /**
     * Remove Uploaded Files
     */

    removeUploadedFile() {
        this.returnObj.upload_file_path = '';
        this.returnObj.document_type = '';
    }
}
