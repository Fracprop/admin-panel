import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesService } from '../../properties.service';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();
    @Output() propertyDetails = new EventEmitter();
    @Output() invalidForm = new EventEmitter();
    @Input() formStatus = 'invalid';
    public isSubmitted = false;
    public fileType = '';
    public property_image = [];
    public property_type = '';
    public communityList$ = [];
    public countries$ = [];
    public cities$ = [];
    public provines$ = [];
    form: FormGroup;
    public loading = false;
    constructor(
        private _propertyService: PropertiesService,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder
    ) {
        this.getCommunities();
        this.getCountries();
    }
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            groupcriteriaId: [null, [Validators.required]],
            propertyCost: [null, [Validators.required]],
            property_name: [null, [Validators.required]],
            property_type: [null, [Validators.required]],
            property_image: [null, []],
            property_description: [null, [Validators.required]],
            unitNumberandComplex: [null, [Validators.required]],
            streatNumberandName: [null, [Validators.required]],
            country: [null, [Validators.required]],
            suburborDistrict: [null, []],
            cityorTown: [null, []],
            postalCode: [null, []],
        });
        let savedInfo = this.isEditForm
            ? localStorage.getItem('propertyData')
            : localStorage.getItem('propertyDetails');

        savedInfo ? this.patchValuestOfForm(JSON.parse(savedInfo)) : '';
    }
    ngOnChanges(changes: SimpleChanges) {
        const { SelectedTab } = changes;
        if (changes?.SelectedTab?.currentValue === 1) {
            this.add();
        }
        // Extract changes to the input property by its name
        //   console.log(changes);
        // Whenever the data in the parent changes, this method gets triggered
        // You can act on the changes here. You will have both the previous
        // value and the  current value here.
    }
    selectedPropertyType(e: any) {}
    getCountries() {
        this._propertyService.getCountries({}).subscribe(
            (response) => {
                this.countries$ = [...response];
            },
            (err) => {}
        );
    }
    getProvinces() {
        this.form.value.suburborDistrict
            ? this.form.controls['suburborDistrict'].setValue(null)
            : '';
        this.form.value.cityorTown
            ? this.form.controls['cityorTown'].setValue(null)
            : '';
        this.form.value.postalCode
            ? this.form.controls['postalCode'].setValue(null)
            : '';

        if (
            this.form.value.country === 'bc6e6753-9839-4d68-adbc-b36d3c2e3bb5'
        ) {
            this.getCities();
            return;
        } else {
            this.getCities();
        }
        this._propertyService.getProvines(this.form.value.country).subscribe(
            (response) => {
                this.provines$ = [...response];
            },
            (err) => {}
        );
    }
    getCities() {
        this._propertyService
            .getCities(
                this.form.value.country,
                this.form.value.suburborDistrict
            )
            .subscribe(
                (response) => {
                    this.cities$ = [...response];
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

            this._propertyService.upload(formData).subscribe({
                next: (response: any) => {
                    this.property_image.push(response?.Location);
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
        this.property_image.splice(key, 1);
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            if (key === 'property_image') {
                this.property_image = res[key].split(',');

                return;
            } else if (key === 'country') {
                this.form['controls'][key].setValue(res[key] ? res[key] : '');
                this.getProvinces();
            } else {
                this.form['controls'][key].setValue(res[key] ? res[key] : '');
            }
        });
        this._propertyService.formData.step1Data = this.form.value;
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
    add() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            this.invalidForm.emit({ tab0: 'invalid' });
            return;
        } else {
            if (this.property_image.length < 10) {
                this.invalidForm.emit({ tab0: 'invalid', tab1: 'invalid' });
                this._commonService.error(
                    'Please add minimum 10 property images!'
                );
                return;
            }

            let data = {
                ...this.form.value,

                property_image: this.property_image.toString(),
            };
            this._propertyService.formData.step1Data = data;
            localStorage.setItem('propertyDetails', JSON.stringify(data));
            this.tabChange.emit({
                index: 1,
                formDetails: 'valid',
            });
            this.invalidForm.emit({ tab0: 'valid' });
            window.scroll(0, 0);
        }
    }
}
