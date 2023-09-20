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
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { AdminGuard } from 'app/core/auth/guards/admin.guard';
import { MatDividerModule } from '@angular/material/divider';
import { WhatsNewListingComponent } from './whats-new-listing/whats-new-listing.component';
import { AddWhatsNewComponent } from './add-whats-new/add-whats-new.component';
import { EditWhatsNewComponent } from './edit-whats-new/edit-whats-new.component';

const whatsNewRoutes: Route[] = [
    {
        path: 'list',
        component: WhatsNewListingComponent,
    },
    {
         
        path: 'add-content',
        component: AddWhatsNewComponent,
    },
    {
         
        path: 'edit-content/:id',
        component: EditWhatsNewComponent,
    },
];

@NgModule({
    declarations: [
        WhatsNewListingComponent,
        AddWhatsNewComponent,
        EditWhatsNewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(whatsNewRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatSortModule,
        MatDividerModule,
        MatSelectModule
    ],
})
export class WhatsNewModule {}
