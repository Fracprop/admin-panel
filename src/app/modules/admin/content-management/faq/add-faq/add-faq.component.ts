import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  form: FormGroup;
  confirmationDialog: FormGroup;
  public loading = false;
  public communityList$: any;

  constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _commonService: CommonService,
      private _faqService: FaqService
  ) {}


  ngOnInit(): void {
     /**
         * FORM INITILIZATION
         */
     this.form = this._formBuilder.group({
      title:[null, [Validators.required]],
      description: [null, [Validators.required]],
     
  });
  }
  addFaq() {
    this.loading=true;
      if (this.form.invalid) {
        this.loading=false;
          return;
      }
      this._faqService.addFaq(this.form.value).subscribe(
          (response) => {
            this.loading=false;
              this._router.navigate(['/FAQ/list']);
          },
          (err) => {
            this.loading=false;
            this._commonService.error(err.error.message);
              // this.isLoading = false;
          }
      );
  }

}
