(self.webpackChunk=self.webpackChunk||[]).push([[982],{62705:(t,e,r)=>{var n=r(55639).Symbol;t.exports=n},77412:t=>{t.exports=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););return t}},14636:(t,e,r)=>{var n=r(22545),o=r(35694),i=r(1469),a=r(44144),s=r(65776),l=r(36719),u=Object.prototype.hasOwnProperty;t.exports=function(t,e){var r=i(t),c=!r&&o(t),p=!r&&!c&&a(t),f=!r&&!c&&!p&&l(t),d=r||c||p||f,b=d?n(t.length,String):[],v=b.length;for(var m in t)!e&&!u.call(t,m)||d&&("length"==m||p&&("offset"==m||"parent"==m)||f&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||s(m,v))||b.push(m);return b}},89881:(t,e,r)=>{var n=r(47816),o=r(99291)(n);t.exports=o},28483:(t,e,r)=>{var n=r(25063)();t.exports=n},47816:(t,e,r)=>{var n=r(28483),o=r(3674);t.exports=function(t,e){return t&&n(t,e,o)}},44239:(t,e,r)=>{var n=r(62705),o=r(89607),i=r(2333),a=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":a&&a in Object(t)?o(t):i(t)}},9454:(t,e,r)=>{var n=r(44239),o=r(37005);t.exports=function(t){return o(t)&&"[object Arguments]"==n(t)}},38749:(t,e,r)=>{var n=r(44239),o=r(41780),i=r(37005),a={};a["[object Float32Array]"]=a["[object Float64Array]"]=a["[object Int8Array]"]=a["[object Int16Array]"]=a["[object Int32Array]"]=a["[object Uint8Array]"]=a["[object Uint8ClampedArray]"]=a["[object Uint16Array]"]=a["[object Uint32Array]"]=!0,a["[object Arguments]"]=a["[object Array]"]=a["[object ArrayBuffer]"]=a["[object Boolean]"]=a["[object DataView]"]=a["[object Date]"]=a["[object Error]"]=a["[object Function]"]=a["[object Map]"]=a["[object Number]"]=a["[object Object]"]=a["[object RegExp]"]=a["[object Set]"]=a["[object String]"]=a["[object WeakMap]"]=!1,t.exports=function(t){return i(t)&&o(t.length)&&!!a[n(t)]}},280:(t,e,r)=>{var n=r(25726),o=r(86916),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!n(t))return o(t);var e=[];for(var r in Object(t))i.call(t,r)&&"constructor"!=r&&e.push(r);return e}},22545:t=>{t.exports=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}},7518:t=>{t.exports=function(t){return function(e){return t(e)}}},54290:(t,e,r)=>{var n=r(6557);t.exports=function(t){return"function"==typeof t?t:n}},99291:(t,e,r)=>{var n=r(98612);t.exports=function(t,e){return function(r,o){if(null==r)return r;if(!n(r))return t(r,o);for(var i=r.length,a=e?i:-1,s=Object(r);(e?a--:++a<i)&&!1!==o(s[a],a,s););return r}}},25063:t=>{t.exports=function(t){return function(e,r,n){for(var o=-1,i=Object(e),a=n(e),s=a.length;s--;){var l=a[t?s:++o];if(!1===r(i[l],l,i))break}return e}}},31957:(t,e,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;t.exports=n},89607:(t,e,r)=>{var n=r(62705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=n?n.toStringTag:void 0;t.exports=function(t){var e=i.call(t,s),r=t[s];try{t[s]=void 0;var n=!0}catch(t){}var o=a.call(t);return n&&(e?t[s]=r:delete t[s]),o}},65776:t=>{var e=/^(?:0|[1-9]\d*)$/;t.exports=function(t,r){var n=typeof t;return!!(r=null==r?9007199254740991:r)&&("number"==n||"symbol"!=n&&e.test(t))&&t>-1&&t%1==0&&t<r}},25726:t=>{var e=Object.prototype;t.exports=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||e)}},86916:(t,e,r)=>{var n=r(5569)(Object.keys,Object);t.exports=n},31167:(t,e,r)=>{t=r.nmd(t);var n=r(31957),o=e&&!e.nodeType&&e,i=o&&t&&!t.nodeType&&t,a=i&&i.exports===o&&n.process,s=function(){try{var t=i&&i.require&&i.require("util").types;return t||a&&a.binding&&a.binding("util")}catch(t){}}();t.exports=s},2333:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5569:t=>{t.exports=function(t,e){return function(r){return t(e(r))}}},55639:(t,e,r)=>{var n=r(31957),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();t.exports=i},66073:(t,e,r)=>{t.exports=r(84486)},84486:(t,e,r)=>{var n=r(77412),o=r(89881),i=r(54290),a=r(1469);t.exports=function(t,e){return(a(t)?n:o)(t,i(e))}},6557:t=>{t.exports=function(t){return t}},35694:(t,e,r)=>{var n=r(9454),o=r(37005),i=Object.prototype,a=i.hasOwnProperty,s=i.propertyIsEnumerable,l=n(function(){return arguments}())?n:function(t){return o(t)&&a.call(t,"callee")&&!s.call(t,"callee")};t.exports=l},1469:t=>{var e=Array.isArray;t.exports=e},98612:(t,e,r)=>{var n=r(23560),o=r(41780);t.exports=function(t){return null!=t&&o(t.length)&&!n(t)}},44144:(t,e,r)=>{t=r.nmd(t);var n=r(55639),o=r(95062),i=e&&!e.nodeType&&e,a=i&&t&&!t.nodeType&&t,s=a&&a.exports===i?n.Buffer:void 0,l=(s?s.isBuffer:void 0)||o;t.exports=l},23560:(t,e,r)=>{var n=r(44239),o=r(13218);t.exports=function(t){if(!o(t))return!1;var e=n(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},41780:t=>{t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},13218:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},37005:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},36719:(t,e,r)=>{var n=r(38749),o=r(7518),i=r(31167),a=i&&i.isTypedArray,s=a?o(a):n;t.exports=s},3674:(t,e,r)=>{var n=r(14636),o=r(280),i=r(98612);t.exports=function(t){return i(t)?n(t):o(t)}},95062:t=>{t.exports=function(){return!1}},92346:(t,e,r)=>{"use strict";r.d(e,{Z:()=>a});var n=r(66073),o=r.n(n);const i={name:"FilePickerPost",props:{label:{type:String,default:"CSV failo įkėlimas"},message:{type:String,default:null},currentFile:{default:null},postSubject:{type:String,default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(t){var e=this;this.errors={};var r=new FormData;r.append("file",this.file),this.isUploadSuccess=!1,axios.post(this.postSubject,r,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(t){e.isUploadSuccess=!0,e.$emit("file-updated",t.data.data),e.$emit("file-id-updated",t.data.data.id)})).catch((function(t){e.file=null,e.uploadPercent=0,t.response.data.errors?e.errors=t.response.data.errors:e.errors={_all:["Upload error"]},o()(e.errors,(function(t){e.$buefy.toast.open({message:t[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(t){this.uploadPercent=Math.round(100*t.loaded/t.total)}}};const a=(0,r(51900).Z)(i,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-field",{attrs:{label:t.label,message:t.fieldFileMessage,type:t.fieldFileType}},[r("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:t.upload},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}},[r("section",{staticClass:"section"},[r("div",{staticClass:"content has-text-centered"},[r("p",[r("b-icon",{attrs:{icon:t.uploadButtonIcon,size:"is-large"}})],1),t._v(" "),t.uploadButtonText?r("p",[t._v(t._s(t.uploadButtonText))]):t._e()])])]),t._v(" "),t.fileName?r("div",{staticClass:"control"},[r("span",{attrs:{title:t.fileName}},[t._v(t._s(t.fileName)+" ")])]):t._e()],1)}),[],!1,null,null,null).exports},27410:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>a});var n=r(87286),o=r(92346);const i={name:"Gpais",components:{CardComponent:n.Z,FilePickerPost:o.Z},data:function(){return{works:"",isLoading:!1,isFullPage:!0,gpais:[],file:null,failas:""}},computed:{},created:function(){this.getData()},methods:{file_info:function(t){this.failas=t.name},print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.isLoading=!0,this.axios.get("/gpais").then((function(e){t.isLoading=!1,t.gpais=e.data.array})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const a=(0,r(51900).Z)(i,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section is-main-section"},[r("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),r("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[r("file-picker-post",{attrs:{"post-subject":"/gpais/store_gpais",label:"CSV failo įkėlimas"},on:{"file-updated":t.file_info},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1),t._v(" "),r("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[r("div",{attrs:{id:"printMe"}},[r("b-table",{attrs:{bordered:"",data:t.gpais}},[r("b-table-column",{attrs:{label:" "},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.index+1)+"\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Data",field:"tiekimoRinkaiData"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.tiekimoRinkaiData)+"\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Pavadinimas",field:"produktoKodas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.produktoKodas)+"\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Kiekis, pakuoteje",field:"kiekis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.kiekis)+" vnt.\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Gavimo budas",field:"gavimoBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.gavimoBudas)+"\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Veiklos budas",field:"veiklosBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.veiklosBudas)+"\n        ")]}}])}),t._v(" "),r("b-table-column",{attrs:{label:"Svoris, t.",field:"vienos_pakuotes_svoris_tonomis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.vienos_pakuotes_svoris_tonomis)+"\n        ")]}}])})],1)],1),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"buttons"},[r("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")]),t._v(" "),r("b-button",{attrs:{tag:"a",type:"is-dark",size:"is-medium","icon-left":"download",href:"gpais/get_xml",target:"_blank"}},[t._v("\n      ATSISIŲSTI\n    ")])],1)])],1)}),[],!1,null,null,null).exports}}]);