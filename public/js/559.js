(self.webpackChunk=self.webpackChunk||[]).push([[559],{62705:(e,t,a)=>{var n=a(55639).Symbol;e.exports=n},77412:e=>{e.exports=function(e,t){for(var a=-1,n=null==e?0:e.length;++a<n&&!1!==t(e[a],a,e););return e}},14636:(e,t,a)=>{var n=a(22545),r=a(35694),i=a(1469),s=a(44144),o=a(65776),l=a(36719),u=Object.prototype.hasOwnProperty;e.exports=function(e,t){var a=i(e),c=!a&&r(e),d=!a&&!c&&s(e),f=!a&&!c&&!d&&l(e),p=a||c||d||f,b=p?n(e.length,String):[],m=b.length;for(var v in e)!t&&!u.call(e,v)||p&&("length"==v||d&&("offset"==v||"parent"==v)||f&&("buffer"==v||"byteLength"==v||"byteOffset"==v)||o(v,m))||b.push(v);return b}},89881:(e,t,a)=>{var n=a(47816),r=a(99291)(n);e.exports=r},28483:(e,t,a)=>{var n=a(25063)();e.exports=n},47816:(e,t,a)=>{var n=a(28483),r=a(3674);e.exports=function(e,t){return e&&n(e,t,r)}},44239:(e,t,a)=>{var n=a(62705),r=a(89607),i=a(2333),s=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":s&&s in Object(e)?r(e):i(e)}},9454:(e,t,a)=>{var n=a(44239),r=a(37005);e.exports=function(e){return r(e)&&"[object Arguments]"==n(e)}},38749:(e,t,a)=>{var n=a(44239),r=a(41780),i=a(37005),s={};s["[object Float32Array]"]=s["[object Float64Array]"]=s["[object Int8Array]"]=s["[object Int16Array]"]=s["[object Int32Array]"]=s["[object Uint8Array]"]=s["[object Uint8ClampedArray]"]=s["[object Uint16Array]"]=s["[object Uint32Array]"]=!0,s["[object Arguments]"]=s["[object Array]"]=s["[object ArrayBuffer]"]=s["[object Boolean]"]=s["[object DataView]"]=s["[object Date]"]=s["[object Error]"]=s["[object Function]"]=s["[object Map]"]=s["[object Number]"]=s["[object Object]"]=s["[object RegExp]"]=s["[object Set]"]=s["[object String]"]=s["[object WeakMap]"]=!1,e.exports=function(e){return i(e)&&r(e.length)&&!!s[n(e)]}},280:(e,t,a)=>{var n=a(25726),r=a(86916),i=Object.prototype.hasOwnProperty;e.exports=function(e){if(!n(e))return r(e);var t=[];for(var a in Object(e))i.call(e,a)&&"constructor"!=a&&t.push(a);return t}},22545:e=>{e.exports=function(e,t){for(var a=-1,n=Array(e);++a<e;)n[a]=t(a);return n}},7518:e=>{e.exports=function(e){return function(t){return e(t)}}},54290:(e,t,a)=>{var n=a(6557);e.exports=function(e){return"function"==typeof e?e:n}},99291:(e,t,a)=>{var n=a(98612);e.exports=function(e,t){return function(a,r){if(null==a)return a;if(!n(a))return e(a,r);for(var i=a.length,s=t?i:-1,o=Object(a);(t?s--:++s<i)&&!1!==r(o[s],s,o););return a}}},25063:e=>{e.exports=function(e){return function(t,a,n){for(var r=-1,i=Object(t),s=n(t),o=s.length;o--;){var l=s[e?o:++r];if(!1===a(i[l],l,i))break}return t}}},31957:(e,t,a)=>{var n="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=n},89607:(e,t,a)=>{var n=a(62705),r=Object.prototype,i=r.hasOwnProperty,s=r.toString,o=n?n.toStringTag:void 0;e.exports=function(e){var t=i.call(e,o),a=e[o];try{e[o]=void 0;var n=!0}catch(e){}var r=s.call(e);return n&&(t?e[o]=a:delete e[o]),r}},65776:e=>{var t=/^(?:0|[1-9]\d*)$/;e.exports=function(e,a){var n=typeof e;return!!(a=null==a?9007199254740991:a)&&("number"==n||"symbol"!=n&&t.test(e))&&e>-1&&e%1==0&&e<a}},25726:e=>{var t=Object.prototype;e.exports=function(e){var a=e&&e.constructor;return e===("function"==typeof a&&a.prototype||t)}},86916:(e,t,a)=>{var n=a(5569)(Object.keys,Object);e.exports=n},31167:(e,t,a)=>{e=a.nmd(e);var n=a(31957),r=t&&!t.nodeType&&t,i=r&&e&&!e.nodeType&&e,s=i&&i.exports===r&&n.process,o=function(){try{var e=i&&i.require&&i.require("util").types;return e||s&&s.binding&&s.binding("util")}catch(e){}}();e.exports=o},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5569:e=>{e.exports=function(e,t){return function(a){return e(t(a))}}},55639:(e,t,a)=>{var n=a(31957),r="object"==typeof self&&self&&self.Object===Object&&self,i=n||r||Function("return this")();e.exports=i},66073:(e,t,a)=>{e.exports=a(84486)},84486:(e,t,a)=>{var n=a(77412),r=a(89881),i=a(54290),s=a(1469);e.exports=function(e,t){return(s(e)?n:r)(e,i(t))}},6557:e=>{e.exports=function(e){return e}},35694:(e,t,a)=>{var n=a(9454),r=a(37005),i=Object.prototype,s=i.hasOwnProperty,o=i.propertyIsEnumerable,l=n(function(){return arguments}())?n:function(e){return r(e)&&s.call(e,"callee")&&!o.call(e,"callee")};e.exports=l},1469:e=>{var t=Array.isArray;e.exports=t},98612:(e,t,a)=>{var n=a(23560),r=a(41780);e.exports=function(e){return null!=e&&r(e.length)&&!n(e)}},44144:(e,t,a)=>{e=a.nmd(e);var n=a(55639),r=a(95062),i=t&&!t.nodeType&&t,s=i&&e&&!e.nodeType&&e,o=s&&s.exports===i?n.Buffer:void 0,l=(o?o.isBuffer:void 0)||r;e.exports=l},23560:(e,t,a)=>{var n=a(44239),r=a(13218);e.exports=function(e){if(!r(e))return!1;var t=n(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},41780:e=>{e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},13218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},37005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},36719:(e,t,a)=>{var n=a(38749),r=a(7518),i=a(31167),s=i&&i.isTypedArray,o=s?r(s):n;e.exports=o},3674:(e,t,a)=>{var n=a(14636),r=a(280),i=a(98612);e.exports=function(e){return i(e)?n(e):r(e)}},95062:e=>{e.exports=function(){return!1}},48559:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>f});var n=a(87286),r=a(66073),i=a.n(r);const s={name:"FilePickerExport",props:{label:{type:String,default:"Export failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(e){var t=this;this.errors={};var a=new FormData;a.append("file",this.file),this.isUploadSuccess=!1,axios.post("/export/store_akcija",a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(e){t.isUploadSuccess=!0,t.$emit("file-updated",e.data.data),t.$emit("file-id-updated",e.data.data.id)})).catch((function(e){t.file=null,t.uploadPercent=0,e.response.data.errors?t.errors=e.response.data.errors:t.errors={_all:["Upload error"]},i()(t.errors,(function(e){t.$buefy.toast.open({message:e[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(e){this.uploadPercent=Math.round(100*e.loaded/e.total)}}};var o=a(51900);const l=(0,o.Z)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-field",{attrs:{label:e.label,message:e.fieldFileMessage,type:e.fieldFileType}},[a("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:e.upload},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}},[a("section",{staticClass:"section"},[a("div",{staticClass:"content has-text-centered"},[a("p",[a("b-icon",{attrs:{icon:e.uploadButtonIcon,size:"is-large"}})],1),e._v(" "),e.uploadButtonText?a("p",[e._v(e._s(e.uploadButtonText))]):e._e()])])]),e._v(" "),e.fileName?a("div",{staticClass:"control"},[a("span",{attrs:{title:e.fileName}},[e._v(e._s(e.fileName)+" ")])]):e._e()],1)}),[],!1,null,null,null).exports;const u={name:"FilePickerList",props:{label:{type:String,default:"Saskaitos failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(e){var t=this;this.errors={};var a=new FormData;a.append("file",this.file),this.isUploadSuccess=!1,axios.post("/export/store_akcija",a,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(e){t.isUploadSuccess=!0,t.$emit("file-updated",e.data.data),t.$emit("file-id-updated",e.data.data.id)})).catch((function(e){t.file=null,t.uploadPercent=0,e.response.data.errors?t.errors=e.response.data.errors:t.errors={_all:["Upload error"]},i()(t.errors,(function(e){t.$buefy.toast.open({message:e[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(e){this.uploadPercent=Math.round(100*e.loaded/e.total)}}};const c=(0,o.Z)(u,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-field",{attrs:{label:e.label,message:e.fieldFileMessage,type:e.fieldFileType}},[a("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:e.upload},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}},[a("section",{staticClass:"section"},[a("div",{staticClass:"content has-text-centered"},[a("p",[a("b-icon",{attrs:{icon:e.uploadButtonIcon,size:"is-large"}})],1),e._v(" "),e.uploadButtonText?a("p",[e._v(e._s(e.uploadButtonText))]):e._e()])])]),e._v(" "),e.fileName?a("div",{staticClass:"control"},[a("span",{attrs:{title:e.fileName}},[e._v(e._s(e.fileName)+" ")])]):e._e()],1)}),[],!1,null,null,null).exports,d={name:"akcijos",components:{CardComponent:n.Z,FilePickerExport:l,FilePickerList:c},data:function(){return{columns:[{label:"Kodas",field:"kodas"},{label:"P-LT",field:"p_lt"},{label:"P-LV",field:"p_lv"},{label:"P-EE",field:"p_ee"},{label:"Sudetis LT",field:"sudetis_lt"},{label:"Sudetis LV",field:"sudetis_lv"},{label:"Sudetis EE",field:"sudetis_ee"},{label:"Pirk. kaina",field:"pirkimo_kaina"},{label:"Gamintojas LT",field:"gamintojas_lt"},{label:"Gamintojas LV",field:"gamintojas_lv"},{label:"Gamintojas EE",field:"gamintojas_ee"},{label:"Pard. kaina LT",field:"pardavimo_kaina_lt"},{label:"Pard. kaina LV",field:"pardavimo_kaina_lv"},{label:"Pard. kaina EE",field:"pardavimo_kaina_ee"},{label:"Dydis",field:"dydis"}],file:null,failas:"",file2:null,failas2:"",isLoading:!1,isNarrowed:!0,mobile_card:!0,sarasas:[],date:""}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{file_info:function(e){this.failas=e.name},file_info2:function(e){this.failas2=e.name},getData:function(){var e=this;this.isLoading=!0,this.axios.get("/export").then((function(t){e.isLoading=!1,e.sarasas=t.data.sarasas,e.date=t.data.date})).catch((function(t){e.isLoading=!1,e.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger",queue:!1})}))},update_list:function(){var e=this;this.isLoading=!0,this.axios.post("/export/store",{file:this.failas,file2:this.failas2}).then((function(t){console.log(t.data.data),e.getData(),e.isLoading=!1,e.$buefy.toast.open({message:"Duomenys atnaujinti!",type:"is-info",queue:!1})})).catch((function(t){e.isLoading=!1,e.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger",queue:!1})}))}}};const f=(0,o.Z)(d,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section is-main-section"},[a("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[a("div",{staticClass:"has-text-centered"},[e._v("Paskutini karta atnaujinta: "+e._s(e.date))]),e._v(" "),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("file-picker-export",{on:{"file-updated":e.file_info},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e._v(" "),a("p",{staticClass:"control"},[a("button",{staticClass:"button is-sark",on:{click:e.update_list}},[e._v("Atnaujinti")])])],1),e._v(" "),a("div",{staticClass:"column"},[a("file-picker-list",{on:{"file-updated":e.file_info2},model:{value:e.file2,callback:function(t){e.file2=t},expression:"file2"}}),e._v(" "),a("p",{staticClass:"control"},[a("button",{staticClass:"button is-sark",on:{click:e.update_list}},[e._v("Suformuoti")])])],1)])]),e._v(" "),a("card-component",{attrs:{title:"Lipduku eksportas",icon:"account-multiple"}},[a("div",{staticClass:"has-text-centered"},[e._v("Prekiu kiekis: "+e._s(e.sarasas.length))]),e._v(" "),a("hr"),e._v(" "),a("b-table",{attrs:{"mobile-cards":e.mobile_card,bordered:"",hoverable:"",narrowed:e.isNarrowed,data:e.sarasas,loading:e.isLoading}},[a("b-table-column",{attrs:{label:" ",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" \n        "+e._s(t.index+1)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Kodas",field:"kodas",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" \n        "+e._s(t.row.kodas)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Pavadinimas",field:"p_lt",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" \n        "+e._s(t.row.p_lt)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Sudetis",field:"sudetis_lt",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.sudetis_lt)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Pirkimas",field:"pirkimo_kaina",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.pirkimo_kaina)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Gamintojas",field:"gamintojas_lt",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.gamintojas_lt)+"\n      ")]}}])}),e._v(" "),a("b-table-column",{attrs:{label:"Pardavimas",field:"pardavimo_kaina_lt",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.pardavimo_kaina_lt)+"\n      ")]}}])}),e._v(" "),a("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"content has-text-centered"},[e.isLoading?[a("p",[a("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),e._v(" "),a("p",[e._v("Gaunami duomenys...")])]:[a("p",[a("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),e._v(" "),a("p",[e._v("Duomenų nerasta …")])]],2)])],1),e._v(" "),a("hr"),e._v(" "),a("div",{staticClass:"buttons"},[a("vue-excel-xlsx",{staticClass:"button is-dark is-medium",attrs:{data:e.sarasas,columns:e.columns,filename:"perkelimai",sheetname:"LT"}},[e._v("\n      ATSISIŲSTI (excel)\n    ")])],1)],1)],1)}),[],!1,null,null,null).exports}}]);