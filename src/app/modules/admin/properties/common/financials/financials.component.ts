import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesService } from '../../properties.service';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-financials',
    templateUrl: './financials.component.html',
    styleUrls: ['./financials.component.scss'],
})
export class FinancialsComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();
    form: FormGroup;
    public loading = false;
    public fileType = '';
    public floorplanImages = [];
    constructor(
        private _propertyService: PropertiesService,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder
    ) {}
    previousTab() {
        this.tabChange.emit({index:1,formDetails:{}});
        window.scroll(0, 0);
      }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            projectedReturns: [null, [Validators.required]],
            potentialRentalincome: [null, [Validators.required]],
            estimatedExpenses: [null, [Validators.required]],
            estimatedReserveFund: [null, [Validators.required]],
            TaxesandOtherfees: [null, [Validators.required]],
            // floorplanImages: [null, [Validators.required]],

            openingDate: [null, [Validators.required]],
            closingDate: [null, [Validators.required]],
        });
    }
    onFileChange(event: any) {
        let files = event.target.files
            ? Object.values(event.target.files)
            : event.dataTransfer.files;

        let x = [...files];

        if (!files?.length) return;

        Array.from(x).forEach((y, i) => {
            this.saveFiles(files[i]);
        });
    }
    /**
     * Save Uploaded Files
     */
    async saveFiles(event: any) {
        let files = event;
        if (this._commonService.checkFileSizeAndType(files, 2)) {
            //   let imagePath: any = await this._commonService.getBase64(files);
            this.fileType = files.type;
            let formData = new FormData();
            formData.append('file', files);
            console.log(formData);
            this._propertyService.upload(formData).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.floorplanImages.push({
                        image: response?.Location,
                        type: this.fileType,
                    });
                },
                error: (error) => {},
            });
        } else {
            this._commonService.error(
                'Please upload image of file type png, jpg,pdf or jpeg and with size less than 5MB !'
            );
        }
    }
    removeUploadedFile(key: any) {
        this.floorplanImages.splice(key, 1);
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(res[key] ? res[key] : '');
        });
    }
    add(){
        
    }
}
