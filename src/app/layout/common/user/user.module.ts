import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from 'app/layout/common/user/user.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [UserComponent],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        FuseConfirmationModule,
        RouterModule,
        TranslocoModule
    ],
    exports: [UserComponent],
})
export class UserModule {}
