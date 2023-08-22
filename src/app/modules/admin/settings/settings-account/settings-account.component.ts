import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
} from '@angular/core';
import { MOBILE_NUMBER, EMAIL_REGEX } from '../../common/regex.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../common/common.service';
import { UserService } from 'app/core/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'settings-account',
    templateUrl: 'settings-account.component.html',
    styleUrls: ['settings-account.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit {
    public loading: boolean = false;
    public displaySignature: any;
    profileImg: any;
    public accountForm: FormGroup;
    public user: any = JSON.parse(localStorage.getItem('user'));

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        public _commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _sanitizer: DomSanitizer
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.accountForm = this._formBuilder.group({
            first_name: ['', [this._commonService.noWhitespaceValidator]],
            last_name: ['', [this._commonService.noWhitespaceValidator]],
            userEmail: [
                '',
                [
                    this._commonService.noWhitespaceValidator,
                    Validators.pattern(EMAIL_REGEX),
                ],
            ],
            phone_number: [null, [Validators.pattern(MOBILE_NUMBER)]],
            facility_id: [
                JSON.parse(localStorage.getItem('user'))?.['facility_m']?.[
                    'facility_id'
                ],
            ],
            facility_type_id: [
                JSON.parse(localStorage.getItem('user'))?.['facility_type_m']?.[
                    'facility_type_id'
                ],
            ],
            designation_id: [''],
            date_of_birth: [''],
            gender_name: [''],
            doctor_signature: [''],
            user_role_m: [[]],
            doctorPin: [''],
            profilePicture: [''],
        });
        this.fetchUserDetails();
    }

    createParams() {
        let obj = {};
        Object.keys(this.accountForm.value).forEach((k) => {
            if (this.accountForm.value[k]) {
                if (k !== 'user_role_m') obj[k] = this.accountForm.value[k];
                else {
                    obj[k] = this.accountForm.value[k].map((x) => {
                        return {
                            role_id: x,
                            role_name: '',
                        };
                    });
                }
            }
        });
        return obj;
    }

    /**
     * Fetch logged in user details
     */
    fetchUserDetails() {
        this._commonService.getLoggedUser({}).subscribe((response) => {
            this.viewSignature(response?.doctor_signature);
            this.viewProfile(response?.profilePicture);
            if (response) {
                localStorage.setItem('user', JSON.stringify(response));
                this.patchValuestOfForm(response);
                //this._userService.user = response
                //this._commonService.user = response
            }
        });
    }

    patchValuestOfForm(res) {
        if (res)
            Object.keys(this.accountForm['controls']).forEach((key) => {
                if (key !== 'user_role_m')
                    this.accountForm['controls'][key].setValue(
                        res[key] ? res[key] : ''
                    );
                else
                    this.accountForm['controls'][key].setValue(
                        res['user_role_m'].map((r) => {
                            return r?.role_id;
                        })
                    );
            });
    }

    updateData() {
        if (this.loading) return false;
        if (!this.accountForm.valid) return false;

        let params = {
            ...this.createParams(),

            facility_id: JSON.parse(localStorage.getItem('user'))?.[
                'facility_m'
            ]?.['facility_id'],
            facility_type_id: JSON.parse(localStorage.getItem('user'))?.[
                'facility_type_m'
            ]?.['facility_type_id'],
            userid: parseInt(this.user.userID),
        };
        this.loading = true;
        if (this.user['adminTypeId'] > 2)
            this._commonService.updateUser(params).subscribe(
                (res) => {
                    this.loading = false;
                    this.fetchUserDetails();
                    this._commonService.throwSuccess(
                        'Profile has been successfully updated'
                    );
                },
                (err) => {
                    this.loading = false;
                    this._commonService.throwErr(
                        err?.error[0] ||
                            'There is some issue while updating, please try again.'
                    );
                }
            );
        else
            this._commonService.updateAdmin(params).subscribe(
                (res) => {
                    this.loading = false;
                    this.fetchUserDetails();
                    this._commonService.throwSuccess(
                        'Profile has been successfully updated'
                    );
                },
                (err) => {
                    this.loading = false;
                    this._commonService.throwErr(
                        err?.error[0] ||
                            'There is some issue while updating, please try again.'
                    );
                }
            );
    }

    /**
     * Upload Signature
     * @param value
     */
    onFileChange(event, type) {
        // return
        let files = event.target.files[0];
        if (this._commonService.checkImageSizeAndType(files))
            this.saveFiles(files, type);
        else
            this._commonService.throwErr(
                'Please upload jpg, png file with size less than 100 Kb.'
            );
    }

    /**
     * Save Uploaded Files
     */

    saveFiles(files: FileList, type) {
        let f = files;
        this.loading = true;
        this._commonService.uploadFile(files).subscribe((res) => {
            this.loading = false;
            if (res.length) this.updateSignature(res[0]['name'], type);
        });
    }

    /**
     * Update signature in form
     * @param data
     */
    updateSignature(value, type) {
        if (value && type !== 'uplodingProfile') {
            this.accountForm.controls['doctor_signature'].setValue(value);
            this.viewSignature(value);
        } else {
            this.accountForm.controls['profilePicture'].setValue(value);
            this.viewProfile(value);
        }
        this._changeDetectorRef.detectChanges();
    }

    /**
     * Remova signature
     * @param fileName
     */
    removeSignature() {
        this.accountForm.controls['doctor_signature'].setValue('');
        this.displaySignature = null;
    }

    /**
     * open uploaded file
     * @param fileName
     */
    openFile(fileName: string): void {
        this._commonService
            .getFileFromServer({ ImageName: fileName })
            .subscribe(
                (res) => {
                    if (res?.name) {
                        this._commonService.saveFile(res);
                    }
                },
                (err) => {
                    this._commonService.throwErr(
                        'Not able to access the file.'
                    );
                }
            );
    }
    /**
     * Show uploaded file
     * @param fileName
     */

    viewProfile(fileName: string) {
        if (fileName)
            this._commonService
                .getFileFromServer({ ImageName: fileName })
                .subscribe(
                    (res) => {
                        this.profileImg = res?.result;
                        // this.accountForm.controls['profilePicture'].setValue(res?.result);
                        this._changeDetectorRef.detectChanges();
                    },
                    (err) => {
                        this._commonService.throwErr(
                            'Not able to access the file.'
                        );
                    }
                );
    }
    viewSignature(fileName: string) {
        if (fileName)
            this._commonService
                .getFileFromServer({ ImageName: fileName })
                .subscribe(
                    (res) => {
                        this.displaySignature = res?.result;
                        this._changeDetectorRef.detectChanges();
                    },
                    (err) => {
                        this._commonService.throwErr(
                            'Not able to access the file.'
                        );
                    }
                );
    }
}
