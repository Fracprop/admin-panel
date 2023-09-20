import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
    BehaviorSubject,
    fromEvent,
    merge,
    Observable,
    Observer,
    of,
} from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SELECTED_STATE } from './common.constants';

@Injectable({ providedIn: 'root' })
export class CommonService {
    errorDialog: FormGroup;
    successDialog: FormGroup;
    confirmationDialog: FormGroup;
    private _user: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {
        // set dialog configurations
        this.configureError();
        this.configureSuccess();
        this.confirmationpopup();
    }

    /**
     * Validation for white spaces
     * @param control
     * @returns
     */
    public noWhitespaceValidator(control: FormControl) {
        if (control.value != null) {
            const isWhitespace = (control.value || '').trim().length === 0;
            const isValid = !isWhitespace;
            return isValid ? null : { whitespace: true };
        }
    }

    /**
     * Configuring errors to be used to show errors
     */
    configureError() {
        this.errorDialog = this._formBuilder.group({
            title: 'Error!',
            message: '',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: false,
                    label: 'Yes',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: false,
                    label: 'No',
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * Configuring success to be ussed to throw success
     */
    configureSuccess() {
        this.successDialog = this._formBuilder.group({
            title: 'Success!',
            message: '',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:thumb-up',
                color: 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: false,
                    label: 'Yes',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: false,
                    label: 'No',
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * Configuring success to be ussed to throw success
     */
    confirmationpopup() {
        this.confirmationDialog = this._formBuilder.group({
            title: 'You are sure you want to delete !!',
            message: '',
            icon: this._formBuilder.group({
                show: true,
                name: 'mat_outline:delete',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: true,
        });
    }

    /**
     * Call to throw errors within components
     * @param message
     */
    throwErr(message) {
        this.errorDialog.controls.message.setValue(message);

        const errorRef = this._fuseConfirmationService.open(
            this.errorDialog.value
        );
    }

    /**
     * Call to throw success within components
     * @param message
     */
    throwSuccess(message) {
        this.successDialog.controls.message.setValue(message);
        const successRef = this._fuseConfirmationService.open(
            this.successDialog.value
        );
    }

    /**
     * Call to throw success within components
     * @param message
     */
    throwConfirmation(message) {
        this.confirmationDialog.controls.message.setValue(message);
        const confirmationRef = this._fuseConfirmationService.open(
            this.confirmationDialog.value
        );
    }

    // for internetConnection
    private checkOnline = new BehaviorSubject<any>(null);
    public onlineStatus = this.checkOnline.asObservable();
    getInternetStatus(status) {
        this.checkOnline.next(status);
    }
    createOnline$() {
        return merge<boolean>(
            fromEvent(window, 'offline').pipe(map(() => false)),
            fromEvent(window, 'online').pipe(map(() => true)),
            new Observable((sub: Observer<boolean>) => {
                sub.next(navigator.onLine);
                sub.complete();
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    uploadFile(file): Observable<any> {
        const f: FormData = new FormData();
        f.append('File', file);
        return this._httpClient
            .post(environment.apiEndPoint + 'UploadFile/UploadExcelFile', f)
            .pipe(switchMap((response: any) => of(response)));
    }

    checkRole(role) {
        let roles = JSON.parse(localStorage.getItem('user'))['user_role_m'];
        let roleFound = false;
        if (roles.length) {
            roles.forEach((k) => {
                if (k['role_name'] === role) {
                    roleFound = true;
                }
            });
        }
        return roleFound;
    }

 

    getCommunityList(obj): Observable<any> {
        return this._httpClient
            .get(
                environment.apiEndPoint + `grouping-criteria`,
                {
                    params: { ...obj },
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

   
  






   
  
  
 

    /**
     * GET FINAL DIAGNOSIS
     *
     * @param credentials
     */
    getFinalDiagnosis(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'final_diagnosis/GetAll', obj)
            .pipe(switchMap((response: any) => of(response)));
    }

    getDiagnosisSnoMed(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'Patient_m/CsnoServ_Search_new', {
                params: {
                    ...obj,
                },
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    getFileFromServer(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + 'RRfLog/LoadImage', {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    /**
     * Getter for user
     */
    set user(value: any) {
        // Store the value
        this._user.next(value);
    }
    get user$(): Observable<any[]> {
        return this._user.asObservable();
    }
    getLoggedUser(obj): Observable<any> {
        // return this._httpClient
        //     .get(environment.apiEndPoint + 'user_master_m/GetLoggedUser', {
        //         params: { ...obj },
        //     }).pipe(switchMap((response: any) => of(response)));

        return this.user$.pipe(
            take(1),
            switchMap((response) =>
                this._httpClient
                    .get<any>(
                        environment.apiEndPoint + 'user_master_m/GetLoggedUser',
                        { params: { ...obj } }
                    )
                    .pipe(
                        map((response) => {
                            // Update the user
                            this._user.next(response);
                            // Return the updated contact
                            return response;
                        })
                    )
            )
        );
    }

    checkImageSizeAndType(file) {
        if (file) {
            if (file.size < 100000) {
                if (
                    file.type === 'image/jpeg' ||
                    file.type === 'image/jpg' ||
                    file.type === 'image/png'
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return false;
    }

    checkFileSizeAndType(file) {
        if (file) {
            if (file.size < 5000000) {
                if (
                    file.type === 'image/jpeg' ||
                    file.type === 'image/jpg' ||
                    file.type === 'image/png' ||
                    file.type === 'application/pdf'
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return false;
    }

    saveFile(data) {
        console.log(data);
        let base64Data = data?.result;
        const linkSource = base64Data;
        const downloadLink = document.createElement('a');
        let type = data?.result.split(';')[0].split('/');
        const fileName = data?.name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    viewFile(data) {
        fetch(data?.result)
            .then((res) => res.blob())
            .then((blob) => {
                return blob;
            });
    }

    spreadFormObjects(o) {
        let obj = {};
        Object.keys(o).forEach((k) => {
            if (o[k]) {
                obj[k] = o[k];
            }
        });
        if (Object.keys(obj).length) {
            return obj;
        } else {
            return null;
        }
    }

    spreadFormArrays(f) {
        let a = [];
        f.forEach((key) => {
            let obj = {};
            Object.keys(key).forEach((k) => {
                if (key[k]) {
                    obj[k] = key[k];
                }
            });
            if (Object.keys(obj).length) {
                a.push(obj);
            }
        });
        return [...a];
    }

    /**
     * Add new grade of toxicity
     */
    addNewGradeOfToxicity(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'grade_of_toxicity/POST', obj)
            .pipe(switchMap((response: any) => of(response)));
    }

    /**
     * Add new type of toxicity
     */
    addNewTypeOfToxicity(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'type_of_toxicity/POST', obj)
            .pipe(switchMap((response: any) => of(response)));
    }

    /**
     * Add new co-infection
     */
    addNewCoinfection(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'current_co_infection/POST', obj)
            .pipe(switchMap((response: any) => of(response)));
    }

    /**
     * Add new concomitant drug
     */
    addNewConcomitantDrug(obj): Observable<any> {
        return this._httpClient
            .post(environment.apiEndPoint + 'concomitant_drugs/POST', obj)
            .pipe(switchMap((response: any) => of(response)));
    }
    /**
     * report on consultation per day
     */
    GetConsultationPerDay(obj): Observable<any> {
        return this._httpClient
            .post(
                environment.apiEndPoint +
                    'AdminDashboardHWC/GetConsultationPerDay',
                {
                    ...obj,
                }
            )
            .pipe(switchMap((response: any) => of(response)));
    }

    /**
     * Download CSV File - Reports
     * @param data
     * @param type
     */
    downloadCSV(data: any, type: string) {
        const blob = new Blob([data], { type: 'text/csv' });

        // Creating an object for downloading url
        const url = window.URL.createObjectURL(blob);
        // return false;
        // Creating an anchor(a) tag of HTML
        const a = document.createElement('a');

        // Passing the blob downloading url
        a.setAttribute('href', url);

        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute('download', 'report.csv');

        // Performing a download with click
        a.click();
    }
    download(data) {
        const linkSource = `data:${data.contentType};base64,${data.fileContents}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = data.fileDownloadName;
        downloadLink.click();
    }
    downloadReport(url) {
        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = url;
        a.download = 'monthly report';
        document.body.appendChild(a);
        a.click();
        //  window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }

    getInstitutionsReport(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + `Reports/GetInstitutions`, {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    getSpecialityByName(obj): Observable<any> {
        return this._httpClient
            .get(environment.apiEndPoint + `Reports/GetSpecialization`, {
                params: { ...obj },
            })
            .pipe(switchMap((response: any) => of(response)));
    }

    // getUserMenu(obj): Observable<any> {
    //     return this._httpClient
    //         .get(
    //             environment.apiEndPoint + `AdminInstitution/GetUserDefaultMenu`,
    //             {}
    //         )
    //         .pipe(switchMap((response: any) => of(response)));
    // }

    success(m) {
        this.toastr.success(m);
    }

    error(m) {
        console.log(m);
        this.toastr.error(m);
    }
}
