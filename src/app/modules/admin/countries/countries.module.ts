import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCountryComponent } from './add-country/add-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
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

import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { CountriesComponent } from './countries/countries.component';

const banksRoutes: Route[] = [
    {
        path: 'list',
        component: CountriesComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-country',
        component: AddCountryComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'edit-country/:id',
        component: EditCountryComponent,
    },
];

@NgModule({
    declarations: [
        AddCountryComponent,
        EditCountryComponent,
        CountriesComponent,
    ],
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
        MatNativeDateModule,
        MatProgressSpinnerModule,
        TranslocoModule,
    ],
})
export class CountriesModule {}
