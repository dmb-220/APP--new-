(self.webpackChunk=self.webpackChunk||[]).push([[907],{62705:(t,e,n)=>{var r=n(55639).Symbol;t.exports=r},77412:t=>{t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}},14636:(t,e,n)=>{var r=n(22545),o=n(35694),i=n(1469),a=n(44144),s=n(65776),l=n(36719),u=Object.prototype.hasOwnProperty;t.exports=function(t,e){var n=i(t),c=!n&&o(t),p=!n&&!c&&a(t),f=!n&&!c&&!p&&l(t),d=n||c||p||f,b=d?r(t.length,String):[],v=b.length;for(var m in t)!e&&!u.call(t,m)||d&&("length"==m||p&&("offset"==m||"parent"==m)||f&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||s(m,v))||b.push(m);return b}},89881:(t,e,n)=>{var r=n(47816),o=n(99291)(r);t.exports=o},28483:(t,e,n)=>{var r=n(25063)();t.exports=r},47816:(t,e,n)=>{var r=n(28483),o=n(3674);t.exports=function(t,e){return t&&r(t,e,o)}},44239:(t,e,n)=>{var r=n(62705),o=n(89607),i=n(2333),a=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":a&&a in Object(t)?o(t):i(t)}},9454:(t,e,n)=>{var r=n(44239),o=n(37005);t.exports=function(t){return o(t)&&"[object Arguments]"==r(t)}},38749:(t,e,n)=>{var r=n(44239),o=n(41780),i=n(37005),a={};a["[object Float32Array]"]=a["[object Float64Array]"]=a["[object Int8Array]"]=a["[object Int16Array]"]=a["[object Int32Array]"]=a["[object Uint8Array]"]=a["[object Uint8ClampedArray]"]=a["[object Uint16Array]"]=a["[object Uint32Array]"]=!0,a["[object Arguments]"]=a["[object Array]"]=a["[object ArrayBuffer]"]=a["[object Boolean]"]=a["[object DataView]"]=a["[object Date]"]=a["[object Error]"]=a["[object Function]"]=a["[object Map]"]=a["[object Number]"]=a["[object Object]"]=a["[object RegExp]"]=a["[object Set]"]=a["[object String]"]=a["[object WeakMap]"]=!1,t.exports=function(t){return i(t)&&o(t.length)&&!!a[r(t)]}},280:(t,e,n)=>{var r=n(25726),o=n(86916),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!r(t))return o(t);var e=[];for(var n in Object(t))i.call(t,n)&&"constructor"!=n&&e.push(n);return e}},22545:t=>{t.exports=function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}},7518:t=>{t.exports=function(t){return function(e){return t(e)}}},54290:(t,e,n)=>{var r=n(6557);t.exports=function(t){return"function"==typeof t?t:r}},99291:(t,e,n)=>{var r=n(98612);t.exports=function(t,e){return function(n,o){if(null==n)return n;if(!r(n))return t(n,o);for(var i=n.length,a=e?i:-1,s=Object(n);(e?a--:++a<i)&&!1!==o(s[a],a,s););return n}}},25063:t=>{t.exports=function(t){return function(e,n,r){for(var o=-1,i=Object(e),a=r(e),s=a.length;s--;){var l=a[t?s:++o];if(!1===n(i[l],l,i))break}return e}}},31957:(t,e,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=r},89607:(t,e,n)=>{var r=n(62705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=r?r.toStringTag:void 0;t.exports=function(t){var e=i.call(t,s),n=t[s];try{t[s]=void 0;var r=!0}catch(t){}var o=a.call(t);return r&&(e?t[s]=n:delete t[s]),o}},65776:t=>{var e=/^(?:0|[1-9]\d*)$/;t.exports=function(t,n){var r=typeof t;return!!(n=null==n?9007199254740991:n)&&("number"==r||"symbol"!=r&&e.test(t))&&t>-1&&t%1==0&&t<n}},25726:t=>{var e=Object.prototype;t.exports=function(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||e)}},86916:(t,e,n)=>{var r=n(5569)(Object.keys,Object);t.exports=r},31167:(t,e,n)=>{t=n.nmd(t);var r=n(31957),o=e&&!e.nodeType&&e,i=o&&t&&!t.nodeType&&t,a=i&&i.exports===o&&r.process,s=function(){try{var t=i&&i.require&&i.require("util").types;return t||a&&a.binding&&a.binding("util")}catch(t){}}();t.exports=s},2333:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5569:t=>{t.exports=function(t,e){return function(n){return t(e(n))}}},55639:(t,e,n)=>{var r=n(31957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},66073:(t,e,n)=>{t.exports=n(84486)},84486:(t,e,n)=>{var r=n(77412),o=n(89881),i=n(54290),a=n(1469);t.exports=function(t,e){return(a(t)?r:o)(t,i(e))}},6557:t=>{t.exports=function(t){return t}},35694:(t,e,n)=>{var r=n(9454),o=n(37005),i=Object.prototype,a=i.hasOwnProperty,s=i.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(t){return o(t)&&a.call(t,"callee")&&!s.call(t,"callee")};t.exports=l},1469:t=>{var e=Array.isArray;t.exports=e},98612:(t,e,n)=>{var r=n(23560),o=n(41780);t.exports=function(t){return null!=t&&o(t.length)&&!r(t)}},44144:(t,e,n)=>{t=n.nmd(t);var r=n(55639),o=n(95062),i=e&&!e.nodeType&&e,a=i&&t&&!t.nodeType&&t,s=a&&a.exports===i?r.Buffer:void 0,l=(s?s.isBuffer:void 0)||o;t.exports=l},23560:(t,e,n)=>{var r=n(44239),o=n(13218);t.exports=function(t){if(!o(t))return!1;var e=r(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},41780:t=>{t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},13218:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},37005:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},36719:(t,e,n)=>{var r=n(38749),o=n(7518),i=n(31167),a=i&&i.isTypedArray,s=a?o(a):r;t.exports=s},3674:(t,e,n)=>{var r=n(14636),o=n(280),i=n(98612);t.exports=function(t){return i(t)?r(t):o(t)}},95062:t=>{t.exports=function(){return!1}},92346:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var r=n(66073),o=n.n(r);const i={name:"FilePickerPost",props:{label:{type:String,default:"CSV failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null},postSubject:{type:String,default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(t){var e=this;this.errors={};var n=new FormData;n.append("file",this.file),this.isUploadSuccess=!1,axios.post(this.postSubject,n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(t){e.isUploadSuccess=!0,e.$emit("file-updated",t.data.data),e.$emit("file-id-updated",t.data.data.id)})).catch((function(t){e.file=null,e.uploadPercent=0,t.response.data.errors?e.errors=t.response.data.errors:e.errors={_all:["Upload error"]},o()(e.errors,(function(t){e.$buefy.toast.open({message:t[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(t){this.uploadPercent=Math.round(100*t.loaded/t.total)}}};const a=(0,n(51900).Z)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-field",{attrs:{label:t.label,message:t.fieldFileMessage,type:t.fieldFileType}},[n("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:t.upload},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}},[n("section",{staticClass:"section"},[n("div",{staticClass:"content has-text-centered"},[n("p",[n("b-icon",{attrs:{icon:t.uploadButtonIcon,size:"is-large"}})],1),t._v(" "),t.uploadButtonText?n("p",[t._v(t._s(t.uploadButtonText))]):t._e()])])]),t._v(" "),t.fileName?n("div",{staticClass:"control"},[n("span",{attrs:{title:t.fileName}},[t._v(t._s(t.fileName)+" ")])]):t._e()],1)}),[],!1,null,null,null).exports},64907:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>a});var r=n(87286),o=n(92346);const i={name:"Gpais",components:{CardComponent:r.Z,FilePickerPost:o.Z},data:function(){return{works:"",isLoading:!1,isFullPage:!0,gpais:[],postName:"/gpais/store_gpais",file:null,failas:""}},computed:{filePostName:function(){return this.postName?this.postName:null}},created:function(){this.getData()},methods:{file_info:function(t){this.failas=t.name},print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.isLoading=!0,this.axios.get("/gpais").then((function(e){t.isLoading=!1,t.gpais=e.data.array})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const a=(0,n(51900).Z)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-main-section"},[n("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),n("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[n("file-picker-post",{attrs:{"post-subject":t.filePostName},on:{"file-updated":t.file_info},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1),t._v(" "),n("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[n("div",{attrs:{id:"printMe"}},[n("b-table",{attrs:{bordered:"",data:t.gpais}},[n("b-table-column",{attrs:{label:" "},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.index+1)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Data",field:"tiekimoRinkaiData"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.tiekimoRinkaiData)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Pavadinimas",field:"produktoKodas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.produktoKodas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Kiekis, pakuoteje",field:"kiekis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.kiekis)+" vnt.\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Gavimo budas",field:"gavimoBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.gavimoBudas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Veiklos budas",field:"veiklosBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.veiklosBudas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Svoris, t.",field:"vienos_pakuotes_svoris_tonomis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.vienos_pakuotes_svoris_tonomis)+"\n        ")]}}])})],1)],1),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"buttons"},[n("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")]),t._v(" "),n("b-button",{attrs:{tag:"a",type:"is-dark",size:"is-medium","icon-left":"download",href:"gpais/get_xml",target:"_blank"}},[t._v("\n      ATSISIŲSTI\n    ")])],1)])],1)}),[],!1,null,null,null).exports}}]);