import { Component } from '@angular/core';
import { CommonService } from './modules/admin/common/common.service';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWBCf0x0TXxbf1x0ZFNMZFpbRHBPMyBoS35RdURhW3Zed3BWRmlbVkJ+')
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent {
    checkOfflineStatus = false;
   
    /**
     * Constructor
     */
    constructor(private _commonserive: CommonService) {
        this._commonserive.createOnline$().subscribe((isOnline) => {
            if (isOnline && this.checkOfflineStatus) {
                this._commonserive.getInternetStatus(true);
                this._commonserive.success('Internet Connected, Refresh Page!');
            } else if (!isOnline) {
                this._commonserive.getInternetStatus(false);
                this.checkOfflineStatus = true;
                this._commonserive.error('Internet Connection Lost!');
            }
        });
    }
}
