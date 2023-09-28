import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PropertyComponent } from './common/property/property.component';
import { FundingOwnershipComponent } from './common/funding-ownership/funding-ownership.component';
import { FinancialsComponent } from './common/financials/financials.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const propertiesRoutes: Route[] = [
    {
        path: 'list',
        component: PropertiesComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-property',
        component: AddPropertyComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'edit-property',
        component: EditPropertyComponent,
    },
];

@NgModule({
    declarations: [
        PropertiesComponent,
        AddPropertyComponent,
        EditPropertyComponent,
        PropertyComponent,
        FundingOwnershipComponent,
        FinancialsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(propertiesRoutes),
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
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
})
export class PropertiesModule {}
