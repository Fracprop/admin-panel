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
import { CommunityNotesListComponent } from './community-notes-list/community-notes-list.component';
import { AddCommunityNotesComponent } from './add-community-notes/add-community-notes.component';
import { EditCommunityNotesComponent } from './edit-community-notes/edit-community-notes.component';

const communityNotesRoutes: Route[] = [
  {
      path: 'list',
      component: CommunityNotesListComponent,
  },
  {
      // canActivate: [AdminGuard],
      path: 'add-content',
      component: AddCommunityNotesComponent,
  },
  {
     // canActivate: [AdminGuard],
      path: 'edit-content/:id',
      component: EditCommunityNotesComponent,
  },
  
 

];

@NgModule({
  declarations: [
    CommunityNotesListComponent,
    AddCommunityNotesComponent,
    EditCommunityNotesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(communityNotesRoutes),
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
export class CommunityNotesModule { }
