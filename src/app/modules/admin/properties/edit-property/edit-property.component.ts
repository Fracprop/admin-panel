import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { CommonService } from '../../common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ConditionalExpr } from '@angular/compiler';

@Component({
    selector: 'app-edit-property',
    templateUrl: './edit-property.component.html',
    styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit {
    public selectedIndex = 0;
    public loading = false;
    public id=''
    public data=false;
    public formData:any
  public formStatus='invalid';
    constructor(
        private _propertiesService: PropertiesService,
        private _commonService: CommonService,
        private __activatedRoute:ActivatedRoute
    ) {
        this.__activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
          });
          this.fetchContent();
    }

    ngOnInit(): void {
       
    }
    invalidForm(e){
        console.log(e)
        this.formStatus=e;
    
      }

    tabChange(e: any) {
        console.log(e)
        this.selectedIndex = e.index;
     //   localStorage.setItem('tabStatus', this.selectedIndex.toString());
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
        this._propertiesService.getDetails(this.id).subscribe(
            (response) => {
                console.log(response);
                this.data=true;
                localStorage.setItem('propertyData',JSON.stringify(response))
              
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
