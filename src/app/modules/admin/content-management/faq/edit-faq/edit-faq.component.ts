import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {

  form: FormGroup;
  public loading = false;
  public faqId = '';
  public communityList$: any;

  constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _commonService: CommonService,
      private _faqService: FaqService
  ) {}

  ngOnInit(): void {
      this._activatedRoute.params.subscribe((params) => {
          this.faqId = params['id'];
      });
      /**
       * FORM INITILIZATION
       */
      this.form = this._formBuilder.group({
          title: [null, [Validators.required]],
          description: [null, [Validators.required]],
         
      });
      this.fetchContent();
     
  }
 
  fetchContent() {
      this._faqService.getDetails(this.faqId).subscribe(
          (response) => {
              this.patchValuestOfForm(response);
          },
          (err) => {
            this._commonService.error(err.error.message);
              // this.isLoading = false;
          }
      );
  }
  editFaq() {
    this.loading=true;
    console.log(this.form)
      if (this.form.invalid) {
        this.loading=false;
          return;
      }
      this._faqService.editFaq(this.form.value, this.faqId)
          .subscribe(
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
  patchValuestOfForm(res: any) {
      Object.keys(this.form['controls']).forEach((key) => {
          this.form['controls'][key].setValue(res[key] ? res[key] : '');
      });
  }

}
