import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-add-country',
    templateUrl: './add-country.component.html',
    styleUrls: ['./add-country.component.scss'],
})
export class AddCountryComponent implements OnInit {
    form: FormGroup;
    public loading = false;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            name: [null],
            currency: [null],
            currencySymbol: [null],
            termsAndConditions: [null],
            inflationRate: [null],
            taxation: [null],
        });
    }
}
