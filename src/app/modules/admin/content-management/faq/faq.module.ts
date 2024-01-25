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
import { SharedModule } from 'app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { FaqListComponent } from './faq-list/faq-list.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';

const faqRoutes: Route[] = [
  {
      path: 'list',
      component: FaqListComponent,
  },
  {
      // canActivate: [AdminGuard],
      path: 'add-faq',
      component: AddFaqComponent,
  },
  {
     // canActivate: [AdminGuard],
      path: 'edit-faq/:id',
      component: EditFaqComponent,
  },
]
@NgModule({
  declarations: [
    FaqListComponent,
    AddFaqComponent,
    EditFaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(faqRoutes),
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
    MatSelectModule
  ]
})
export class FaqModule { }
