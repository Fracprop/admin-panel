import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { MatTabGroup } from '@angular/material/tabs';
import { PropertiesService } from '../properties.service';

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {
    public selectedIndex = 0;
    public loading = false;
    public formData: any;
    public formStatus: any;
    public formStatus1: any;
    public step1Form = true;
    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

    constructor(
        private _propertiesService: PropertiesService,
        private _commonService: CommonService
    ) {}

    ngOnInit(): void {
     
    }

    formStatusChange(e: any) {
        let tab0 = e?.tab0 ? e?.tab0 : this.formStatus?.tab0;
        let tab1 = e?.tab1 ? e?.tab1 : this.formStatus?.tab1;

        //  this.formStatus=e?.index?this.formStatus:e;
        this.formStatus = { tab0: tab0, tab1: tab1 };
        console.log(this.formStatus);
    }
    tabChange(e: any) {
        //    this.formStatus = e?.formDetails || 'invalid';

        this.selectedIndex = e.index;
        // console.log(this.formStatus, this.selectedIndex);

        //  localStorage.setItem('tabStatus', this.selectedIndex.toString());
    }
    nextStep() {
        if (this.selectedIndex != 2) {
            this.selectedIndex = this.selectedIndex + 1;
        }
    }
    previousStep() {
        if (this.selectedIndex != 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
    }
    addContent() {
        this.loading = true;

        this._propertiesService.addProperty({}).subscribe(
            (response) => {
                this.loading = false;
                //this._router.navigate(['/whats-new/list']);
            },
            (err) => {
                this.loading = false;
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
}
