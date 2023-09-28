import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { CommonService } from '../../common/common.service';

@Component({
    selector: 'app-edit-property',
    templateUrl: './edit-property.component.html',
    styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit {
    public selectedIndex = 0;
    public loading = false;
    constructor(
        private _propertiesService: PropertiesService,
        private _commonService: CommonService
    ) {}

    ngOnInit(): void {}

    tabChange(e: any) {
        this.selectedIndex = e;
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
    fetchContent() {
        this._propertiesService.getDetails('').subscribe(
            (response) => {
              
            },
            (err) => {
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
    editContent() {
        this.loading = true;
        this._propertiesService.editProperty({}, '').subscribe(
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
