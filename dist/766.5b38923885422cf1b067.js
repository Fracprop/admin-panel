"use strict";(self.webpackChunk_fracprop_panel=self.webpackChunk_fracprop_panel||[]).push([[766],{6766:(tt,f,n)=>{n.r(f),n.d(f,{PropertyBuyShareModule:()=>H});var g=n(8583),p=n(3423),v=n(1095),A=n(7539),d=n(8295),B=n(6627),y=n(9983),C=n(3935),x=n(9692),Z=n(2178),L=n(2458),P=n(1494),N=n(5396),b=n(1436),I=n(4466),U=n(1769),w=n(171),O=n(2613),j=n(7441),t=n(7716),u=n(2340),m=n(5917),c=n(3190),F=n(1841);let S=(()=>{class e{constructor(i){this._httpClient=i}getList(i){return this._httpClient.get(u.N.apiEndPoint+"fund-account/auctionListForAdmin/"+i.pageNo+"/"+i.limit,{}).pipe((0,c.w)(o=>(0,m.of)(o)))}getDetails(i){return this._httpClient.get(u.N.apiEndPoint+"fund-account/getAuction/"+i).pipe((0,c.w)(o=>(0,m.of)(o)))}buyShare(i){return this._httpClient.post(u.N.apiEndPoint+"user-bids/userBidForAdmin",Object.assign({},i)).pipe((0,c.w)(o=>(0,m.of)(o)))}}return e.\u0275fac=function(i){return new(i||e)(t.LFG(F.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var J=n(1400),l=n(3679),T=n(8351);function D(e,a){1&e&&(t.TgZ(0,"div",10),t._UZ(1,"mat-progress-bar",11),t.qZA()),2&e&&(t.xp6(1),t.Q6J("mode","indeterminate"))}function Y(e,a){if(1&e&&(t.ynx(0),t.TgZ(1,"div",17),t.TgZ(2,"div"),t._uU(3),t.qZA(),t.TgZ(4,"div",18),t._uU(5),t.qZA(),t.TgZ(6,"div",18),t._uU(7),t.qZA(),t.TgZ(8,"div",18),t._uU(9),t.qZA(),t.TgZ(10,"div",19),t.TgZ(11,"button",20),t._uU(12," Buy Share "),t.qZA(),t.qZA(),t.qZA(),t.BQk()),2&e){const i=a.$implicit,o=a.index,r=t.oxw(2);t.xp6(3),t.hij(" ",(null==r.pagination?null:r.pagination.PageNo)*(null==r.pagination?null:r.pagination.limit)+o+1," "),t.xp6(2),t.hij(" ",(null==i||null==i.property?null:i.property.property_name)||"-"," "),t.xp6(2),t.hij(" ",(null==i?null:i.noofsharetoAuction)||"-"," "),t.xp6(2),t.hij(" ",null==i?null:i.sellingPrice," "),t.xp6(2),t.MGl("routerLink","/buy-share/add-share/",null==i?null:i.id,"")}}const _=function(e){return{"pointer-events-none":e}},q=function(){return[5,10,25,100]};function Q(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"mat-paginator",21),t.NdJ("page",function(r){return t.CHM(i),t.oxw(2).pageChanged(r)}),t.qZA()}if(2&e){const i=t.oxw(2);t.Q6J("ngClass",t.VKq(6,_,i.isLoading))("length",i.pagination.TotalCount)("pageIndex",i.pagination.PageNo)("pageSize",i.pagination.LimitRecords)("pageSizeOptions",t.DdM(8,q))("showFirstLastButtons",!0)}}function z(e,a){if(1&e&&(t.ynx(0),t.ynx(1),t.TgZ(2,"div",12),t.TgZ(3,"div",13),t.TgZ(4,"div",14),t._uU(5,"S No."),t.qZA(),t.TgZ(6,"div",14),t._uU(7,"Property Name"),t.qZA(),t.TgZ(8,"div",14),t._uU(9,"No. of shares"),t.qZA(),t.TgZ(10,"div",14),t._uU(11,"Selling Price"),t.qZA(),t.TgZ(12,"div",14),t._uU(13,"Action"),t.qZA(),t.qZA(),t.ynx(14),t.YNc(15,Y,13,5,"ng-container",15),t.BQk(),t.qZA(),t.YNc(16,Q,1,9,"mat-paginator",16),t.BQk(),t.BQk()),2&e){const i=t.oxw();t.xp6(15),t.Q6J("ngForOf",i.bugShareList$),t.xp6(1),t.Q6J("ngIf",i.bugShareList$.length)}}function M(e,a){if(1&e&&(t.TgZ(0,"div",22),t._uU(1),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.hij(" ",i.isLoading?"Fetching Data":"There is no data!"," ")}}let R=(()=>{class e{constructor(i,o,r,s,h){this._buyService=i,this._changeDetectorRef=o,this._fuseConfirmationService=r,this._formBuilder=s,this._commonService=h,this.loading=!1,this.bugShareList$=[],this.isLoading1=!1,this.isLoading=!1,this.isBlocked=!1,this.pagination={limit:10,pageNo:0,TotalCount:0,PageNo:0},this.confirmationForm()}ngOnInit(){this.getListing()}getListing(){var i,o;let r={pageNo:null===(i=this.pagination)||void 0===i?void 0:i.pageNo,limit:null===(o=this.pagination)||void 0===o?void 0:o.limit};this.isLoading=!0,this._buyService.getList(Object.assign({},r)).subscribe(s=>{this.isLoading=!1,this.pagination.TotalCount=(null==s?void 0:s.auctionListForAdminTotal)||10,this.bugShareList$=s.auctionListForAdmin?[...s.auctionListForAdmin]:[],this._changeDetectorRef.detectChanges()},s=>{console.log(s),this._commonService.error(s.error.message),this.isLoading=!1})}pageChanged(i){var o,r,s;if((null==i?void 0:i.pageSize)!==(null===(o=this.pagination)||void 0===o?void 0:o.limit))return this.pagination.limit=null==i?void 0:i.pageSize,void this.resetPagination();this.pagination.limit=null==i?void 0:i.pageSize,this.pagination.PageNo=null==i?void 0:i.pageIndex,this.pagination.pageNo=(null===(r=this.pagination)||void 0===r?void 0:r.limit)*(null===(s=this.pagination)||void 0===s?void 0:s.PageNo),this.getListing()}resetPagination(){this.pagination={limit:this.pagination.limit,pageNo:0,TotalCount:0,PageNo:0},this.getListing()}confirmationForm(){this.confirmationDialog=this._formBuilder.group({title:"",message:"",icon:this._formBuilder.group({show:!0,name:"mat_outline:delete",color:"warn"}),actions:this._formBuilder.group({confirm:this._formBuilder.group({show:!0,label:"Yes",color:"warn"}),cancel:this._formBuilder.group({show:!0,label:"No"})}),dismissible:!0})}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(S),t.Y36(t.sBO),t.Y36(J.R),t.Y36(l.qu),t.Y36(T.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-buy-share-property-list"]],decls:13,vars:3,consts:[[1,"sm:absolute","sm:inset-0","flex","flex-col","flex-auto","min-w-0","sm:overflow-hidden","bg-card","dark:bg-transparent"],[1,"relative","flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","py-4","px-6","md:px-4"],["class","absolute inset-x-0 top-0",4,"ngIf"],[1,"flex","items-start","justify-between","w-full"],[1,"text-3xl","font-bold","tracking-tight","leading-8","text-theme"],[1,"mr-4","flex","justify-end","pb-2"],[1,"flex","flex-auto","overflow-hidden"],[1,"flex","flex-col","flex-auto","sm:mb-18","overflow-hidden","sm:overflow-y-auto"],[4,"ngIf","ngIfElse"],["noAdmin",""],[1,"absolute","inset-x-0","top-0"],[3,"mode"],[1,"grid","table_tr_bg"],[1,"blogs-grid","z-10","text-lg","sticky","top-0","grid","gap-4","py-4","px-6","md:px-8","shadow","font-semibold",2,"background-color","#ecf1f2"],[1,"hidden","md:block"],[4,"ngFor","ngForOf"],["class","sm:absolute sm:inset-x-0 sm:bottom-0 border-b sm:border-t sm:border-b-0 z-10 bg-gray-50 dark:bg-transparent justify-center text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page",4,"ngIf"],[1,"blogs-grid","font-medium","grid","items-center","gap-4","py-3","px-6","md:px-8","border-b-2","border-gray-300"],[1,""],[1,"flex","justify-start"],["matTooltip","Buy Share",1,"min-w-10","min-h-7","h-7","px-2","ml-1","bg-green-600","rounded-2xl",3,"routerLink"],[1,"sm:absolute","sm:inset-x-0","sm:bottom-0","border-b","sm:border-t","sm:border-b-0","z-10","bg-gray-50","dark:bg-transparent","justify-center","text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page"],[1,"p-8","sm:p-16","border-t","text-4xl","font-semibold","tracking-tight","text-center"]],template:function(i,o){if(1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.YNc(2,D,2,1,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div"),t.TgZ(5,"h2",4),t._uU(6," Properties "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t._UZ(7,"div",5),t.TgZ(8,"div",6),t.TgZ(9,"div",7),t.YNc(10,z,17,2,"ng-container",8),t.YNc(11,M,2,1,"ng-template",null,9,t.W1O),t.qZA(),t.qZA(),t.qZA()),2&i){const r=t.MAs(12);t.xp6(2),t.Q6J("ngIf",o.isLoading),t.xp6(8),t.Q6J("ngIf",o.bugShareList$.length)("ngIfElse",r)}},directives:[g.O5,Z.pW,g.sg,b.gM,p.rH,x.NW,g.mk],styles:["",".blogs-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto auto auto}@media (min-width: 600px){.blogs-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto auto auto}}@media (min-width: 960px){.blogs-grid[_ngcontent-%COMP%]{grid-template-columns:200px 250px 250px 250px 250px}}@media (min-width: 1280px){.blogs-grid[_ngcontent-%COMP%]{grid-template-columns:200px 250px 250px 250px 250px}}"]}),e})();var $=n(7495),E=n(4885);function G(e,a){1&e&&t._UZ(0,"div",21)}function V(e,a){1&e&&(t.TgZ(0,"span"),t._uU(1," Save"),t.qZA())}function W(e,a){1&e&&t._UZ(0,"mat-progress-spinner",22),2&e&&t.Q6J("diameter",24)("mode","indeterminate")}const X=[{path:"list",component:R},{path:"add-share/:id",component:(()=>{class e{constructor(i,o,r,s,h,K){this._formBuilder=i,this._router=o,this._commonService=r,this._buyShareService=s,this._userService=h,this._activatedRoute=K,this.loading=!1,this.images=[],this.videos=[],this.propertyList$=[],this.propertyDetails={},this._activatedRoute.params.subscribe(k=>{this.id=k.id})}ngOnInit(){this.form=this._formBuilder.group({property_id:[null,[l.kI.required]],amount:[null,[l.kI.required]]}),this.getProperties(),this.userId=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).id:void 0}getProperties(){this._buyShareService.getDetails(this.id).subscribe(i=>{this.propertyDetails=Object.assign({},i[0]),this.form.patchValue({property_id:this.propertyDetails.property_id})},i=>{this._commonService.error(i.error.message)})}getDetailOnSelect(i){this.propertyDetails={},this.propertyList$.filter(o=>{o.id==i&&(this.propertyDetails=Object.assign({},o),console.log(o))})}add(){this.loading=!0,console.log(this.form),this.form.invalid?this.loading=!1:this._buyShareService.buyShare(Object.assign(Object.assign({},this.form.value),{user_id:this.userId,amount:this.form.value.amount.toString(),auction_id:this.id})).subscribe(i=>{this.loading=!1,this._router.navigate(["/buy-share/list"])},i=>{this.loading=!1,this._commonService.error(i.error.message)})}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(l.qu),t.Y36(p.F0),t.Y36(T.v),t.Y36(S),t.Y36($.K),t.Y36(p.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-buy-share"]],decls:31,vars:10,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-6","sm:p-2"],[1,"px-3","m-auto"],[1,"prose","prose-sm","max-w-3xl"],[1,"text-4xl","font-semibold","tracking-tight","leading-8"],[1,"flex","flex-col","mt-4","px-8","pt-10","bg-card","shadow","rounded","overflow-hidden","justify-center","items-center",3,"formGroup","submit"],[1,"text-3xl","tracking-tight","text-left","leading-8","pb-4"],["class","grid sm:grid-cols-1 md:grid-cols-1 gap-6 w-full min-w-0 pb-4",4,"ngIf"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0"],[1,"flex","flex-col","gt-xs:flex-row","text-xl"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0","pt-4"],[1,"flex","flex-col","gt-xs:flex-row"],[1,"flex-auto","gt-xs:pr-3",3,"floatLabel"],[1,"text-header","font-bold"],[1,"text-warn"],["matInput","","placeholder","Amount","type","number",3,"formControlName"],[1,"flex","items-center","justify-end","border-t","-mx-8","mt-8","px-8","py-5","bg-gray-50","dark:bg-gray-700"],["routerLink","/auction-calendar/list","mat-button",""],["mat-flat-button","",1,"px-6","ml-3","bg-theme",3,"color","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"grid","sm:grid-cols-1","md:grid-cols-1","gap-6","w-full","min-w-0","pb-4"],[3,"diameter","mode"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"h2",4),t._uU(5," Buy Share "),t.qZA(),t.qZA(),t.TgZ(6,"form",5),t.NdJ("submit",function(){return o.add}),t.TgZ(7,"h2",6),t._uU(8," Details "),t.qZA(),t.YNc(9,G,1,0,"div",7),t.TgZ(10,"div",8),t.TgZ(11,"div",9),t._uU(12),t.qZA(),t.qZA(),t.TgZ(13,"div",10),t.TgZ(14,"div",9),t._uU(15),t.qZA(),t.TgZ(16,"div",9),t._uU(17),t.qZA(),t.qZA(),t.TgZ(18,"div",10),t.TgZ(19,"div",11),t.TgZ(20,"mat-form-field",12),t.TgZ(21,"mat-label",13),t._uU(22,"Amount(ZAR) "),t._UZ(23,"span",14),t.qZA(),t._UZ(24,"input",15),t.qZA(),t.qZA(),t.qZA(),t.TgZ(25,"div",16),t.TgZ(26,"button",17),t._uU(27," Cancel "),t.qZA(),t.TgZ(28,"button",18),t.NdJ("click",function(){return o.add()}),t.YNc(29,V,2,0,"span",19),t.YNc(30,W,1,2,"mat-progress-spinner",20),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&i&&(t.xp6(6),t.Q6J("formGroup",o.form),t.xp6(3),t.Q6J("ngIf",o.form.value.property_id),t.xp6(3),t.hij(" Property name: ",(null==o.propertyDetails||null==o.propertyDetails.property?null:o.propertyDetails.property.property_name)||"-"," "),t.xp6(3),t.hij(" No. of shares: ",(null==o.propertyDetails?null:o.propertyDetails.noofsharetoAuction)||"-"," "),t.xp6(2),t.hij(" Selling price: ",(null==o.propertyDetails?null:o.propertyDetails.sellingPrice)||"-"," "),t.xp6(3),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","amount"),t.xp6(4),t.Q6J("color","primary"),t.xp6(1),t.Q6J("ngIf",!o.loading),t.xp6(1),t.Q6J("ngIf",o.loading))},directives:[l._Y,l.JL,l.sg,g.O5,d.KE,d.hX,y.Nt,l.wV,l.Fj,l.JJ,l.u,v.lW,p.rH,E.Ou],styles:[""]}),e})()}];let H=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[g.ez,p.Bz.forChild(X),v.ot,A.p9,d.lN,B.Ps,y.c,C.Tx,x.TU,Z.Cv,L.si,P.JX,j.LD,N.rP,w.To,b.AV,I.m,U.t,O.Fk]]}),e})()}}]);