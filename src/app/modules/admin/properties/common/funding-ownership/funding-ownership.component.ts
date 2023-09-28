import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-funding-ownership',
    templateUrl: './funding-ownership.component.html',
    styleUrls: ['./funding-ownership.component.scss'],
})
export class FundingOwnershipComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();
    form: FormGroup;
    public loading = false;
    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: [null],
        });
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(res[key] ? res[key] : '');
        });
    }
}
