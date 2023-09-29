import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    previousTab() {
        this.tabChange.emit(0);
        window.scroll(0, 0);
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            fundingTarget: [null, [Validators.required]],
            internalRateofReturn: [null, [Validators.required]],
            estimatedNetRental: [null, [Validators.required]],
            marketValuation: [null, [Validators.required]],
            percentageOwnewshipshare: [null, [Validators.required]],
            totalnumberShareavailable: [null, [Validators.required]],
            minimumInvestmentAmount: [null, [Validators.required]],
        });
        let savedInfo = this.isEditForm
            ? localStorage.getItem('propertyData')
            : localStorage.getItem('fundingDetails');

        savedInfo ? this.patchValuestOfForm(JSON.parse(savedInfo)) : '';
    }

    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            this.form['controls'][key].setValue(
                res[key] ? res[key].toString() : ''
            );
        });
    }
    add() {
        if (this.form.invalid) {
            return;
        } else {
            this.patchValuestOfForm(this.form.value);
            localStorage.setItem(
                'fundingDetails',
                JSON.stringify(this.form.value)
            );
            this.tabChange.emit({
                index: 2,
                formDetails: { ...this.form.value },
            });
            window.scroll(0, 0);
        }
    }
}
