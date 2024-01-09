import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import {
    MatDatepickerModule,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
    DefaultMatCalendarRangeStrategy,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddDividendContentComponent } from './add-dividend-content/add-dividend-content.component';
import { EditDividendContentComponent } from './edit-dividend-content/edit-dividend-content.component';
import { DividendContentListComponent } from './dividend-content-list/dividend-content-list.component';

const dividendRoutes: Route[] = [
    {
        path: 'list',
        component: DividendContentListComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-dividend-content',
        component: AddDividendContentComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'edit-dividend-content/:id',
        component: EditDividendContentComponent,
    },
];
@NgModule({
    declarations: [
        AddDividendContentComponent,
        EditDividendContentComponent,
        DividendContentListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dividendRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: DefaultMatCalendarRangeStrategy,
        },
    ],
})
export class DividendCalenderModule {}
