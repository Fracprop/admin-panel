import { NgModule } from '@angular/core';
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
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { AdminGuard } from '../../../core/auth/guards/admin.guard';
import { UserManagementService } from './user-management.service';
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
import { DetailsComponent } from './details/details.component';

const facilityRoutes: Route[] = [
    {
        path: 'list',
        component: UsersComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-user',
        component: AddUserComponent,
    },
    {
        canActivate: [AdminGuard],
        path: 'edit-user/:id',
        component: EditUserComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'details',
        component: DetailsComponent,
    },
   
  
];

@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent,
        EditUserComponent,
        DetailsComponent,
       
      
    ],
    imports: [
        RouterModule.forChild(facilityRoutes),
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
    providers: [
        UserManagementService,
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: DefaultMatCalendarRangeStrategy,
        },
    ],
})
export class UserManagementModule {}
