import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  public selectedIndex=0;
  public loading=false;
  public formData:any
  

  constructor(private _propertiesService:PropertiesService, private _commonService:CommonService) { }

  ngOnInit(): void {
  }

  tabChange(e: any) {
   console.log(e);
    this.selectedIndex = e.index;
  
    
    this.formData={...e.formDetails};
    console.log(this.formData)
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
    this.loading=true;
   
      this._propertiesService.addProperty({}).subscribe(
          (response) => {
            this.loading=false;
              //this._router.navigate(['/whats-new/list']);
          },
          (err) => {
            this.loading=false;
            this._commonService.error(err.error.message);
              // this.isLoading = false;
          }
      );
  }
  
}
