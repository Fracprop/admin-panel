import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesService } from '../../properties.service';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
    selector: 'app-financials',
    templateUrl: './financials.component.html',
    styleUrls: ['./financials.component.scss'],
})
export class FinancialsComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() formStatus :any;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();

    form: FormGroup;
    public loading = false;
    public fileType = '';
    public floorplanImages = [];
    public id=null;
    constructor(
        private _propertyService: PropertiesService,
        private _commonService: CommonService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute:ActivatedRoute
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
          });
          this._propertyService._form.subscribe(
            (response) => {
                console.log(response, 'observer');
            },
            (err) => {}
        );
    }
    previousTab() {
        this.tabChange.emit({ index: 1, formDetails: {} });
        window.scroll(0, 0);
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            projectedReturns: [null, [Validators.required]],
            potentialRentalincome: [null, [Validators.required]],
            estimatedExpenses: [null, [Validators.required]],
            estimatedReserveFund: [null, [Validators.required]],
            TaxesandOtherfees: [null, [Validators.required]],
            floorplanImages: [null, []],

            openingDate: [null, [Validators.required]],
            closingDate: [null, [Validators.required]],
        });
        let savedInfo = this.isEditForm
            ? localStorage.getItem('propertyData')
            : localStorage.getItem('financialDetails');

        savedInfo && this.isEditForm
            ? this.patchValuestOfForm(JSON.parse(savedInfo), 'edit')
            : this.patchValuestOfForm(JSON.parse(savedInfo), 'fetch');
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
                    this.floorplanImages.push({
                        image: response?.Location,
                        type: response?.fileType,
                    });
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
        this.floorplanImages.splice(key, 1);
    }
    patchValuestOfForm(res: any, type: string) {
        Object.keys(this.form['controls']).forEach((key) => {
            if (key === 'floorplanImages ' && type === 'fetch') {
                this.floorplanImages = res[key].split(',');

                return;
            } else if (key === 'openingDate') {
                this.form['controls'][key].setValue(
                    moment(res[key]).format('YYYY-MM-DD')
                );

                return;
            } else if (key === 'closingDate') {
                this.form['controls'][key].setValue(
                    moment(res[key]).format('YYYY-MM-DD')
                );

                return;
            } else {
                this.form['controls'][key].setValue(
                    res[key] ? res[key].toString() : ''
                );
            }
        });
        if (type === 'edit') {
            let floorplanImages = res.floorplanImages.split(',');
            let floorplanImages_type = res.floorplanImages_type.split(',');
            console.log(floorplanImages, floorplanImages_type);

            for (
                let i = 0;
                i <
                Math.min(floorplanImages.length, floorplanImages_type.length);
                i++
            ) {
                this.floorplanImages.push({
                    image: floorplanImages[i],
                    type: floorplanImages_type[i],
                });
            }
        }
    }
    
    add() {
        if (this.form.invalid) {
            return;
        } else {
            if (!this.floorplanImages.length) {
                this._commonService.error('Please add floor plan images!');
                return;
            }
            if (
                Date.parse(this.form.value.closingDate) <=
                Date.parse(this.form.value.openingDate)
            ) {
                this._commonService.error(
                    'Closing Date should be greater than opening date'
                );
                return;
            }
            if(this.formStatus?.tab0==='invalid' || this.formStatus?.tab1==='invalid'){
                this._commonService.error(
                    'Some details are not field, kindly fill the details'
                );
                return;

            }
            

            let propertyDetails = localStorage.getItem('propertyDetails');
            let fundingDetails = localStorage.getItem('fundingDetails');

            this.patchValuestOfForm(this.form.value, 'add');
            let floorImages = this.floorplanImages.map((a) => {
                return a.image;
            });
            let floorImagesType = this.floorplanImages.map((a) => {
                return a.type;
            });
            console.log(floorImages, floorImagesType);

            let data = {
                ...this.form.value,
                floorplanImages: floorImages.toString(),
                ...JSON.parse(propertyDetails),
                ...JSON.parse(fundingDetails),
                floorplanImages_type: floorImagesType.toString(),
            };
            console.log(data);

            localStorage.setItem(
                'financialDetails',
                JSON.stringify(this.form.value)
            );
            if(this.isEditForm){
                this._propertyService.editProperty(data,this.id).subscribe(
                    (response) => {
                        this.loading = false;
                        this._router.navigate(['/properties/list']);
                        localStorage.removeItem('propertyDetails');
                        localStorage.removeItem('fundingDetails');
                        localStorage.removeItem('financialDetails');
                    },
                    (err) => {
                        this.loading = false;
                        this._commonService.error(err.error.message);
                        // this.isLoading = false;
                    }
                );

            }else{
                this._propertyService.addProperty(data).subscribe(
                    (response) => {
                        this.loading = false;
                        this._router.navigate(['/properties/list']);
                        localStorage.removeItem('propertyDetails');
                        localStorage.removeItem('fundingDetails');
                        localStorage.removeItem('financialDetails');
                    },
                    (err) => {
                        this.loading = false;
                        this._commonService.error(err.error.message);
                        // this.isLoading = false;
                    }
                );
            }
           
        }
    }
}
