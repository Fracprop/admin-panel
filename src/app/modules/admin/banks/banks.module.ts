import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks/banks.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { EditBankComponent } from './edit-bank/edit-bank.component';

import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
    MatDatepickerModule,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
    DefaultMatCalendarRangeStrategy,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';

const banksRoutes: Route[] = [
    {
        path: 'list',
        component: BanksComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-bank',
        component: AddBankComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'edit-bank/:id',
        component: EditBankComponent,
    },
];

@NgModule({
    declarations: [BanksComponent, AddBankComponent, EditBankComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(banksRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatTooltipModule,
        SharedModule,
        MatDividerModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        NgxMaterialTimepickerModule,
        MatButtonToggleModule,
        TranslocoModule,
    ],
})
export class BanksModule {}
