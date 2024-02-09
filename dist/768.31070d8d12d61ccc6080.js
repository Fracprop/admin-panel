"use strict";(self.webpackChunk_fracprop_panel=self.webpackChunk_fracprop_panel||[]).push([[768],{5768:(_,u,a)=>{a.r(u),a.d(u,{BanksModule:()=>V});var d=a(8583),t=a(7716),f=a(2340),v=a(5917),x=a(3190),y=a(1841);let N=(()=>{class o{constructor(n){this._httpClient=n}getBanksList(n){return this._httpClient.get(f.N.apiEndPoint+"bank/getallBanks/"+n.pageNo+"/"+n.limit,{}).pipe((0,x.w)(i=>(0,v.of)(i)))}addBank(n){return this._httpClient.post(f.N.apiEndPoint+"bank",Object.assign({},n)).pipe((0,x.w)(i=>(0,v.of)(i)))}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(y.eN))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var g=a(1095),m=a(3423),h=a(1436),Z=a(6627),b=a(2178),k=a(9692);function U(o,e){1&o&&(t.TgZ(0,"div",13),t._UZ(1,"mat-progress-bar",14),t.qZA()),2&o&&(t.xp6(1),t.Q6J("mode","indeterminate"))}function I(o,e){if(1&o&&(t.ynx(0),t.TgZ(1,"div",20),t.TgZ(2,"div"),t._uU(3),t.qZA(),t.TgZ(4,"div",21),t._uU(5),t.qZA(),t._UZ(6,"div",22),t.qZA(),t.BQk()),2&o){const n=e.$implicit,i=e.index,s=t.oxw(2);t.xp6(3),t.hij(" ",(null==s.pagination?null:s.pagination.PageNo)*(null==s.pagination?null:s.pagination.limit)+i+1," "),t.xp6(2),t.hij(" ",(null==n?null:n.name)||"-"," ")}}const J=function(o){return{"pointer-events-none":o}},L=function(){return[5,10,25,100]};function Q(o,e){if(1&o){const n=t.EpF();t.TgZ(0,"mat-paginator",23),t.NdJ("page",function(s){return t.CHM(n),t.oxw(2).pageChanged(s)}),t.qZA()}if(2&o){const n=t.oxw(2);t.Q6J("ngClass",t.VKq(6,J,n.isLoading))("length",n.pagination.TotalCount)("pageIndex",n.pagination.PageNo)("pageSize",n.pagination.LimitRecords)("pageSizeOptions",t.DdM(8,L))("showFirstLastButtons",!0)}}function F(o,e){if(1&o&&(t.ynx(0),t.ynx(1),t.TgZ(2,"div",15),t.TgZ(3,"div",16),t.TgZ(4,"div",17),t._uU(5,"S No."),t.qZA(),t.TgZ(6,"div",17),t._uU(7,"Name"),t.qZA(),t.TgZ(8,"div",17),t._uU(9,"Action"),t.qZA(),t.qZA(),t.ynx(10),t.YNc(11,I,7,2,"ng-container",18),t.BQk(),t.qZA(),t.YNc(12,Q,1,9,"mat-paginator",19),t.BQk(),t.BQk()),2&o){const n=t.oxw();t.xp6(11),t.Q6J("ngForOf",n.banks$),t.xp6(1),t.Q6J("ngIf",n.banks$.length)}}function O(o,e){if(1&o&&(t.TgZ(0,"div",24),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.hij(" ",n.isLoading?"Fetching Banks":"There are no banks!"," ")}}let P=(()=>{class o{constructor(n,i){this._bankService=n,this._changeDetectorRef=i,this.loading=!1,this.banks$=[],this.isLoading1=!1,this.isLoading=!1,this.isBlocked=!1,this.pagination={limit:5,pageNo:0,TotalCount:0,PageNo:0}}ngOnInit(){this.getBanks()}getBanks(){var n,i;let s={pageNo:null===(n=this.pagination)||void 0===n?void 0:n.pageNo,limit:null===(i=this.pagination)||void 0===i?void 0:i.limit};this.isLoading=!0,this._bankService.getBanksList(Object.assign({},s)).subscribe(l=>{this.isLoading=!1,this.pagination.TotalCount=null==l?void 0:l.totalCount,this.banks$=(null==l?void 0:l.banks)?[...null==l?void 0:l.banks]:[],this._changeDetectorRef.detectChanges()},l=>{this.isLoading=!1})}pageChanged(n){var i,s,l;if((null==n?void 0:n.pageSize)!==(null===(i=this.pagination)||void 0===i?void 0:i.limit))return this.pagination.limit=null==n?void 0:n.pageSize,void this.resetPagination();this.pagination.limit=null==n?void 0:n.pageSize,this.pagination.PageNo=null==n?void 0:n.pageIndex,this.pagination.pageNo=(null===(s=this.pagination)||void 0===s?void 0:s.limit)*(null===(l=this.pagination)||void 0===l?void 0:l.PageNo),this.getBanks()}resetPagination(){this.pagination={limit:this.pagination.limit,pageNo:0,TotalCount:0,PageNo:0},this.getBanks()}resetFilter(){this.form.reset(),this.pagination={limit:this.pagination.limit,pageNo:0,TotalCount:0,PageNo:0},this.getBanks()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(N),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-banks"]],decls:18,vars:7,consts:[[1,"sm:absolute","sm:inset-0","flex","flex-col","flex-auto","min-w-0","sm:overflow-hidden","bg-card","dark:bg-transparent"],[1,"relative","flex","flex-col","sm:flex-row","flex-0","sm:items-center","sm:justify-between","py-4","px-6","md:px-4"],["class","absolute inset-x-0 top-0",4,"ngIf"],[1,"flex","items-start","justify-between","w-full"],[1,"text-3xl","font-bold","tracking-tight","leading-8","text-theme"],[1,"mr-4","flex","justify-end"],["routerLink","/banks/add-bank","mat-flat-button","","type","button",1,"ml-4","bg-header","rounded-lg",3,"matTooltip","color"],[3,"svgIcon"],[1,"ml-2","mr-1"],[1,"flex","flex-auto","overflow-hidden","mt-2"],[1,"flex","flex-col","flex-auto","sm:mb-18","overflow-hidden","sm:overflow-y-auto"],[4,"ngIf","ngIfElse"],["noAdmin",""],[1,"absolute","inset-x-0","top-0"],[3,"mode"],[1,"grid","table_tr_bg"],[1,"bank-grid","z-10","text-lg","sticky","top-0","grid","gap-4","py-4","px-6","md:px-8","shadow","text-md","font-semibold",2,"background-color","#ecf1f2"],[1,"hidden","md:block"],[4,"ngFor","ngForOf"],["class","sm:absolute sm:inset-x-0 sm:bottom-0 border-b sm:border-t sm:border-b-0 z-10 bg-gray-50 dark:bg-transparent justify-center text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page",4,"ngIf"],[1,"bank-grid","font-medium","grid","items-center","gap-4","py-3","px-6","md:px-8","border-b-2","border-gray-300"],[1,""],[1,"flex","justify-start"],[1,"sm:absolute","sm:inset-x-0","sm:bottom-0","border-b","sm:border-t","sm:border-b-0","z-10","bg-gray-50","dark:bg-transparent","justify-center","text-header",3,"ngClass","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons","page"],[1,"p-8","sm:p-16","border-t","text-4xl","font-semibold","tracking-tight","text-center"]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.YNc(2,U,2,1,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div"),t.TgZ(5,"h2",4),t._uU(6," Banks "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"div",5),t.TgZ(8,"button",6),t._UZ(9,"mat-icon",7),t.TgZ(10,"span",8),t._uU(11,"Add Bank"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(12,"div",9),t.TgZ(13,"div",10),t.YNc(14,F,13,2,"ng-container",11),t._uU(15),t.YNc(16,O,2,1,"ng-template",null,12,t.W1O),t.qZA(),t.qZA(),t.qZA()),2&n){const s=t.MAs(17);t.xp6(2),t.Q6J("ngIf",i.isLoading),t.xp6(6),t.Q6J("matTooltip","Add Banks")("color","primary"),t.xp6(1),t.Q6J("svgIcon","heroicons_outline:plus"),t.xp6(5),t.Q6J("ngIf",i.banks$.length)("ngIfElse",s),t.xp6(1),t.hij(" ",i.pagination.LimitRecords," ")}},directives:[d.O5,g.lW,m.rH,h.gM,Z.Hw,b.pW,d.sg,k.NW,d.mk],styles:["",".bank-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto}@media (min-width: 600px){.bank-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto auto}}@media (min-width: 960px){.bank-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto}}@media (min-width: 1280px){.bank-grid[_ngcontent-%COMP%]{grid-template-columns:auto auto auto}}"]}),o})();var r=a(3679),T=a(8394),p=a(8295),B=a(9983),A=a(1769),c=a(4885);function S(o,e){1&o&&t._UZ(0,"mat-progress-spinner",20),2&o&&t.Q6J("diameter",24)("mode","indeterminate")}function w(o,e){if(1&o){const n=t.EpF();t.TgZ(0,"div",3),t.TgZ(1,"div",4),t.TgZ(2,"h2",5),t._uU(3," Add Bank "),t.qZA(),t.qZA(),t.TgZ(4,"form",6),t.NdJ("submit",function(){return t.CHM(n),t.oxw().submit()}),t.TgZ(5,"div",7),t.TgZ(6,"div",8),t.TgZ(7,"mat-form-field",9),t.TgZ(8,"mat-label",10),t._uU(9," Bank Name "),t._UZ(10,"span",11),t.qZA(),t._UZ(11,"input",12),t.qZA(),t.qZA(),t.TgZ(12,"div",13),t.TgZ(13,"mat-form-field",9),t.TgZ(14,"mat-label",10),t._uU(15,"Country"),t._UZ(16,"span",11),t.qZA(),t._UZ(17,"input",14),t.qZA(),t.qZA(),t.qZA(),t._UZ(18,"mat-divider",15),t.TgZ(19,"div",16),t.TgZ(20,"button",17),t._uU(21," Cancel "),t.qZA(),t.TgZ(22,"button",18),t.TgZ(23,"span"),t._uU(24," Save"),t.qZA(),t.YNc(25,S,1,2,"mat-progress-spinner",19),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&o){const n=t.oxw();t.xp6(4),t.Q6J("formGroup",n.form),t.xp6(3),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","name"),t.xp6(2),t.Q6J("floatLabel","always"),t.xp6(4),t.Q6J("formControlName","country"),t.xp6(5),t.Q6J("color","primary"),t.xp6(3),t.Q6J("ngIf",n.loading)}}let z=(()=>{class o{constructor(n){this._formBuilder=n,this.loading=!1}ngOnInit(){this.form=this._formBuilder.group({name:[null],country:[null]})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(r.qu))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-add-bank"]],decls:3,vars:0,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"flex-auto","p-6","sm:p-2"],["class","px-3 m-auto",4,"transloco"],[1,"px-3","m-auto"],[1,"prose","prose-sm","max-w-3xl"],[1,"text-4xl","font-semibold","tracking-tight","leading-8"],[1,"flex","flex-col","mt-4","px-8","pt-10","bg-card","shadow","rounded","overflow-hidden",3,"formGroup","submit"],[1,"grid","sm:grid-cols-2","md:grid-cols-2","gap-6","w-full","min-w-0"],[1,"w-full","flex"],[1,"flex-auto","gt-xs:pr-3",3,"floatLabel"],[1,"text-header","font-bold"],[1,"text-warn"],["matInput","","placeholder","Enter Bank Name",3,"formControlName"],[1,"flex","flex-col","gt-xs:flex-row"],["matInput","","placeholder","Enter Country",3,"formControlName"],[1,"mt-5","mb-5"],[1,"flex","items-center","justify-end","border-t","-mx-8","mt-8","px-8","py-5","bg-gray-50","dark:bg-gray-700"],["routerLink","/users/list","mat-button",""],["mat-flat-button","",1,"px-6","ml-3","bg-theme",3,"color"],[3,"diameter","mode",4,"ngIf"],[3,"diameter","mode"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.YNc(2,w,26,7,"div",2),t.qZA(),t.qZA())},directives:[T.KI,r._Y,r.JL,r.sg,p.KE,p.hX,B.Nt,r.Fj,r.JJ,r.u,A.d,g.lW,m.rH,d.O5,c.Ou],styles:[""]}),o})(),j=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-edit-bank"]],decls:2,vars:0,template:function(n,i){1&n&&(t.TgZ(0,"p"),t._uU(1,"edit-bank works!"),t.qZA())},styles:[""]}),o})();var M=a(7539),E=a(3935),C=a(2458),q=a(1494),Y=a(5396),X=a(4466),$=a(171),H=a(2613),K=a(7441),R=a(1099),W=a(2542),D=a(3220);const G=[{path:"list",component:P},{path:"add-bank",component:z},{path:"edit-bank/:id",component:j}];let V=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[d.ez,m.Bz.forChild(G),g.ot,M.p9,p.lN,c.Cq,Z.Ps,B.c,E.Tx,k.TU,b.Cv,C.si,q.JX,K.LD,Y.rP,$.To,h.AV,X.m,A.t,H.Fk,D.FA,C.XK,c.Cq,R.rK,W.vV,T.y4]]}),o})()}}]);