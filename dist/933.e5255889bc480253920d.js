"use strict";(self.webpackChunk_fracprop_panel=self.webpackChunk_fracprop_panel||[]).push([[933],{933:(ft,q,s)=>{s.r(q),s.d(q,{AuctionCalenderModule:()=>gt});var m=s(8583),d=s(3423),Z=s(1095),U=s(7539),c=s(8295),b=s(6627),v=s(9983),D=s(9692),N=s(2178),I=s(5396),J=s(1436),L=s(4466),T=s(7441),u=s(3220),C=s(2458),y=s(2238),t=s(7716),l=s(3679),g=s(2340),f=s(5917),h=s(3190),Q=s(1841);let x=(()=>{class i{constructor(e){this._httpClient=e}getList(e){return this._httpClient.get(g.N.apiEndPoint+"fund-account/getAllAuctionList/"+e.pageNo+"/"+e.limit).pipe((0,h.w)(n=>(0,f.of)(n)))}getDetails(e){return this._httpClient.get(g.N.apiEndPoint+"fund-account/getAuction/"+e).pipe((0,h.w)(n=>(0,f.of)(n)))}addAuction(e){return this._httpClient.post(g.N.apiEndPoint+"fund-account/auctionShare",Object.assign({},e)).pipe((0,h.w)(n=>(0,f.of)(n)))}editAuction(e,n){return this._httpClient.patch(g.N.apiEndPoint+"fund-account/updateAuctionAdminModification/"+n,Object.assign({},e)).pipe((0,h.w)(o=>(0,f.of)(o)))}deleteAuction(e){return this._httpClient.delete(g.N.apiEndPoint+"fund-account/deleteAuction"+e).pipe((0,h.w)(n=>(0,f.of)(n)))}approveAuction(e){return this._httpClient.post(g.N.apiEndPoint+"fund-account/updateAuctionAdminApproveORDisapprove",Object.assign({},e)).pipe((0,h.w)(n=>(0,f.of)(n)))}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(Q.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var A=s(8351);function w(i,a){1&i&&t._UZ(0,"div",15),2&i&&t.Q6J("innerHTML","Approval",t.oJD)}function k(i,a){1&i&&t._UZ(0,"div",15),2&i&&t.Q6J("innerHTML","Rejection",t.oJD)}function S(i,a){1&i&&t._UZ(0,"div",16),2&i&&t.Q6J("innerHTML","Are you sure want to reject?",t.oJD)}function Y(i,a){1&i&&t._UZ(0,"div",16),2&i&&t.Q6J("innerHTML","Are you sure want to reject?",t.oJD)}function O(i,a){if(1&i&&(t.TgZ(0,"div",17),t.TgZ(1,"div",18),t.TgZ(2,"mat-form-field",19),t.TgZ(3,"mat-label"),t._uU(4,"Auction start date"),t.qZA(),t._UZ(5,"input",20),t.TgZ(6,"mat-hint"),t._uU(7,"MM/DD/YYYY"),t.qZA(),t._UZ(8,"mat-datepicker-toggle",21),t._UZ(9,"mat-datepicker",null,22),t.qZA(),t.qZA(),t.TgZ(11,"div",18),t.TgZ(12,"mat-form-field",19),t.TgZ(13,"mat-label"),t._uU(14,"Auction end date"),t.qZA(),t._UZ(15,"input",23),t.TgZ(16,"mat-hint"),t._uU(17,"MM/DD/YYYY"),t.qZA(),t._UZ(18,"mat-datepicker-toggle",21),t._UZ(19,"mat-datepicker",null,24),t.qZA(),t.qZA(),t.qZA()),2&i){const e=t.MAs(10),n=t.MAs(20);t.xp6(5),t.Q6J("matDatepicker",e),t.xp6(3),t.Q6J("for",e),t.xp6(7),t.Q6J("matDatepicker",n),t.xp6(3),t.Q6J("for",n)}}function M(i,a){1&i&&(t.TgZ(0,"span"),t._uU(1," Save"),t.qZA())}function P(i,a){1&i&&t._UZ(0,"mat-progress-spinner",25),2&i&&t.Q6J("diameter",24)("mode","indeterminate")}let j=(()=>{class i{constructor(e,n,o,r,p){this.matDialogRef=e,this.data=n,this._formBuilder=o,this._auctionService=r,this._commonService=p,this.loading=!1}ngOnInit(){this.form=this._formBuilder.group({startDate:[null,[]],endDate:[null,[]]})}approve(){if(this.loading=!0,this.data.message.isApprove){if(this.form.invalid)return void(this.loading=!1);if(Date.parse(this.form.value.startdate)<=Date.parse(this.form.value.endadate))return this.loading=!1,this._commonService.error("End Date should be greater than start date"),void(this.loading=!1)}let e;this.data.message.isApprove&&(e=Object.assign({},this.form.value)),this._auctionService.approveAuction(Object.assign({auctionId:this.data.message.id,admin_status:this.data.message.isApprove},e)).subscribe(n=>{this.loading=!1,this.close("confirmed")},n=>{this.loading=!1,this._commonService.error(n.error.message)})}close(e){this.matDialogRef.close(e)}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(y.so),t.Y36(y.WI),t.Y36(l.qu),t.Y36(x),t.Y36(A.v))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-approval-dialog"]],decls:25,vars:10,consts:[[1,"relative","flex","flex-col","w-full","h-full"],[3,"formGroup"],[1,"absolute","top-0","right-0","pt-4","pr-4"],["mat-icon-button","",3,"click"],[1,"text-secondary",3,"svgIcon"],[1,"flex","flex-col","sm:flex-row","flex-auto","items-center","sm:items-start","p-6","pb-4","sm:pb-6"],[1,"flex","flex-col","items-center","sm:items-start","mt-4","sm:mt-0","sm:pr-8","space-y-1","text-center","sm:text-left"],["class","text-2xl leading-6 font-medium",3,"innerHTML",4,"ngIf"],["class","text-secondary",3,"innerHTML",4,"ngIf"],["class","grid sm:grid-cols-2 md:grid-cols-2 gap-6 w-full min-w-0",4,"ngIf"],[1,"flex","items-center","justify-center","sm:justify-end","px-6","py-4","space-x-3","bg-gray-50","dark:bg-black","dark:bg-opacity-10"],["mat-stroked-button","","type","button"],["mat-flat-button","",1,"text-white","bg-red-700","hover:bg-red-800","focus:outline-none","focus:ring-4","focus:ring-red-300","font-medium","rounded-full","text-sm","px-5","py-2.5","text-center","me-2","mb-2","dark:bg-red-600","dark:hover:bg-red-700","dark:focus:ring-red-900",3,"color","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"text-2xl","leading-6","font-medium",3,"innerHTML"],[1,"text-secondary",3,"innerHTML"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0"],[1,"flex","flex-col","gt-xs:flex-row"],[1,"w-full"],["matInput","","formControlName","startDate",3,"matDatepicker"],["matIconSuffix","",3,"for"],["picker2",""],["matInput","","formControlName","endDate",3,"matDatepicker"],["picker1",""],[3,"diameter","mode"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"form",1),t.ynx(2),t.TgZ(3,"div",2),t.TgZ(4,"button",3),t.NdJ("click",function(){return n.close("cancelled")}),t._UZ(5,"mat-icon",4),t.qZA(),t.qZA(),t.BQk(),t.TgZ(6,"div",5),t.ynx(7),t.TgZ(8,"div",6),t.ynx(9),t.YNc(10,w,1,1,"div",7),t.YNc(11,k,1,1,"div",7),t.BQk(),t.ynx(12),t.YNc(13,S,1,1,"div",8),t.YNc(14,Y,1,1,"div",8),t.BQk(),t.YNc(15,O,21,4,"div",9),t.qZA(),t.BQk(),t.qZA(),t.ynx(16),t.TgZ(17,"div",10),t.ynx(18),t.TgZ(19,"button",11),t._uU(20,"No"),t.qZA(),t.BQk(),t.ynx(21),t.TgZ(22,"button",12),t.NdJ("click",function(){return n.approve()}),t.YNc(23,M,2,0,"span",13),t.YNc(24,P,1,2,"mat-progress-spinner",14),t.qZA(),t.BQk(),t.qZA(),t.BQk(),t.qZA(),t.qZA()),2&e&&(t.xp6(1),t.Q6J("formGroup",n.form),t.xp6(4),t.Q6J("svgIcon","heroicons_outline:x"),t.xp6(5),t.Q6J("ngIf",n.data.message.isApprove),t.xp6(1),t.Q6J("ngIf",!n.data.message.isApprove),t.xp6(2),t.Q6J("ngIf",n.data.message.isApprove),t.xp6(1),t.Q6J("ngIf",!n.data.message.isApprove),t.xp6(1),t.Q6J("ngIf",n.data.message.isApprove),t.xp6(7),t.Q6J("color","primary"),t.xp6(1),t.Q6J("ngIf",!n.loading),t.xp6(1),t.Q6J("ngIf",n.loading))},directives:[l._Y,l.JL,l.sg,Z.lW,b.Hw,m.O5,c.KE,c.hX,v.Nt,l.Fj,u.hl,l.JJ,l.u,c.bx,u.nW,u.Mq],styles:[""]}),i})();var F=s(1400);function E(i,a){1&i&&(t.TgZ(0,"div",13),t._UZ(1,"mat-progress-bar",14),t.qZA()),2&i&&(t.xp6(1),t.Q6J("mode","indeterminate"))}function B(i,a){if(1&i&&(t.TgZ(0,"button",26),t._uU(1," Edit "),t.qZA()),2&i){const e=t.oxw().$implicit;t.MGl("routerLink","/auction-calendar/edit-auction-content/",null==e?null:e.id,"")}}function $(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"button",27),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).approve(null==o?null:o.id,!0)}),t._uU(1," Approve "),t.qZA()}}function R(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"button",28),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).approve(null==o?null:o.id,!1)}),t._uU(1," Reject "),t.qZA()}}function H(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"button",28),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).delete(null==o?null:o.id)}),t._uU(1," Delete "),t.qZA()}}function z(i,a){if(1&i&&(t.ynx(0),t.TgZ(1,"div",20),t.TgZ(2,"div"),t._uU(3),t.qZA(),t.TgZ(4,"div",21),t._uU(5),t.qZA(),t.TgZ(6,"div",21),t._uU(7),t.qZA(),t.TgZ(8,"div",21),t._uU(9),t.qZA(),t.TgZ(10,"div",21),t._uU(11),t.qZA(),t.TgZ(12,"div",22),t._uU(13),t.YNc(14,B,2,1,"button",23),t.YNc(15,$,2,0,"button",24),t.YNc(16,R,2,0,"button",25),t.YNc(17,H,2,0,"button",25),t.qZA(),t.qZA(),t.BQk()),2&i){const e=a.$implicit,n=a.index,o=t.oxw(2);t.xp6(3),t.hij(" ",(null==o.pagination?null:o.pagination.PageNo)*(null==o.pagination?null:o.pagination.limit)+n+1," "),t.xp6(2),t.hij(" ",null==e?null:e.userType," "),t.xp6(2),t.hij(" ",(null==e?null:e.description)||"-"," "),t.xp6(2),t.hij(" ",(null==e?null:e.noofsharetoAuction)||"-"," "),t.xp6(2),t.hij(" ",(null==e?null:e.sellingPrice)||"-"," "),t.xp6(2),t.hij(" ",null!=e&&e.admin_status&&"ADMIN"!==(null==e?null:e.userType)?"APPROVED":""," "),t.xp6(1),t.Q6J("ngIf","ADMIN"===(null==e?null:e.userType)),t.xp6(1),t.Q6J("ngIf","ADMIN"!=(null==e?null:e.userType)&&!(null!=e&&e.admin_status)),t.xp6(1),t.Q6J("ngIf","ADMIN"!=(null==e?null:e.userType)&&!(null!=e&&e.admin_status)),t.xp6(1),t.Q6J("ngIf","ADMIN"===(null==e?null:e.userType))}}const V=function(i){return{"pointer-events-none":i}},W=function(){return[5,10,25,100]};function G(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"mat-paginator",29),t.NdJ("page",function(o){return t.CHM(e),t.oxw(2).pageChanged(o)}),t.qZA()}if(2&i){const e=t.oxw(2);t.Q6J("ngClass",t.VKq(6,V,e.isLoading))("length",e.pagination.TotalCount)("pageIndex",e.pagination.PageNo)("pageSize",e.pagination.LimitRecords)("pageSizeOptions",t.DdM(8,W))("showFirstLastButtons",!0)}}function X(i,a){if(1&i&&(t.ynx(0),t.ynx(1),t.TgZ(2,"div",15),t.TgZ(3,"div",16),t.TgZ(4,"div",17),t._uU(5,"S No."),t.qZA(),t.TgZ(6,"div",17),t._uU(7,"User name"),t.qZA(),t.TgZ(8,"div",17),t._uU(9,"Property name"),t.qZA(),t.TgZ(10,"div",17),t._uU(11,"No. of Shares"),t.qZA(),t.TgZ(12,"div",17),t._uU(13,"Selling price"),t.qZA(),t.TgZ(14,"div",17),t._uU(15,"Action"),t.qZA(),t.qZA(),t.ynx(16),t.YNc(17,z,18,10,"ng-container",18),t.BQk(),t.qZA(),t.YNc(18,G,1,9,"mat-paginator",19),t.BQk(),t.BQk()),2&i){const e=t.oxw();t.xp6(17),t.Q6J("ngForOf",e.auctionList$),t.xp6(1),t.Q6J("ngIf",e.auctionList$.length)}}function K(i,a){if(1&i&&(t.TgZ(0,"div",30),t._uU(1),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.hij(" ",e.isLoading?"Fetching Data":"There is no data!"," ")}}let tt=(()=>{class i{constructor(e,n,o,r,p,_){this._auctionService=e,this._changeDetectorRef=n,this._fuseConfirmationService=o,this._formBuilder=r,this._commonService=p,this._matDialog=_,this.loading=!1,this.auctionList$=[],this.propertyList$=[],this.isLoading1=!1,this.isLoading=!1,this.isBlocked=!1,this.pagination={limit:10,pageNo:0,TotalCount:0,PageNo:0},this.confirmationForm()}ngOnInit(){this.getListing()}getListing(){var e,n;let o={pageNo:(null===(e=this.pagination)||void 0===e?void 0:e.pageNo)||0,limit:(null===(n=this.pagination)||void 0===n?void 0:n.limit)||10};this.isLoading=!0,this._auctionService.getList(Object.assign({},o)).subscribe(r=>{this.isLoading=!1,this.pagination.TotalCount=(null==r?void 0:r.totalAuction)||10,this.auctionList$=r.auctionProperty?[...r.auctionProperty]:[],this._changeDetectorRef.detectChanges()},r=>{console.log(r),this._commonService.error(r.error.message),this.isLoading=!1})}pageChanged(e){var n,o,r;if((null==e?void 0:e.pageSize)!==(null===(n=this.pagination)||void 0===n?void 0:n.limit))return this.pagination.limit=null==e?void 0:e.pageSize,void this.resetPagination();this.pagination.limit=null==e?void 0:e.pageSize,this.pagination.PageNo=null==e?void 0:e.pageIndex,this.pagination.pageNo=(null===(o=this.pagination)||void 0===o?void 0:o.limit)*(null===(r=this.pagination)||void 0===r?void 0:r.PageNo),this.getListing()}resetPagination(){this.pagination={limit:this.pagination.limit,pageNo:0,TotalCount:0,PageNo:0},this.getListing()}confirmationForm(){this.confirmationDialog=this._formBuilder.group({title:"",message:"",icon:this._formBuilder.group({show:!0,name:"mat_outline:delete",color:"warn"}),actions:this._formBuilder.group({confirm:this._formBuilder.group({show:!0,label:"Yes",color:"warn"}),cancel:this._formBuilder.group({show:!0,label:"No"})}),dismissible:!0})}deleteContent(e){var n,o;null===(n=this.confirmationDialog.controls.title)||void 0===n||n.setValue("Delete "),null===(o=this.confirmationDialog.controls.message)||void 0===o||o.setValue("Are you sure you want to delete ?"),this._fuseConfirmationService.open(this.confirmationDialog.value).afterClosed().subscribe(p=>{"confirmed"===p&&this._auctionService.deleteAuction(e).subscribe(_=>{this.getListing()},_=>{this._commonService.error(_.error.message)})})}approve(e,n){this._matDialog.open(j,{panelClass:"custom-dialog-container",disableClose:!0,data:{type:2,message:{id:e,isApprove:n}}}).afterClosed().subscribe(r=>{console.log("yes"),"confirmed"===r&&this.getListing()})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(x),t.Y36(t.sBO),t.Y36(F.R),t.Y36(l.qu),t.Y36(A.v),t.Y36(y.uw))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-auction-calender-list"]],decls:17,vars:6,consts:[[1,"sm:absolute","sm:inset-0","flex","flex-col","flex-auto","min-w-0","sm:overflow-hidden","bg-card","dark:bg-transparent"],[1,"relative","flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","py-4","px-6","md:px-4"],["class","absolute inset-x-0 top-0",4,"ngIf"],[1,"flex","items-start","justify-between","w-full"],[1,"text-3xl","font-bold","tracking-tight","leading-8","text-theme"],[1,"mr-4","flex","justify-end","pb-2"],["routerLink","/auction-calendar/add-auction-content","mat-flat-button","","type","button",1,"ml-4","bg-header","rounded-lg",3,"matTooltip","color"],[3,"svgIcon"],[1,"ml-2","mr-1"],[1,"flex","flex-auto","overflow-hidden"],[1,"flex","flex-col","flex-auto","sm:mb-18","overflow-hidden","sm:overflow-y-auto"],[4,"ngIf","ngIfElse"],["noAdmin",""],[1,"absolute","inset-x-0","top-0"],[3,"mode"],[1,"grid","table_tr_bg"],[1,"auction-grid","z-10","text-lg","sticky","top-0","grid","gap-4","py-4","px-6","md:px-8","shadow","font-semibold",2,"background-color","#ecf1f2"],[1,"hidden","md:block"],[4,"ngFor","ngForOf"],["class","sm:absolute sm:inset-x-0 sm:bottom-0 border-b sm:border-t sm:border-b-0 z-10 bg-gray-50 dark:bg-transparent justify-center text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page",4,"ngIf"],[1,"auction-grid","font-medium","grid","items-center","gap-4","py-3","px-6","md:px-8","border-b-2","border-gray-300"],[1,""],[1,"flex","justify-start"],["class","min-w-10 min-h-7 h-7 px-2 ml-1 bg-green-600 rounded-2xl","matTooltip","Details",3,"routerLink",4,"ngIf"],["class","min-w-10 min-h-7 h-7 px-2 ml-1 bg-green-600 rounded-2xl","matTooltip","Details","type","button",3,"click",4,"ngIf"],["class","min-w-20 min-h-7 h-7 px-2 ml-1 bg-red-600 text-white rounded-2xl","matTooltip","Delete",3,"click",4,"ngIf"],["matTooltip","Details",1,"min-w-10","min-h-7","h-7","px-2","ml-1","bg-green-600","rounded-2xl",3,"routerLink"],["matTooltip","Details","type","button",1,"min-w-10","min-h-7","h-7","px-2","ml-1","bg-green-600","rounded-2xl",3,"click"],["matTooltip","Delete",1,"min-w-20","min-h-7","h-7","px-2","ml-1","bg-red-600","text-white","rounded-2xl",3,"click"],[1,"sm:absolute","sm:inset-x-0","sm:bottom-0","border-b","sm:border-t","sm:border-b-0","z-10","bg-gray-50","dark:bg-transparent","justify-center","text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page"],[1,"p-8","sm:p-16","border-t","text-4xl","font-semibold","tracking-tight","text-center"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.YNc(2,E,2,1,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div"),t.TgZ(5,"h2",4),t._uU(6," Auction Calender Content "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"div",5),t.TgZ(8,"button",6),t._UZ(9,"mat-icon",7),t.TgZ(10,"span",8),t._uU(11,"Add Auction Calender"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(12,"div",9),t.TgZ(13,"div",10),t.YNc(14,X,19,2,"ng-container",11),t.YNc(15,K,2,1,"ng-template",null,12,t.W1O),t.qZA(),t.qZA(),t.qZA()),2&e){const o=t.MAs(16);t.xp6(2),t.Q6J("ngIf",n.isLoading),t.xp6(6),t.Q6J("matTooltip","Add Content")("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:plus"),t.xp6(5),t.Q6J("ngIf",n.auctionList$.length)("ngIfElse",o)}},directives:[m.O5,Z.lW,d.rH,J.gM,b.Hw,N.pW,m.sg,D.NW,m.mk],styles:["",".auction-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto auto auto auto}@media (min-width: 600px){.auction-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto auto auto auto}}@media (min-width: 960px){.auction-grid[_ngcontent-%COMP%]{grid-template-columns:200px 200px 200px 200px 200px 200px}}@media (min-width: 1280px){.auction-grid[_ngcontent-%COMP%]{grid-template-columns:200px 200px 200px 200px 200px 200px}}"]}),i})();var et=s(7495);function it(i,a){if(1&i&&(t.TgZ(0,"div",29),t.TgZ(1,"div",30),t._uU(2),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.xp6(2),t.hij(" Total number of shares available: ",(null==e.propertyDetails?null:e.propertyDetails.totalnumberShareavailable)||"-"," ")}}function nt(i,a){if(1&i&&(t.TgZ(0,"mat-option",31),t._uU(1),t.qZA()),2&i){const e=a.$implicit;t.Q6J("value",null==e?null:e.id),t.xp6(1),t.Oqu((null==e?null:e.property_name)||"")}}function ot(i,a){if(1&i&&(t.TgZ(0,"mat-option",31),t._uU(1),t.qZA()),2&i){const e=a.$implicit;t.Q6J("value",null==e?null:e.id),t.xp6(1),t.Oqu((null==e?null:e.name)||"")}}function at(i,a){1&i&&(t.TgZ(0,"span"),t._uU(1," Save"),t.qZA())}function rt(i,a){1&i&&t._UZ(0,"mat-progress-spinner",32),2&i&&t.Q6J("diameter",24)("mode","indeterminate")}function st(i,a){if(1&i&&(t.TgZ(0,"div",29),t.TgZ(1,"div",30),t._uU(2),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.xp6(2),t.hij(" Total number of shares available: ",(null==e.propertyDetails?null:e.propertyDetails.totalnumberShareavailable)||"-"," ")}}function ut(i,a){if(1&i&&(t.TgZ(0,"mat-option",31),t._uU(1),t.qZA()),2&i){const e=a.$implicit;t.Q6J("value",null==e?null:e.id),t.xp6(1),t.Oqu((null==e?null:e.property_name)||"")}}function ct(i,a){if(1&i&&(t.TgZ(0,"mat-option",31),t._uU(1),t.qZA()),2&i){const e=a.$implicit;t.Q6J("value",null==e?null:e.id),t.xp6(1),t.Oqu((null==e?null:e.name)||"")}}function mt(i,a){1&i&&(t.TgZ(0,"span"),t._uU(1," Save"),t.qZA())}function pt(i,a){1&i&&t._UZ(0,"mat-progress-spinner",32),2&i&&t.Q6J("diameter",24)("mode","indeterminate")}const dt=[{path:"list",component:tt},{path:"add-auction-content",component:(()=>{class i{constructor(e,n,o,r,p){this._formBuilder=e,this._router=n,this._commonService=o,this._auctionService=r,this._userService=p,this.loading=!1,this.communityList$=[{text:"Yearly",value:"Yearly"},{text:"Quaterly",value:"Quaterly"},{text:"halfyearly",value:"halfyearly"}],this.propertyList$=[],this.userID=JSON.parse(localStorage.getItem("user")).id}ngOnInit(){this.form=this._formBuilder.group({property_id:[null,[l.kI.required]],group_id:[null,[l.kI.required]],startdate:[null,[l.kI.required]],enddate:[null,[l.kI.required]],sellingPrice:[null,[l.kI.required]],noofsharetoAuction:[null,[l.kI.required]]}),this.getProperties(),this.getCommunities()}getCommunities(){this._commonService.getCommunityList({searcString:"test"}).subscribe(e=>{this.communityList$=e?[...e]:[]},e=>{})}getProperties(){this._commonService.getPropertyList({}).subscribe(e=>{this.propertyList$=e?[...e]:[]},e=>{})}getDetailOnSelect(e){this.propertyDetails={},this.propertyList$.filter(n=>{n.id==e&&(this.propertyDetails=Object.assign({},n),this.form.patchValue({group_id:n.groupcriteriaId}))})}addData(){if(this.loading=!0,!this.form.invalid)return Date.parse(this.form.value.startdate)<=Date.parse(this.form.value.endadate)?(this.loading=!1,this._commonService.error("End Date should be greater than start date"),void(this.loading=!1)):Number(this.form.value.noofsharetoAuction)>Number(this.propertyDetails.totalnumberShareavailable)?(this._commonService.error("Number of shares cannot be greater than total number of available shares"),void(this.loading=!1)):void this._auctionService.addAuction(Object.assign(Object.assign({},this.form.value),{admin_status:"true",noofsharetoAuction:this.form.value.noofsharetoAuction.toString(),sellingPrice:this.form.value.sellingPrice.toString(),user_id:this.userID})).subscribe(e=>{this.loading=!1,this._router.navigate(["/auction-calendar/list"])},e=>{this.loading=!1,this._commonService.error(e.error.message)});this.loading=!1}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(l.qu),t.Y36(d.F0),t.Y36(A.v),t.Y36(x),t.Y36(et.K))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-add-auction-calender"]],decls:68,vars:19,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-6","sm:p-2"],[1,"px-3","m-auto"],[1,"prose","prose-sm","max-w-3xl"],[1,"text-4xl","font-semibold","tracking-tight","leading-8"],[1,"flex","flex-col","mt-4","px-8","pt-10","bg-card","shadow","rounded","overflow-hidden","justify-center","items-center",3,"formGroup","submit"],[1,"text-3xl","tracking-tight","text-left","leading-8","pb-4"],["class","grid sm:grid-cols-1 md:grid-cols-1 gap-6 w-full min-w-0 pb-4",4,"ngIf"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0"],[1,"flex","flex-col","gt-xs:flex-row"],[1,"flex-auto","gt-xs:pr-3",3,"floatLabel"],[1,"text-header","font-bold"],[1,"text-warn"],["placeholder","Select property",3,"formControlName","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Select community",3,"formControlName"],[1,"w-full"],["matInput","","formControlName","startdate",3,"matDatepicker"],["matIconSuffix","",3,"for"],["picker2",""],["matInput","","formControlName","enddate",3,"matDatepicker"],["picker1",""],["matInput","","placeholder","No. of shares","type","number",3,"formControlName"],["matInput","","placeholder","Selling Price","type","number",3,"formControlName"],[1,"flex","items-center","justify-end","border-t","-mx-8","mt-8","px-8","py-5","bg-gray-50","dark:bg-gray-700"],["routerLink","/auction-calendar/list","mat-button",""],["mat-flat-button","",1,"px-6","ml-3","bg-theme",3,"color","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"grid","sm:grid-cols-1","md:grid-cols-1","gap-6","w-full","min-w-0","pb-4"],[1,"flex","flex-col","gt-xs:flex-row","text-2xl","text-center"],[3,"value"],[3,"diameter","mode"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"h2",4),t._uU(5," Auction Property "),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.NdJ("submit",function(){return n.addData}),t.TgZ(7,"h2",6),t._uU(8," Auction Details "),t.qZA(),t.YNc(9,it,3,1,"div",7),t.TgZ(10,"div",8),t.TgZ(11,"div",9),t.TgZ(12,"mat-form-field",10),t.TgZ(13,"mat-label",11),t._uU(14," Property"),t._UZ(15,"span",12),t.qZA(),t.TgZ(16,"mat-select",13),t.NdJ("selectionChange",function(r){return n.getDetailOnSelect(r.value)}),t.YNc(17,nt,2,2,"mat-option",14),t.qZA(),t.qZA(),t.qZA(),t.TgZ(18,"div",9),t.TgZ(19,"mat-form-field",10),t.TgZ(20,"mat-label",11),t._uU(21," Community"),t._UZ(22,"span",12),t.qZA(),t.TgZ(23,"mat-select",15),t.YNc(24,ot,2,2,"mat-option",14),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(25,"div",8),t.TgZ(26,"div",9),t.TgZ(27,"mat-form-field",16),t.TgZ(28,"mat-label",11),t._uU(29," Auction start date"),t._UZ(30,"span",12),t.qZA(),t._UZ(31,"input",17),t.TgZ(32,"mat-hint"),t._uU(33,"MM/DD/YYYY"),t.qZA(),t._UZ(34,"mat-datepicker-toggle",18),t._UZ(35,"mat-datepicker",null,19),t.qZA(),t.qZA(),t.TgZ(37,"div",9),t.TgZ(38,"mat-form-field",16),t.TgZ(39,"mat-label",11),t._uU(40," Auction end date"),t._UZ(41,"span",12),t.qZA(),t._UZ(42,"input",20),t.TgZ(43,"mat-hint"),t._uU(44,"MM/DD/YYYY"),t.qZA(),t._UZ(45,"mat-datepicker-toggle",18),t._UZ(46,"mat-datepicker",null,21),t.qZA(),t.qZA(),t.qZA(),t.TgZ(48,"div",8),t.TgZ(49,"div",9),t.TgZ(50,"mat-form-field",10),t.TgZ(51,"mat-label",11),t._uU(52,"No. of Shares "),t._UZ(53,"span",12),t.qZA(),t._UZ(54,"input",22),t.qZA(),t.qZA(),t.TgZ(55,"div",9),t.TgZ(56,"mat-form-field",10),t.TgZ(57,"mat-label",11),t._uU(58,"Selling Price(ZAR) "),t._UZ(59,"span",12),t.qZA(),t._UZ(60,"input",23),t.qZA(),t._uU(61," Note:- 2.5% listing fee will be charged on selling price "),t.qZA(),t.qZA(),t.TgZ(62,"div",24),t.TgZ(63,"button",25),t._uU(64," Cancel "),t.qZA(),t.TgZ(65,"button",26),t.NdJ("click",function(){return n.addData()}),t.YNc(66,at,2,0,"span",27),t.YNc(67,rt,1,2,"mat-progress-spinner",28),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e){const o=t.MAs(36),r=t.MAs(47);t.xp6(6),t.Q6J("formGroup",n.form),t.xp6(3),t.Q6J("ngIf",n.form.value.property_id),t.xp6(3),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","property_id"),t.xp6(1),t.Q6J("ngForOf",n.propertyList$),t.xp6(2),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","group_id"),t.xp6(1),t.Q6J("ngForOf",n.communityList$),t.xp6(7),t.Q6J("matDatepicker",o),t.xp6(3),t.Q6J("for",o),t.xp6(8),t.Q6J("matDatepicker",r),t.xp6(3),t.Q6J("for",r),t.xp6(5),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","noofsharetoAuction"),t.xp6(2),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","sellingPrice"),t.xp6(5),t.Q6J("color","primary"),t.xp6(1),t.Q6J("ngIf",!n.loading),t.xp6(1),t.Q6J("ngIf",n.loading)}},directives:[l._Y,l.JL,l.sg,m.O5,c.KE,c.hX,T.gD,l.JJ,l.u,m.sg,v.Nt,l.Fj,u.hl,c.bx,u.nW,u.Mq,l.wV,Z.lW,d.rH,C.ey],styles:[""]}),i})()},{path:"edit-auction-content/:id",component:(()=>{class i{constructor(e,n,o,r,p){this._formBuilder=e,this._router=n,this._commonService=o,this._auctionService=r,this._activatedRoute=p,this.loading=!1,this.propertyList$=[{text:"Yearly",value:"Yearly"},{text:"Quaterly",value:"Quaterly"},{text:"halfyearly",value:"halfyearly"}],this.communityList$=[],this._activatedRoute.params.subscribe(_=>{this.auctionId=_.id}),this.userID=JSON.parse(localStorage.getItem("user")).id}ngOnInit(){this.form=this._formBuilder.group({property_id:[null,[l.kI.required]],group_id:[null,[l.kI.required]],startdate:[null,[l.kI.required]],enddate:[null,[l.kI.required]],sellingPrice:[null,[l.kI.required]],noofsharetoAuction:[null,[l.kI.required]]}),this.getCommunities(),this.getProperties()}getCommunities(){this._commonService.getCommunityList({searcString:"test"}).subscribe(e=>{this.communityList$=e?[...e]:[]},e=>{})}getProperties(){this._commonService.getPropertyList({}).subscribe(e=>{this.propertyList$=e?[...e]:[],this.fetchContent()},e=>{})}getDetailOnSelect(e){this.propertyDetails={},this.propertyList$.filter(n=>{n.id==e&&(this.propertyDetails=Object.assign({},n),this.form.patchValue({group_id:n.groupcriteriaId}))})}editData(){if(this.loading=!0,!this.form.invalid)return Date.parse(this.form.value.startdate)<=Date.parse(this.form.value.endadate)?(this.loading=!1,this._commonService.error("End Date should be greater than start date"),void(this.loading=!1)):Number(this.form.value.noofsharetoAuction)>Number(this.propertyDetails.totalnumberShareavailable)?(this._commonService.error("Number of shares cannot be greater than total number of available shares"),void(this.loading=!1)):void this._auctionService.editAuction(Object.assign(Object.assign({},this.form.value),{admin_status:"true",noofsharetoAuction:this.form.value.noofsharetoAuction.toString(),sellingPrice:this.form.value.sellingPrice.toString(),user_id:this.userID}),this.auctionId).subscribe(e=>{this.loading=!1,this._router.navigate(["/auction-calendar/list"])},e=>{this.loading=!1,this._commonService.error(e.error.message)});this.loading=!1}fetchContent(){this._auctionService.getDetails(this.auctionId).subscribe(e=>{this.patchValuestOfForm(e[0])},e=>{this._commonService.error(e.error.message)})}patchValuestOfForm(e){Object.keys(this.form.controls).forEach(n=>{this.form.controls[n].setValue(e[n]?e[n]:"")}),this.getDetailOnSelect(this.form.value.property_id)}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(l.qu),t.Y36(d.F0),t.Y36(A.v),t.Y36(x),t.Y36(d.gz))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-edit-auction-calender"]],decls:68,vars:19,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-6","sm:p-2"],[1,"px-3","m-auto"],[1,"prose","prose-sm","max-w-3xl"],[1,"text-4xl","font-semibold","tracking-tight","leading-8"],[1,"flex","flex-col","mt-4","px-8","pt-10","bg-card","shadow","rounded","overflow-hidden","justify-center","items-center",3,"formGroup","submit"],[1,"text-3xl","tracking-tight","text-left","leading-8","pb-4"],["class","grid sm:grid-cols-1 md:grid-cols-1 gap-6 w-full min-w-0 pb-4",4,"ngIf"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0"],[1,"flex","flex-col","gt-xs:flex-row"],[1,"flex-auto","gt-xs:pr-3",3,"floatLabel"],[1,"text-header","font-bold"],[1,"text-warn"],["placeholder","Select property",3,"formControlName","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Select community",3,"formControlName"],[1,"w-full"],["matInput","","formControlName","startdate",3,"matDatepicker"],["matIconSuffix","",3,"for"],["picker2",""],["matInput","","formControlName","enddate",3,"matDatepicker"],["picker1",""],["matInput","","placeholder","No. of shares","type","number",3,"formControlName"],["matInput","","placeholder","Selling Price","type","number",3,"formControlName"],[1,"flex","items-center","justify-end","border-t","-mx-8","mt-8","px-8","py-5","bg-gray-50","dark:bg-gray-700"],["routerLink","/auction-calendar/list","mat-button",""],["mat-flat-button","",1,"px-6","ml-3","bg-theme",3,"color","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"grid","sm:grid-cols-1","md:grid-cols-1","gap-6","w-full","min-w-0","pb-4"],[1,"flex","flex-col","gt-xs:flex-row","text-2xl","text-center"],[3,"value"],[3,"diameter","mode"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"h2",4),t._uU(5," Auction Property "),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.NdJ("submit",function(){return n.editData}),t.TgZ(7,"h2",6),t._uU(8," Auction Details "),t.qZA(),t.YNc(9,st,3,1,"div",7),t.TgZ(10,"div",8),t.TgZ(11,"div",9),t.TgZ(12,"mat-form-field",10),t.TgZ(13,"mat-label",11),t._uU(14," Property"),t._UZ(15,"span",12),t.qZA(),t.TgZ(16,"mat-select",13),t.NdJ("selectionChange",function(r){return n.getDetailOnSelect(r.value)}),t.YNc(17,ut,2,2,"mat-option",14),t.qZA(),t.qZA(),t.qZA(),t.TgZ(18,"div",9),t.TgZ(19,"mat-form-field",10),t.TgZ(20,"mat-label",11),t._uU(21," Community"),t._UZ(22,"span",12),t.qZA(),t.TgZ(23,"mat-select",15),t.YNc(24,ct,2,2,"mat-option",14),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(25,"div",8),t.TgZ(26,"div",9),t.TgZ(27,"mat-form-field",16),t.TgZ(28,"mat-label",11),t._uU(29," Auction start date"),t._UZ(30,"span",12),t.qZA(),t._UZ(31,"input",17),t.TgZ(32,"mat-hint"),t._uU(33,"MM/DD/YYYY"),t.qZA(),t._UZ(34,"mat-datepicker-toggle",18),t._UZ(35,"mat-datepicker",null,19),t.qZA(),t.qZA(),t.TgZ(37,"div",9),t.TgZ(38,"mat-form-field",16),t.TgZ(39,"mat-label",11),t._uU(40," Auction end date"),t._UZ(41,"span",12),t.qZA(),t._UZ(42,"input",20),t.TgZ(43,"mat-hint"),t._uU(44,"MM/DD/YYYY"),t.qZA(),t._UZ(45,"mat-datepicker-toggle",18),t._UZ(46,"mat-datepicker",null,21),t.qZA(),t.qZA(),t.qZA(),t.TgZ(48,"div",8),t.TgZ(49,"div",9),t.TgZ(50,"mat-form-field",10),t.TgZ(51,"mat-label",11),t._uU(52,"No. of Shares "),t._UZ(53,"span",12),t.qZA(),t._UZ(54,"input",22),t.qZA(),t.qZA(),t.TgZ(55,"div",9),t.TgZ(56,"mat-form-field",10),t.TgZ(57,"mat-label",11),t._uU(58,"Selling Price(ZAR) "),t._UZ(59,"span",12),t.qZA(),t._UZ(60,"input",23),t.qZA(),t._uU(61," Note:- 2.5% listing fee will be charged on selling price "),t.qZA(),t.qZA(),t.TgZ(62,"div",24),t.TgZ(63,"button",25),t._uU(64," Cancel "),t.qZA(),t.TgZ(65,"button",26),t.NdJ("click",function(){return n.editData()}),t.YNc(66,mt,2,0,"span",27),t.YNc(67,pt,1,2,"mat-progress-spinner",28),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e){const o=t.MAs(36),r=t.MAs(47);t.xp6(6),t.Q6J("formGroup",n.form),t.xp6(3),t.Q6J("ngIf",n.form.value.property_id),t.xp6(3),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","property_id"),t.xp6(1),t.Q6J("ngForOf",n.propertyList$),t.xp6(2),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","group_id"),t.xp6(1),t.Q6J("ngForOf",n.communityList$),t.xp6(7),t.Q6J("matDatepicker",o),t.xp6(3),t.Q6J("for",o),t.xp6(8),t.Q6J("matDatepicker",r),t.xp6(3),t.Q6J("for",r),t.xp6(5),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","noofsharetoAuction"),t.xp6(2),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","sellingPrice"),t.xp6(5),t.Q6J("color","primary"),t.xp6(1),t.Q6J("ngIf",!n.loading),t.xp6(1),t.Q6J("ngIf",n.loading)}},directives:[l._Y,l.JL,l.sg,m.O5,c.KE,c.hX,T.gD,l.JJ,l.u,m.sg,v.Nt,l.Fj,u.hl,c.bx,u.nW,u.Mq,l.wV,Z.lW,d.rH,C.ey],styles:[""]}),i})()}];let gt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[{provide:u.q_,useClass:u.LK}],imports:[[m.ez,d.Bz.forChild(dt),Z.ot,U.p9,c.lN,b.Ps,L.m,v.c,D.TU,N.Cv,J.AV,I.rP,T.LD,u.FA,C.XK]]}),i})()}}]);