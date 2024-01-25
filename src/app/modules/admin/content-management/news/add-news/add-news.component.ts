import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/modules/admin/common/common.service';
import { NewsService } from '../news.service';
import {
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
// import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';



export interface tags {
    name: string;
}
@Component({
    selector: 'app-add-news',
    templateUrl: './add-news.component.html',
    styleUrls: ['./add-news.component.scss'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class AddNewsComponent implements OnInit {
    @ViewChild('defaultRTE') public rteObj?: RichTextEditorComponent;
    // @ViewChild('editor') public data?:CKEditorComponent
    form: FormGroup;
    // editor = ClassicEditor;
   // data: any = `<p>Hello, world!</p>`;
    confirmationDialog: FormGroup;
    public loading = false;
    public categoryList$: any = [
        { name: 'WHATSNEW' },
        { name: 'HOTPROESS' },
        { name: 'ARCHIVES' },
    ];
    public images: any = [];
    public videos: any = [];
    public tools: object = {
        items: [
            'Undo',
            'Redo',
            '|',
            'Bold',
            'Italic',
            'Underline',
            'StrikeThrough',
            '|',
            'FontName',
            'FontSize',
            'FontColor',
            'BackgroundColor',
            '|',
            'SubScript',
            'SuperScript',
            '|',
            'LowerCase',
            'UpperCase',
            '|',
            'Formats',
            'Alignments',
            '|',
            'OrderedList',
            'UnorderedList',
            '|',
            'Indent',
            'Outdent',
            '|',
            'CreateLink',
            'Image',
            '|',
            'ClearFormat',
            'Print',
            'SourceCode',
            '|',
            'FullScreen',
        ],
    };
    public iframe: object = { enable: true };
    public height: number = 500;
    public description: any;
    public quickTools: object = {
        image: [
            'Replace',
            'Align',
            'Caption',
            'Remove',
            'InsertLink',
            '-',
            'Display',
            'AltText',
            'Dimension',
        ],
    };
    visible = true;
    //selectable = true;
    removable = true;
    // addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public tags: tags[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _commonService: CommonService,
        private _newsService: NewsService
    ) {}

    ngOnInit(): void {
        /**
         * FORM INITILIZATION
         */
        this.form = this._formBuilder.group({
            author: [null, [Validators.required]],
            category: [null, [Validators.required]],
            article: [null, [Validators.required]],
         title: [null, [Validators.required]],
            tags: [null, [Validators.required]],
        });
      
    }
    onCreate() {
        const instance: any = this.rteObj;

        // instance.contentModule
        //     .getDocument()
        //     .addEventListener('keydown', function (e: any): void {
        //         if (e.key === 's' && e.ctrlKey === true) {
        //             e.preventDefault(); // to prevent default ctrl+s action
        //             instance.updateValue(); // to update the value after editing
        //             let value: any = instance.value; // you can get the RTE content to save in the desired database
        //             console.log(value);
        //         }
        //     });
    }
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if (input) {
            const value = event.value;
            // Add our fruit
            if ((value || '').trim()) {
                this.tags.push({ name: value.trim() });
            }
            // Reset the input value
            if (input) {
                this.form.value.tags = '';
            }
        }
    }
    remove(tag: tags): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }
    /**
     * Fetching  communities list
     */
    getCategories() {
        this._commonService.getCategoryList({}).subscribe(
            (response) => {
                this.categoryList$ = response ? [...response.userCategory] : [];
            },
            (err) => {
                // this.isLoading = false;
            }
        );
    }
    addNews() {
        console.log('called');
        this.loading = true;
           console.log(this.form.value, this.rteObj, this.images, this.tags);
        if (this.form.invalid) {
            this.loading = false;
            return;
        }

        if ( !this.images.length || !this.tags.length) {
            this._commonService.error('All fields are required.');
            this.loading = false;
            return;
        }
        let data: any = {
            tags: this.tags.map((item) => item.name).toString(),
            // article: this.rteObj,
        };
        if (this.images.length) {
            data.image = this.images.toString();
        }

        this._newsService.addNews({ ...this.form.value, ...data }).subscribe(
            (response) => {
                this.loading = false;
                this._router.navigate(['/news/list']);
            },
            (err) => {
                this.loading = false;
                this._commonService.error(err.error.message);
                // this.isLoading = false;
            }
        );
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

                this._newsService.upload(formData).subscribe({
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

                this._newsService.upload(formData).subscribe({
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
