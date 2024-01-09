import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { FaqService } from '../../faq/faq.service';
import { BlogsService } from '../blogs.service';

@Component({
    selector: 'app-edit-blogs',
    templateUrl: './edit-blogs.component.html',
    styleUrls: ['./edit-blogs.component.scss'],
})
export class EditBlogsComponent implements OnInit {
    form: FormGroup;
    confirmationDialog: FormGroup;
    public loading = false;
    public categoryList$: any;
    public images: any = [];
    public videos: any = [];
    public blogId = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _commonService: CommonService,
        private _blogsService: BlogsService
    ) {}

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params) => {
            this.blogId = params['id'];
        });
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            blog_title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            blogcat: [null, [Validators.required]],
            image: [null, []],
            videos: [null, []],
            dateSchdule: [null, [Validators.required]],
        });
        this.getCategories();
    }
    /**
     * Fetching  communities list
     */
    getCategories() {
        this._commonService.getCategoryList({}).subscribe(
            (response) => {
                this.categoryList$ = response ? [...response.userCategory] : [];
                this.fetchContent();
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }

    fetchContent() {
        this._blogsService.getDetails(this.blogId).subscribe(
            (response) => {
                this.patchValuestOfForm(response);
            },
            (err) => {
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
    }
    resetValues() {
        this.images = [];
        this.videos = [];
    }

    editBlogs() {
        this.loading = true;
        console.log(this.form.value, this.images, this.videos);
        let data: any = {};
        if(this.form.value.blogcat==='777ff6e0-dd0e-4375-80a2-02ff7c583207'){
            if(!this.videos.length){
                this._commonService.error('Kindly upload video!');
                this.loading=false;
                return

            }
        } else if(this.form.value.blogcat!=='777ff6e0-dd0e-4375-80a2-02ff7c583207'){
            if(!this.images.length){
                this._commonService.error('Kindly upload iamges!');
                this.loading=false;
                return

            }
        }

        if (this.images.length) {
            data.image = this.images.toString();
        }
        if (this.videos.length) {
            data.videos = this.videos.toString();
        }

        if (this.form.invalid) {
            this.loading = false;
            return;
        }
        delete this.form.value.image;
        delete this.form.value.videos;
        this._blogsService
            .editBlogs({ ...this.form.value, ...data }, this.blogId)
            .subscribe(
                (response) => {
                    this.loading = false;
                    this._router.navigate(['/blogs/list']);
                },
                (err) => {
                    this.loading = false;
                    this._commonService.error(err.error.message);
                    // this.isLoading = false;
                }
            );
    }
    patchValuestOfForm(res: any) {
        Object.keys(this.form['controls']).forEach((key) => {
            console.log(res);
            if (key === 'image') {
                this.images = res[key].split(',');
                return;
            } else if (key === 'videos') {
                this.videos = res[key].split(',');
            } else {
                this.form['controls'][key].setValue(res[key] ? res[key] : '');
            }
        });
        console.log(this.images, this.videos);
    }
    onFileChange(event: any, format: string) {
        let files = event.target.files
            ? Object.values(event.target.files)
            : event.dataTransfer.files;

        let x = [...files];

        if (!files?.length) return;

        Array.from(x).forEach((y, i) => {
            this.saveFiles(files[i], format);
        });
    }
    /**
     * Save Uploaded Files
     */
    async saveFiles(event: any, format: string) {
        let files = event;
        console.log(files);
        if (format === 'images') {
            if (this._commonService.checkFileSizeAndType(files, 1)) {
                //   let imagePath: any = await this._commonService.getBase64(files);
                // this.fileType = files.type;
                let formData = new FormData();
                formData.append('file', files);

                this._blogsService.upload(formData).subscribe({
                    next: (response: any) => {
                        this.images.push(response?.Location);
                    },
                    error: (error) => {},
                });
            } else {
                this._commonService.error(
                    'Please upload image of file type png, jpg or jpeg and with size less than 5MB !'
                );
            }
        } else {
            if (this._commonService.checkVideoSizeAndType(files)) {
                //   let imagePath: any = await this._commonService.getBase64(files);
                // this.fileType = files.type;
                let formData = new FormData();
                formData.append('file', files);

                this._blogsService.upload(formData).subscribe({
                    next: (response: any) => {
                        this.videos.push(response?.Location);
                    },
                    error: (error) => {},
                });
            } else {
                this._commonService.error(
                    'Please upload image of file type for videos only !'
                );
            }
        }
    }
    removeUploadedFile(key: any, format: string) {
        this.images.splice(key, 1);
    }
}
