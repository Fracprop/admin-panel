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
import { NewsListComponent } from './news-list/news-list.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

const newsRoutes: Route[] = [
    {
        path: 'list',
        component: NewsListComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'add-news',
        component: AddNewsComponent,
    },
    {
        // canActivate: [AdminGuard],
        path: 'edit-news/:id',
        component: EditNewsComponent,
    },
];

@NgModule({
    declarations: [NewsListComponent, AddNewsComponent, EditNewsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(newsRoutes),
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
        MatSelectModule,
        RichTextEditorModule,
        MatChipsModule,
        
    ],
})
export class NewsModule {}
