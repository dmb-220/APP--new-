(self.webpackChunk=self.webpackChunk||[]).push([[685],{62705:(t,e,o)=>{var a=o(55639).Symbol;t.exports=a},77412:t=>{t.exports=function(t,e){for(var o=-1,a=null==t?0:t.length;++o<a&&!1!==e(t[o],o,t););return t}},14636:(t,e,o)=>{var a=o(22545),n=o(35694),i=o(1469),r=o(44144),s=o(65776),l=o(36719),c=Object.prototype.hasOwnProperty;t.exports=function(t,e){var o=i(t),u=!o&&n(t),d=!o&&!u&&r(t),p=!o&&!u&&!d&&l(t),f=o||u||d||p,b=f?a(t.length,String):[],m=b.length;for(var v in t)!e&&!c.call(t,v)||f&&("length"==v||d&&("offset"==v||"parent"==v)||p&&("buffer"==v||"byteLength"==v||"byteOffset"==v)||s(v,m))||b.push(v);return b}},89881:(t,e,o)=>{var a=o(47816),n=o(99291)(a);t.exports=n},28483:(t,e,o)=>{var a=o(25063)();t.exports=a},47816:(t,e,o)=>{var a=o(28483),n=o(3674);t.exports=function(t,e){return t&&a(t,e,n)}},44239:(t,e,o)=>{var a=o(62705),n=o(89607),i=o(2333),r=a?a.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":r&&r in Object(t)?n(t):i(t)}},9454:(t,e,o)=>{var a=o(44239),n=o(37005);t.exports=function(t){return n(t)&&"[object Arguments]"==a(t)}},38749:(t,e,o)=>{var a=o(44239),n=o(41780),i=o(37005),r={};r["[object Float32Array]"]=r["[object Float64Array]"]=r["[object Int8Array]"]=r["[object Int16Array]"]=r["[object Int32Array]"]=r["[object Uint8Array]"]=r["[object Uint8ClampedArray]"]=r["[object Uint16Array]"]=r["[object Uint32Array]"]=!0,r["[object Arguments]"]=r["[object Array]"]=r["[object ArrayBuffer]"]=r["[object Boolean]"]=r["[object DataView]"]=r["[object Date]"]=r["[object Error]"]=r["[object Function]"]=r["[object Map]"]=r["[object Number]"]=r["[object Object]"]=r["[object RegExp]"]=r["[object Set]"]=r["[object String]"]=r["[object WeakMap]"]=!1,t.exports=function(t){return i(t)&&n(t.length)&&!!r[a(t)]}},280:(t,e,o)=>{var a=o(25726),n=o(86916),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!a(t))return n(t);var e=[];for(var o in Object(t))i.call(t,o)&&"constructor"!=o&&e.push(o);return e}},22545:t=>{t.exports=function(t,e){for(var o=-1,a=Array(t);++o<t;)a[o]=e(o);return a}},7518:t=>{t.exports=function(t){return function(e){return t(e)}}},54290:(t,e,o)=>{var a=o(6557);t.exports=function(t){return"function"==typeof t?t:a}},99291:(t,e,o)=>{var a=o(98612);t.exports=function(t,e){return function(o,n){if(null==o)return o;if(!a(o))return t(o,n);for(var i=o.length,r=e?i:-1,s=Object(o);(e?r--:++r<i)&&!1!==n(s[r],r,s););return o}}},25063:t=>{t.exports=function(t){return function(e,o,a){for(var n=-1,i=Object(e),r=a(e),s=r.length;s--;){var l=r[t?s:++n];if(!1===o(i[l],l,i))break}return e}}},31957:(t,e,o)=>{var a="object"==typeof o.g&&o.g&&o.g.Object===Object&&o.g;t.exports=a},89607:(t,e,o)=>{var a=o(62705),n=Object.prototype,i=n.hasOwnProperty,r=n.toString,s=a?a.toStringTag:void 0;t.exports=function(t){var e=i.call(t,s),o=t[s];try{t[s]=void 0;var a=!0}catch(t){}var n=r.call(t);return a&&(e?t[s]=o:delete t[s]),n}},65776:t=>{var e=/^(?:0|[1-9]\d*)$/;t.exports=function(t,o){var a=typeof t;return!!(o=null==o?9007199254740991:o)&&("number"==a||"symbol"!=a&&e.test(t))&&t>-1&&t%1==0&&t<o}},25726:t=>{var e=Object.prototype;t.exports=function(t){var o=t&&t.constructor;return t===("function"==typeof o&&o.prototype||e)}},86916:(t,e,o)=>{var a=o(5569)(Object.keys,Object);t.exports=a},31167:(t,e,o)=>{t=o.nmd(t);var a=o(31957),n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,r=i&&i.exports===n&&a.process,s=function(){try{var t=i&&i.require&&i.require("util").types;return t||r&&r.binding&&r.binding("util")}catch(t){}}();t.exports=s},2333:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5569:t=>{t.exports=function(t,e){return function(o){return t(e(o))}}},55639:(t,e,o)=>{var a=o(31957),n="object"==typeof self&&self&&self.Object===Object&&self,i=a||n||Function("return this")();t.exports=i},66073:(t,e,o)=>{t.exports=o(84486)},84486:(t,e,o)=>{var a=o(77412),n=o(89881),i=o(54290),r=o(1469);t.exports=function(t,e){return(r(t)?a:n)(t,i(e))}},6557:t=>{t.exports=function(t){return t}},35694:(t,e,o)=>{var a=o(9454),n=o(37005),i=Object.prototype,r=i.hasOwnProperty,s=i.propertyIsEnumerable,l=a(function(){return arguments}())?a:function(t){return n(t)&&r.call(t,"callee")&&!s.call(t,"callee")};t.exports=l},1469:t=>{var e=Array.isArray;t.exports=e},98612:(t,e,o)=>{var a=o(23560),n=o(41780);t.exports=function(t){return null!=t&&n(t.length)&&!a(t)}},44144:(t,e,o)=>{t=o.nmd(t);var a=o(55639),n=o(95062),i=e&&!e.nodeType&&e,r=i&&t&&!t.nodeType&&t,s=r&&r.exports===i?a.Buffer:void 0,l=(s?s.isBuffer:void 0)||n;t.exports=l},23560:(t,e,o)=>{var a=o(44239),n=o(13218);t.exports=function(t){if(!n(t))return!1;var e=a(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},41780:t=>{t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},13218:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},37005:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},36719:(t,e,o)=>{var a=o(38749),n=o(7518),i=o(31167),r=i&&i.isTypedArray,s=r?n(r):a;t.exports=s},3674:(t,e,o)=>{var a=o(14636),n=o(280),i=o(98612);t.exports=function(t){return i(t)?a(t):n(t)}},95062:t=>{t.exports=function(){return!1}},92346:(t,e,o)=>{"use strict";o.d(e,{Z:()=>r});var a=o(66073),n=o.n(a);const i={name:"FilePickerPost",props:{label:{type:String,default:"CSV failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null},postSubject:{type:String,default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(t){var e=this;this.errors={};var o=new FormData;o.append("file",this.file),this.isUploadSuccess=!1,axios.post(this.postSubject,o,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(t){e.isUploadSuccess=!0,e.$emit("file-updated",t.data.data),e.$emit("file-id-updated",t.data.data.id)})).catch((function(t){e.file=null,e.uploadPercent=0,t.response.data.errors?e.errors=t.response.data.errors:e.errors={_all:["Upload error"]},n()(e.errors,(function(t){e.$buefy.toast.open({message:t[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(t){this.uploadPercent=Math.round(100*t.loaded/t.total)}}};const r=(0,o(51900).Z)(i,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("b-field",{attrs:{label:t.label,message:t.fieldFileMessage,type:t.fieldFileType}},[o("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:t.upload},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}},[o("section",{staticClass:"section"},[o("div",{staticClass:"content has-text-centered"},[o("p",[o("b-icon",{attrs:{icon:t.uploadButtonIcon,size:"is-large"}})],1),t._v(" "),t.uploadButtonText?o("p",[t._v(t._s(t.uploadButtonText))]):t._e()])])]),t._v(" "),t.fileName?o("div",{staticClass:"control"},[o("span",{attrs:{title:t.fileName}},[t._v(t._s(t.fileName)+" ")])]):t._e()],1)}),[],!1,null,null,null).exports},65133:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>r});var a=o(87286),n=o(92346);const i={name:"Works",components:{CardComponent:a.Z,FilePickerPost:n.Z},data:function(){return{works:[],nuo:new Date,iki:new Date,isLoading:!1,isFullPage:!0,labelPosition:"on-border",defaultOpenedDetails:[1],showDetailIcon:!1,isNarrowed:!0,mobile_card:!0,ModalActive:!1,modal_sand:"",modal_error:"",file_works:null,failas_works:""}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{modal_store:function(){var t=this;this.modal_suma&&this.modal_nuo&&this.modal_iki?(this.modal_error="",this.ModalActive=!1,this.isLoading=!0,axios.post("/works/store_modal",{modal_suma:this.modal_suma,modal_nuo:this.modal_nuo,modal_iki:this.modal_iki}).then((function(e){console.log(e.data),t.modal_suma="",t.modal_nuo="",t.modal_iki="",t.getData()})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))):this.modal_error="Užpildykite duomenis!"},add:function(t){this.ModalActive=!0,this.modal_sand=t},onClose:function(){this.modal_sand="",this.modal_suma="",this.modal_nuo="",this.modal_iki=""},onCloseError:function(){this.modal_error="",console.log("Isvalyta klaida")},file_info_works:function(t){this.failas_works=t.name},print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/works").then((function(e){t.isLoading=!1,t.works=e.data.works,t.nuo=new Date(Date.parse(e.data.nuo_iki.nuo)),t.iki=new Date(Date.parse(e.data.nuo_iki.iki))})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))},suformuoti:function(){var t=this;this.isLoading=!0,axios.post("/works/store",{file_works:this.failas_works,nuo:this.nuo,iki:this.iki}).then((function(e){console.log(e.data.data),t.getData(),t.$buefy.toast.open({message:"Duomenys atnaujinti!",type:"is-info"})})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const r=(0,o(51900).Z)(i,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"section is-main-section"},[o("b-modal",{on:{close:t.onClose},model:{value:t.ModalActive,callback:function(e){t.ModalActive=e},expression:"ModalActive"}},[o("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[o("header",{staticClass:"modal-card-head"},[o("p",{staticClass:"modal-card-title"},[t._v("Naujas įrašas")])]),t._v(" "),o("section",{staticClass:"modal-card-body"},[o("b-notification",{directives:[{name:"show",rawName:"v-show",value:t.modal_error,expression:"modal_error"}],attrs:{type:"is-danger",role:"alert"},on:{close:t.onCloseError}},[t._v("\n          "+t._s(t.modal_error)+"\n        ")]),t._v(" "),o("p",{staticClass:"is-size-5"},[t._v("Parduotuvė: "+t._s(t.modal_sand))]),t._v(" "),o("hr"),t._v(" "),o("b-field",{attrs:{grouped:""}},[o("b-field",{attrs:{label:"NUO, (2021-01-01)","label-position":t.labelPosition,expanded:""}},[o("b-input",{attrs:{icon:"calendar-today"},model:{value:t.modal_nuo,callback:function(e){t.modal_nuo=e},expression:"modal_nuo"}})],1),t._v(" "),o("b-field",{attrs:{label:"IKI, (2022-12-31)","label-position":t.labelPosition,expanded:""}},[o("b-input",{attrs:{icon:"calendar-today"},model:{value:t.modal_iki,callback:function(e){t.modal_iki=e},expression:"modal_iki"}})],1)],1),t._v(" "),o("b-field",{attrs:{label:"Suma","label-position":t.labelPosition,expanded:""}},[o("b-input",{attrs:{icon:"currency-eur"},model:{value:t.modal_suma,callback:function(e){t.modal_suma=e},expression:"modal_suma"}})],1)],1),t._v(" "),o("footer",{staticClass:"modal-card-foot"},[o("b-button",{attrs:{label:"Išsaugoti"},on:{click:function(e){return t.modal_store()}}})],1)])]),t._v(" "),o("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),o("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[o("file-picker-post",{attrs:{"post-subject":"/works/store_works",label:"Pardavimo sąrašas, CSV"},on:{"file-updated":t.file_info_works},model:{value:t.file_works,callback:function(e){t.file_works=e},expression:"file_works"}}),t._v(" "),o("p",{staticClass:"is-size-7"},[t._v("\n          CSV failas gaunamas: Ataskaitos -> Pirkimų / Pardavimų ataskaitos -> Pardavimų sąrašas"),o("br"),t._v("\n          Filtras: data NUO - IKI\n        ")]),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"columns"},[o("div",{staticClass:"column"},[o("b-datepicker",{attrs:{placeholder:"Pasirinkite data NUO",icon:"calendar-today",editable:""},model:{value:t.nuo,callback:function(e){t.nuo=e},expression:"nuo"}})],1),t._v(" "),o("div",{staticClass:"column"},[o("b-datepicker",{attrs:{placeholder:"Pasirinkite data IKI",icon:"calendar-today",editable:""},model:{value:t.iki,callback:function(e){t.iki=e},expression:"iki"}})],1)]),t._v(" "),o("p",{staticClass:"control"},[o("button",{staticClass:"button is-dark",on:{click:t.suformuoti}},[t._v("Skaičiuoti")])])],1),t._v(" "),o("card-component",{attrs:{title:"Darbo apskaita",icon:"account-multiple"}},[o("p",{staticClass:"has-text-centered is-size-4 has-text-weight-semibold"},[t._v("\n      "+t._s(t.nuo.toLocaleDateString("en-CA"))+" - "+t._s(t.iki.toLocaleDateString("en-CA"))+"\n    ")]),t._v(" "),o("div",{attrs:{id:"printMe"}},[o("b-table",{attrs:{bordered:"",data:t.works,loading:t.isLoading}},[o("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(e.row.sandelis))])]}}])}),t._v(" "),o("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("b-table",{attrs:{data:e.row.pardavejos}},[o("b-table-column",{attrs:{label:"Pardaveja",width:"300",field:"pardaveja"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n                  "+t._s(e.row.pardaveja)+" \n              ")]}}],null,!0)}),t._v(" "),o("b-table-column",{attrs:{label:"Apyvarta",field:"suma"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n                  "+t._s(e.row.suma.toFixed(2))+" € \n              ")]}}],null,!0)}),t._v(" "),o("b-table-column",{attrs:{label:"Grazinimai",field:"graza"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.graza?o("div",[t._v(t._s(e.row.graza.toFixed(2))+" €")]):o("div",[t._v("0 €")])]}}],null,!0)})],1)]}}])}),t._v(" "),o("b-table-column",{attrs:{label:"Inv. trukumai"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("p",{staticClass:"is-size-7"},[t._v("2021-10-16 - 2022-05-21: 1678 €")]),t._v(" "),o("p",{staticClass:"is-size-7"},[t._v("2021-10-16 - 2022-05-21: 1678 €")])]}}])}),t._v(" "),o("b-table-column",{staticClass:"is-actions-cell",attrs:{"custom-key":"actions"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticClass:"buttons"},[o("button",{staticClass:"button is-info",attrs:{type:"button"},on:{click:function(o){return t.add(e.row.sandelis)}}},[o("b-icon",{attrs:{icon:"calendar-check"}})],1),t._v(" "),o("button",{staticClass:"button is-primary",attrs:{type:"button"}},[o("b-icon",{attrs:{icon:"account-edit"}})],1)])]}}])}),t._v(" "),o("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[o("div",{staticClass:"content has-text-centered"},[t.isLoading?[o("p",[o("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),o("p",[t._v("Gaunami duomenys...")])]:[o("p",[o("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),o("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"buttons"},[o("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")])],1)])],1)}),[],!1,null,null,null).exports}}]);