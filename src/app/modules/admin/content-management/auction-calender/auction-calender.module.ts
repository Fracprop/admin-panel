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
import { AuctionCalenderListComponent } from './auction-calender-list/auction-calender-list.component';
import { AddAuctionCalenderComponent } from './add-auction-calender/add-auction-calender.component';
import { EditAuctionCalenderComponent } from './edit-auction-calender/edit-auction-calender.component';

const auctionRoutes: Route[] = [
  {
      path: 'list',
      component: AuctionCalenderListComponent,
  },
  {
      // canActivate: [AdminGuard],
      path: 'add-auction-content',
      component: AddAuctionCalenderComponent,
  },
  {
      // canActivate: [AdminGuard],
      path: 'add-auctiion-content/:id',
      component: EditAuctionCalenderComponent,
  },
];

@NgModule({
  declarations: [
    AuctionCalenderListComponent,
    AddAuctionCalenderComponent,
    EditAuctionCalenderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auctionRoutes),
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
export class AuctionCalenderModule { }