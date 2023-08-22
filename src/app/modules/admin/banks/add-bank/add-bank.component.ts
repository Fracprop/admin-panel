import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  form: FormGroup;
  public loading = false;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
      /**
         * FORM INITILIZATION
         */
      this.form = this._formBuilder.group({
        name: [null],
        country:[null]
      
    });
  }

}
