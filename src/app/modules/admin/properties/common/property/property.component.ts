import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesService } from '../../properties.service';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();
    public fileType = '';
    public propertyImages = [];
    public communityList$ = [];
    form: FormGroup;
    public loading = false;
    constructor(
        private _propertyService: PropertiesService,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder
    ) {
        this.getCommunities();
    }

    ngOnInit(): void {
        this.getCountries();
        this.form = this._formBuilder.group({
            name: [null],
        });
    }
    getCountries() {
        this._propertyService.getCountries({}).subscribe(
            (response) => {
                if (!response) {
                } else {
                }
            },
            (err) => {}
        );
    }
    getProvinces() {
        this._propertyService.getCountries({}).subscribe(
            (response) => {
                if (!response) {
                } else {
                }
            },
            (err) => {}
        );
    }
    getCities() {
        this._propertyService.getCountries({}).subscribe(
            (response) => {
                if (!response) {
                } else {
                }
            },
            (err) => {}
        );
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
        if (this._commonService.checkFileSizeAndType(files, 1)) {
            //   let imagePath: any = await this._commonService.getBase64(files);
            this.fileType = files.type;
            let formData = new FormData();
            formData.append('file', files);
            console.log(formData);
            this._propertyService.upload(formData).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.propertyImages.push(response?.Location);
                },
                error: (error) => {},
            });
        } else {
            this._commonService.error(
                'Please upload image of file type png, jpg or jpeg and with size less than 5MB !'
            );
        }
    }
    removeUploadedFile(key: any) {
        this.propertyImages.splice(key, 1);
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(res[key] ? res[key] : '');
        });
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
   
}
