import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CommonService } from './common.service';
import { AppRoleDirective } from './role.directive';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MappedFacilitiesComponent } from './mapped-facilities/mapped-facilities.component';

import { NgxPrintModule } from 'ngx-print';
import { AddValueToDropdownComponent } from './add-value-to-dropdown/add-value-to-dropdown.component';
import { SignalRService } from './signalR.service';
import { WebSocketService } from './web-socket.service';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
    declarations: [
        // UploadFileComponent,
        // AppRoleDirective,

        // MappedFacilitiesComponent,
        // ,
        // AddValueToDropdownComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
       
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatDividerModule,
      
        CommonModule,
        MatAutocompleteModule,
        MatTooltipModule,
        FuseConfirmationModule,
        MatProgressSpinnerModule,
        NgxMaterialTimepickerModule,
       

        TranslocoModule,
    ],
    providers: [CommonService, SignalRService, WebSocketService],
    exports: [],
})
export class AdminCommonModule {}
