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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BuySharePropertyListComponent } from './buy-share-property-list/buy-share-property-list.component';
import { BuyShareComponent } from './buy-share/buy-share.component';

const buyShareRoutes: Route[] = [
  {
      path: 'list',
      component: BuySharePropertyListComponent,
  },
  {
    path: 'add-share/:id',
    component: BuyShareComponent,
},
];




@NgModule({
  declarations: [
    BuySharePropertyListComponent,
    BuyShareComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(buyShareRoutes),
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
    MatExpansionModule,
    MatTooltipModule,
    SharedModule,
    MatDividerModule,
    MatRadioModule,
  ]
})
export class PropertyBuyShareModule { }
