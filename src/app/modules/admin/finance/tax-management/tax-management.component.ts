import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tax-management',
  templateUrl: './tax-management.component.html',
  styleUrls: ['./tax-management.component.scss']
})
export class TaxManagementComponent implements OnInit {
  form: FormGroup;
  public isLoading = false;
  public openForm=false;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
      /**
         * FORM INITILIZATION
         */
      this.form = this._formBuilder.group({
        transctionFee: [null],
        listingFee:[null]
      
    });
  }

}
