import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminManagementService } from './admin-management.service';
import { AdminGuard } from '../../../core/auth/guards/admin.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';

const adminRoutes: Route[] = [
    {
        canActivate: [AdminGuard],
        path: 'list',
        component: AdminsComponent,
    },
    {
        canActivate: [AdminGuard],
        path: 'add-admin',
        component: AddAdminComponent,
    },
    {
        canActivate: [AdminGuard],
        path: 'edit-admin/:id',
        component: EditAdminComponent,
    },
];

@NgModule({
    declarations: [AdminsComponent, AddAdminComponent, EditAdminComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatDividerModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        TranslocoModule,
    ],
    providers: [AdminManagementService],
})
export class AdminManagementModule {}
