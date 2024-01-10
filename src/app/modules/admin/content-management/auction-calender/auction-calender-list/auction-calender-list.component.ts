import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/modules/admin/common/common.service';
import { AuctionCalenderService } from '../auction-calender.service';
import { ApprovalDialogComponent } from '../approval-dialog/approval-dialog.component';

@Component({
  selector: 'app-auction-calender-list',
  templateUrl: './auction-calender-list.component.html',
  styleUrls: ['./auction-calender-list.component.scss'],
  styles: [
    `
        .auction-grid {
            grid-template-columns: auto auto auto auto auto auto;

            @screen sm {
                grid-template-columns: auto auto auto auto auto auto ;
            }

            @screen md {
                grid-template-columns: 200px 200px 200px 200px 200px 200px;
            }

            @screen lg {
                grid-template-columns: 200px 200px 200px 200px 200px 200px;
            }
        }
    `,
],

})
export class AuctionCalenderListComponent implements OnInit {
  confirmationDialog: FormGroup;
  public loading: boolean = false;
  auctionList$: any = [];
  propertyList$ :any=[];
  isLoading1: boolean = false;
  isLoading: boolean = false;
  public form: FormGroup;

  isBlocked: boolean = false;
  pagination: any = {
      limit: 10,
      pageNo: 0,
      TotalCount: 0,
      PageNo: 0,
  };

  constructor(
      private _auctionService: AuctionCalenderService,
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseConfirmationService: FuseConfirmationService,
      private _formBuilder: FormBuilder,
      private _commonService: CommonService,private _matDialog:MatDialog
  ) {
      this.confirmationForm();
  }
  ngOnInit(): void {
      this.getListing();
  }
  
  /**
   * Fetching  banks list
   */
  getListing() {
      let paginationParams = {
          pageNo: this.pagination?.pageNo || 0,
          limit: this.pagination?.limit ||10,
      };

      this.isLoading = true;
      this._auctionService.getList({ ...paginationParams }).subscribe(
          (response) => {
              this.isLoading = false;

              this.pagination.TotalCount = response?.totalAuction || 10;

              this.auctionList$ = response.auctionProperty
              ? [...response.auctionProperty
              ] : [];

              this._changeDetectorRef.detectChanges();
          },
          (err) => {
              console.log(err);
              this._commonService.error(err.error.message);
              this.isLoading = false;
          }
      );
  }

  pageChanged(e) {
      if (e?.pageSize !== this.pagination?.limit) {
          this.pagination.limit = e?.pageSize;
          this.resetPagination();
          return;
      }
      this.pagination.limit = e?.pageSize;
      this.pagination.PageNo = e?.pageIndex;
      this.pagination.pageNo =
          this.pagination?.limit * this.pagination?.PageNo;

      this.getListing();
  }
  /**
   *Reset pagination
   */

  resetPagination() {
      this.pagination = {
          limit: this.pagination.limit,
          pageNo: 0,
          TotalCount: 0,
          PageNo: 0,
      };
      this.getListing();
  }
  confirmationForm() {
      /**
       * CALL CONFIG FORM
       */
      this.confirmationDialog = this._formBuilder.group({
          title: '',
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

  deleteContent(userId: string) {
      this.confirmationDialog.controls['title']?.setValue('Delete ');
      this.confirmationDialog.controls['message']?.setValue(
          'Are you sure you want to delete ?'
      );
      // Opening popup
      const dialogRef = this._fuseConfirmationService.open(
          this.confirmationDialog.value
      );

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) => {
          if (result === 'confirmed') {
              this._auctionService.deleteAuction(userId)
                  .subscribe(
                      (response) => {
                          this.getListing();
                      },
                      (err) => {
                        this._commonService.error(err.error.message);
                      }
                  );
          }
      });
  }
  approve(id:any, isApprove) {
    const dialogRef = this._matDialog.open(ApprovalDialogComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: {
        type: 2,
        message: {id:id, isApprove:isApprove},
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
        console.log('yes')
      if (result === 'confirmed') {
      
       this.getListing();
      }
    });
  }


}
