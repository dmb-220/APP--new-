(self.webpackChunk=self.webpackChunk||[]).push([[93],{62705:(e,t,n)=>{var a=n(55639).Symbol;e.exports=a},77412:e=>{e.exports=function(e,t){for(var n=-1,a=null==e?0:e.length;++n<a&&!1!==t(e[n],n,e););return e}},14636:(e,t,n)=>{var a=n(22545),r=n(35694),o=n(1469),i=n(44144),s=n(65776),l=n(36719),c=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=o(e),u=!n&&r(e),d=!n&&!u&&i(e),p=!n&&!u&&!d&&l(e),f=n||u||d||p,b=f?a(e.length,String):[],v=b.length;for(var _ in e)!t&&!c.call(e,_)||f&&("length"==_||d&&("offset"==_||"parent"==_)||p&&("buffer"==_||"byteLength"==_||"byteOffset"==_)||s(_,v))||b.push(_);return b}},89881:(e,t,n)=>{var a=n(47816),r=n(99291)(a);e.exports=r},28483:(e,t,n)=>{var a=n(25063)();e.exports=a},47816:(e,t,n)=>{var a=n(28483),r=n(3674);e.exports=function(e,t){return e&&a(e,t,r)}},44239:(e,t,n)=>{var a=n(62705),r=n(89607),o=n(2333),i=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?r(e):o(e)}},9454:(e,t,n)=>{var a=n(44239),r=n(37005);e.exports=function(e){return r(e)&&"[object Arguments]"==a(e)}},38749:(e,t,n)=>{var a=n(44239),r=n(41780),o=n(37005),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return o(e)&&r(e.length)&&!!i[a(e)]}},280:(e,t,n)=>{var a=n(25726),r=n(86916),o=Object.prototype.hasOwnProperty;e.exports=function(e){if(!a(e))return r(e);var t=[];for(var n in Object(e))o.call(e,n)&&"constructor"!=n&&t.push(n);return t}},22545:e=>{e.exports=function(e,t){for(var n=-1,a=Array(e);++n<e;)a[n]=t(n);return a}},7518:e=>{e.exports=function(e){return function(t){return e(t)}}},54290:(e,t,n)=>{var a=n(6557);e.exports=function(e){return"function"==typeof e?e:a}},99291:(e,t,n)=>{var a=n(98612);e.exports=function(e,t){return function(n,r){if(null==n)return n;if(!a(n))return e(n,r);for(var o=n.length,i=t?o:-1,s=Object(n);(t?i--:++i<o)&&!1!==r(s[i],i,s););return n}}},25063:e=>{e.exports=function(e){return function(t,n,a){for(var r=-1,o=Object(t),i=a(t),s=i.length;s--;){var l=i[e?s:++r];if(!1===n(o[l],l,o))break}return t}}},31957:(e,t,n)=>{var a="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=a},89607:(e,t,n)=>{var a=n(62705),r=Object.prototype,o=r.hasOwnProperty,i=r.toString,s=a?a.toStringTag:void 0;e.exports=function(e){var t=o.call(e,s),n=e[s];try{e[s]=void 0;var a=!0}catch(e){}var r=i.call(e);return a&&(t?e[s]=n:delete e[s]),r}},65776:e=>{var t=/^(?:0|[1-9]\d*)$/;e.exports=function(e,n){var a=typeof e;return!!(n=null==n?9007199254740991:n)&&("number"==a||"symbol"!=a&&t.test(e))&&e>-1&&e%1==0&&e<n}},25726:e=>{var t=Object.prototype;e.exports=function(e){var n=e&&e.constructor;return e===("function"==typeof n&&n.prototype||t)}},86916:(e,t,n)=>{var a=n(5569)(Object.keys,Object);e.exports=a},31167:(e,t,n)=>{e=n.nmd(e);var a=n(31957),r=t&&!t.nodeType&&t,o=r&&e&&!e.nodeType&&e,i=o&&o.exports===r&&a.process,s=function(){try{var e=o&&o.require&&o.require("util").types;return e||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=s},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5569:e=>{e.exports=function(e,t){return function(n){return e(t(n))}}},55639:(e,t,n)=>{var a=n(31957),r="object"==typeof self&&self&&self.Object===Object&&self,o=a||r||Function("return this")();e.exports=o},66073:(e,t,n)=>{e.exports=n(84486)},84486:(e,t,n)=>{var a=n(77412),r=n(89881),o=n(54290),i=n(1469);e.exports=function(e,t){return(i(e)?a:r)(e,o(t))}},6557:e=>{e.exports=function(e){return e}},35694:(e,t,n)=>{var a=n(9454),r=n(37005),o=Object.prototype,i=o.hasOwnProperty,s=o.propertyIsEnumerable,l=a(function(){return arguments}())?a:function(e){return r(e)&&i.call(e,"callee")&&!s.call(e,"callee")};e.exports=l},1469:e=>{var t=Array.isArray;e.exports=t},98612:(e,t,n)=>{var a=n(23560),r=n(41780);e.exports=function(e){return null!=e&&r(e.length)&&!a(e)}},44144:(e,t,n)=>{e=n.nmd(e);var a=n(55639),r=n(95062),o=t&&!t.nodeType&&t,i=o&&e&&!e.nodeType&&e,s=i&&i.exports===o?a.Buffer:void 0,l=(s?s.isBuffer:void 0)||r;e.exports=l},23560:(e,t,n)=>{var a=n(44239),r=n(13218);e.exports=function(e){if(!r(e))return!1;var t=a(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},41780:e=>{e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},13218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},37005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},36719:(e,t,n)=>{var a=n(38749),r=n(7518),o=n(31167),i=o&&o.isTypedArray,s=i?r(i):a;e.exports=s},3674:(e,t,n)=>{var a=n(14636),r=n(280),o=n(98612);e.exports=function(e){return o(e)?a(e):r(e)}},95062:e=>{e.exports=function(){return!1}},33093:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var a=n(73727),r=n(66073),o=n.n(r);const i={name:"FilePickerAkcijos",props:{label:{type:String,default:"CSV failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(e){var t=this;this.errors={};var n=new FormData;n.append("file",this.file),this.isUploadSuccess=!1,axios.post("/akcijos/store_akcija",n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(e){t.isUploadSuccess=!0,t.$emit("file-updated",e.data.data),t.$emit("file-id-updated",e.data.data.id)})).catch((function(e){t.file=null,t.uploadPercent=0,e.response.data.errors?t.errors=e.response.data.errors:t.errors={_all:["Upload error"]},o()(t.errors,(function(e){t.$buefy.toast.open({message:e[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(e){this.uploadPercent=Math.round(100*e.loaded/e.total)}}};var s=n(51900);const l=(0,s.Z)(i,(function(){var e=this,t=e._self._c;return t("b-field",{attrs:{label:e.label,message:e.fieldFileMessage,type:e.fieldFileType}},[t("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:e.upload},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}},[t("section",{staticClass:"section"},[t("div",{staticClass:"content has-text-centered"},[t("p",[t("b-icon",{attrs:{icon:e.uploadButtonIcon,size:"is-large"}})],1),e._v(" "),e.uploadButtonText?t("p",[e._v(e._s(e.uploadButtonText))]):e._e()])])]),e._v(" "),e.fileName?t("div",{staticClass:"control"},[t("span",{attrs:{title:e.fileName}},[e._v(e._s(e.fileName)+" ")])]):e._e()],1)}),[],!1,null,null,null).exports,c={name:"akcijos",components:{CardComponent:a.Z,FilePickerAkcijos:l},data:function(){return{isPaginated:!0,paginationPosition:"bottom",perPage:50,file:null,failas:"",bendras:"",isLoading:!1,defaultOpenedDetails:[1],showDetailIcon:!1,isNarrowed:!0,pardavimai:[],sandelis:"",mobile_card:!0}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},file_info:function(e){this.failas=e.name},paieska_post:function(){var e=this;""!=this.failas?axios.post("/akcijos/store",{sandelis:this.sandelis,failas:this.failas}).then((function(t){e.getData()})).catch((function(t){e.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger",queue:!1})})):this.$buefy.toast.open({message:"KLAIDA: Nepasirinktas failas!",type:"is-danger",queue:!1})},getData:function(){var e=this;this.isLoading=!0,this.axios.get("/akcijos").then((function(t){e.isLoading=!1,e.pardavimai=t.data.data,e.bendras=t.data.likutis,e.sandelis=t.data.sandelis,e.failas=t.data.failas})).catch((function(t){e.isLoading=!1,e.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger",queue:!1})}))}}};const u=(0,s.Z)(c,(function(){var e=this,t=e._self._c;return t("section",{staticClass:"section is-main-section"},[t("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[t("file-picker-akcijos",{on:{"file-updated":e.file_info},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e._v(" "),t("b-field",{attrs:{label:"Sandelis:",horizontal:""}},[t("b-input",{attrs:{placeholder:"Sandelis likučiams",type:"search",icon:"magnify",expanded:""},model:{value:e.sandelis,callback:function(t){e.sandelis=t},expression:"sandelis"}})],1),e._v(" "),t("b-field",{attrs:{label:" ",horizontal:""}},[t("p",{staticClass:"control"},[t("button",{staticClass:"button is-sark",on:{click:e.paieska_post}},[e._v("Ieškoti")])])])],1),e._v(" "),t("card-component",{attrs:{title:"AKCIJOS",icon:"account-multiple"}},[t("div",{attrs:{id:"printMe"}},[t("div",{staticClass:"columns"},[t("div",{staticClass:"column has-text-centered has-text-weight-bold"},[e._v("\n          Rasta: "+e._s(e.pardavimai.length)),t("br"),e._v(e._s(e.sandelis)+"\n        ")])]),e._v(" "),t("b-field",{attrs:{grouped:"","group-multiline":""}},[t("b-select",{attrs:{disabled:!e.isPaginated},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}},[t("option",{attrs:{value:"50"}},[e._v("50 įrašų puslapyje")]),e._v(" "),t("option",{attrs:{value:"100"}},[e._v("100 įrašų puslapyje")]),e._v(" "),t("option",{attrs:{value:"150"}},[e._v("150 įrašų puslapyje")]),e._v(" "),t("option",{attrs:{value:"200"}},[e._v("200 įrašų puslapyje")])]),e._v(" "),t("div",{staticClass:"control is-flex"},[t("b-switch",{model:{value:e.isPaginated,callback:function(t){e.isPaginated=t},expression:"isPaginated"}},[e._v("Puslapiai")])],1)],1),e._v(" "),t("b-table",{attrs:{paginated:e.isPaginated,"per-page":e.perPage,"pagination-position":e.paginationPosition,"mobile-cards":e.mobile_card,bordered:"",hoverable:"",narrowed:e.isNarrowed,data:e.pardavimai,"opened-detailed":e.defaultOpenedDetails,detailed:"","sort-icon":"arrow-up","detail-key":"preke",loading:e.isLoading},on:{"details-open":function(t,n){return e.$buefy.toast.open("Išskleista ".concat(t.preke," prekė!"))}},scopedSlots:e._u([{key:"detail",fn:function(n){return[t("b-table",{attrs:{data:n.row.sandeliai,"default-sort-direction":"asc","default-sort":"sandelis"}},[t("b-table-column",{attrs:{field:"name",label:"Sandelis",sortable:""},scopedSlots:e._u([{key:"default",fn:function(n){return[t("small",[e._v(e._s(n.row.name))])]}}],null,!0)}),e._v(" "),t("b-table-column",{attrs:{field:"likutis",label:"Likutis",sortable:""},scopedSlots:e._u([{key:"default",fn:function(n){return[t("small",[e._v(e._s(n.row.likutis))])]}}],null,!0)})],1)]}},{key:"footer",fn:function(){return[t("th"),e._v(" "),t("th"),e._v(" "),t("th"),e._v(" "),t("th",[e._v(e._s(e.bendras))]),e._v(" "),t("th"),e._v(" "),t("th"),e._v(" "),t("th"),e._v(" "),t("th"),e._v(" "),t("th")]},proxy:!0}])},[t("b-table-column",{attrs:{label:"Preke",field:"preke",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" \n          "+e._s(t.row.preke)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{attrs:{label:"Kaina",field:"pradine",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.pradine)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{attrs:{label:"Likutis",field:"likutis",centered:"",cellClass:"is-smoke",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.likutis)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{style:{"vertical-align":"middle"},attrs:{label:"Sandeliui",field:"sandelis"},scopedSlots:e._u([{key:"default",fn:function(n){return e._l(n.row.sandelis,(function(n){return t("div",{key:n.pavadinimas,staticClass:"is-size-7"},[e._v("\n              "+e._s(n.pavadinimas)+" - "+e._s(n.kaina)+"\n            ")])}))}}])}),e._v(" "),t("b-table-column",{attrs:{cellClass:"is-one2",label:"LT Akcija",field:"kaina"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.LT&&t.row.LT.kaina)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{attrs:{cellClass:"is-one2",label:"LT Kortele",field:"akcija"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.LT&&t.row.LT.akcija)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{attrs:{cellClass:"is-two2",label:"LV Akcija",field:"kaina"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.LV&&t.row.LV.kaina)+"\n        ")]}}])}),e._v(" "),t("b-table-column",{attrs:{cellClass:"is-two2",label:"LV Kortele",field:"akcija"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.LV&&t.row.LV.akcija)+"\n        ")]}}])}),e._v(" "),e._v(" "),t("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[t("div",{staticClass:"content has-text-centered"},[e.isLoading?[t("p",[t("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),e._v(" "),t("p",[e._v("Gaunami duomenys...")])]:[t("p",[t("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),e._v(" "),t("p",[e._v("Duomenų nerasta …")])]],2)])],1)],1),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"buttons"},[t("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:e.print}},[e._v("SPAUSDINTI")])],1)])],1)}),[],!1,null,null,null).exports}}]);