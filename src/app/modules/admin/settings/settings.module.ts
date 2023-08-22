import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from 'app/modules/admin/settings/settings.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { SettingsService } from './settings.service';
import { TranslocoModule } from '@ngneat/transloco';
const settingsRoutes: Route[] = [
    {
        path: '',
        component: SettingsComponent,
    },
];

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsSecurityComponent,
    ],
    imports: [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SignaturePadModule,
        SharedModule,
        TranslocoModule
    ],
    providers: [SettingsService],
})
export class SettingsModule {}
