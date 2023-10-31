import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from '../../properties.service';
import { CommonService } from 'app/modules/admin/common/common.service';

@Component({
    selector: 'app-funding-ownership',
    templateUrl: './funding-ownership.component.html',
    styleUrls: ['./funding-ownership.component.scss'],
})
export class FundingOwnershipComponent implements OnInit {
    @Input() SelectedTab = 0;
    @Input() isEditForm = false;
    @Output() tabChange = new EventEmitter();
    @Output() invalidForm = new EventEmitter();
    form: FormGroup;
    public loading = false;
    constructor(
        private _formBuilder: FormBuilder,
        private _propertyService: PropertiesService,
        private _commonService: CommonService
    ) {}
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
            pricePerShare: [null, [Validators.required]],
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
    ngOnChanges(changes: SimpleChanges) {
        if (changes.SelectedTab.currentValue === 2) {
            if (this.form.invalid) {
                this.add();
                // alert('form-invalid');
            } else {
                this.add();
            }
        }
    }
    add() {
        let savedInfo = localStorage.getItem('propertyData');

        if (this.form.invalid) {
            this.invalidForm.emit({ tab1: 'invalid' });
            return;
        } else if (
            this.form.value.minimumInvestmentAmount >
            Number(JSON.parse(savedInfo).propertyCost)
        ) {
            this._commonService.error(
                'Mininmum  invested amount cannot be greater than property cost'
            );
            return;
        } else {
            this.patchValuestOfForm(this.form.value);
            localStorage.setItem(
                'fundingDetails',
                JSON.stringify(this.form.value)
            );
            this.tabChange.emit({
                index: 2,
                formDetails: 'valid',
            });
            this.invalidForm.emit({ tab1: 'valid' });
            window.scroll(0, 0);
        }
    }
}
