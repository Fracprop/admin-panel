import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { CommonService } from '../../common/common.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {
    public selectedIndex = 0;
    public loading = false;
    public formData: any;
    public formStatus = 'invalid';
    public step1Form = true;
    @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

    constructor(
        private _propertiesService: PropertiesService,
        private _commonService: CommonService
    ) {}

    ngOnInit(): void {}

    invalidForm(e) {
        console.log(e);
        this.formStatus = e;
    }
    activeTabChange(e: any) {
        console.log(this._propertiesService.formData[`step${e.index + 1}Data`]);
        let currentTab =
            this._propertiesService.formData[`step${e.index + 1}Data`];
        if (!Object.keys(currentTab).length) {
            this.step1Form = false;
            console.log(e.index, this.selectedIndex, '---');
            if (e.index === 1) {
                this.selectedIndex -=1;
                console.log(this.selectedIndex);
            }
            if (e.index === 2) {
              this.selectedIndex -=1;
              console.log(this.selectedIndex);
          }else{
            this.selectedIndex = e.index;

          }

            // this.selectedIndex=e-1;
        }
    }
    tabChange(e: any) {
        this.formStatus = e?.formDetails || 'invalid';
        //  if(e.formDetails==='valid' ){
        //   console.log(e.formDetails,'----')
        //   this.selectedIndex = e.index;

        //  }else{

        //  }
        this.selectedIndex = e.index;
        localStorage.setItem('tabStatus', this.selectedIndex.toString());
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
