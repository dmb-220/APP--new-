(self.webpackChunk=self.webpackChunk||[]).push([[292],{62705:(t,e,n)=>{var r=n(55639).Symbol;t.exports=r},77412:t=>{t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}},14636:(t,e,n)=>{var r=n(22545),o=n(35694),a=n(1469),i=n(44144),s=n(65776),l=n(36719),u=Object.prototype.hasOwnProperty;t.exports=function(t,e){var n=a(t),c=!n&&o(t),d=!n&&!c&&i(t),p=!n&&!c&&!d&&l(t),f=n||c||d||p,b=f?r(t.length,String):[],v=b.length;for(var m in t)!e&&!u.call(t,m)||f&&("length"==m||d&&("offset"==m||"parent"==m)||p&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||s(m,v))||b.push(m);return b}},89881:(t,e,n)=>{var r=n(47816),o=n(99291)(r);t.exports=o},28483:(t,e,n)=>{var r=n(25063)();t.exports=r},47816:(t,e,n)=>{var r=n(28483),o=n(3674);t.exports=function(t,e){return t&&r(t,e,o)}},44239:(t,e,n)=>{var r=n(62705),o=n(89607),a=n(2333),i=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?o(t):a(t)}},9454:(t,e,n)=>{var r=n(44239),o=n(37005);t.exports=function(t){return o(t)&&"[object Arguments]"==r(t)}},38749:(t,e,n)=>{var r=n(44239),o=n(41780),a=n(37005),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,t.exports=function(t){return a(t)&&o(t.length)&&!!i[r(t)]}},280:(t,e,n)=>{var r=n(25726),o=n(86916),a=Object.prototype.hasOwnProperty;t.exports=function(t){if(!r(t))return o(t);var e=[];for(var n in Object(t))a.call(t,n)&&"constructor"!=n&&e.push(n);return e}},22545:t=>{t.exports=function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}},7518:t=>{t.exports=function(t){return function(e){return t(e)}}},54290:(t,e,n)=>{var r=n(6557);t.exports=function(t){return"function"==typeof t?t:r}},99291:(t,e,n)=>{var r=n(98612);t.exports=function(t,e){return function(n,o){if(null==n)return n;if(!r(n))return t(n,o);for(var a=n.length,i=e?a:-1,s=Object(n);(e?i--:++i<a)&&!1!==o(s[i],i,s););return n}}},25063:t=>{t.exports=function(t){return function(e,n,r){for(var o=-1,a=Object(e),i=r(e),s=i.length;s--;){var l=i[t?s:++o];if(!1===n(a[l],l,a))break}return e}}},31957:(t,e,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=r},89607:(t,e,n)=>{var r=n(62705),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;t.exports=function(t){var e=a.call(t,s),n=t[s];try{t[s]=void 0;var r=!0}catch(t){}var o=i.call(t);return r&&(e?t[s]=n:delete t[s]),o}},65776:t=>{var e=/^(?:0|[1-9]\d*)$/;t.exports=function(t,n){var r=typeof t;return!!(n=null==n?9007199254740991:n)&&("number"==r||"symbol"!=r&&e.test(t))&&t>-1&&t%1==0&&t<n}},25726:t=>{var e=Object.prototype;t.exports=function(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||e)}},86916:(t,e,n)=>{var r=n(5569)(Object.keys,Object);t.exports=r},31167:(t,e,n)=>{t=n.nmd(t);var r=n(31957),o=e&&!e.nodeType&&e,a=o&&t&&!t.nodeType&&t,i=a&&a.exports===o&&r.process,s=function(){try{var t=a&&a.require&&a.require("util").types;return t||i&&i.binding&&i.binding("util")}catch(t){}}();t.exports=s},2333:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5569:t=>{t.exports=function(t,e){return function(n){return t(e(n))}}},55639:(t,e,n)=>{var r=n(31957),o="object"==typeof self&&self&&self.Object===Object&&self,a=r||o||Function("return this")();t.exports=a},66073:(t,e,n)=>{t.exports=n(84486)},84486:(t,e,n)=>{var r=n(77412),o=n(89881),a=n(54290),i=n(1469);t.exports=function(t,e){return(i(t)?r:o)(t,a(e))}},6557:t=>{t.exports=function(t){return t}},35694:(t,e,n)=>{var r=n(9454),o=n(37005),a=Object.prototype,i=a.hasOwnProperty,s=a.propertyIsEnumerable,l=r(function(){return arguments}())?r:function(t){return o(t)&&i.call(t,"callee")&&!s.call(t,"callee")};t.exports=l},1469:t=>{var e=Array.isArray;t.exports=e},98612:(t,e,n)=>{var r=n(23560),o=n(41780);t.exports=function(t){return null!=t&&o(t.length)&&!r(t)}},44144:(t,e,n)=>{t=n.nmd(t);var r=n(55639),o=n(95062),a=e&&!e.nodeType&&e,i=a&&t&&!t.nodeType&&t,s=i&&i.exports===a?r.Buffer:void 0,l=(s?s.isBuffer:void 0)||o;t.exports=l},23560:(t,e,n)=>{var r=n(44239),o=n(13218);t.exports=function(t){if(!o(t))return!1;var e=r(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},41780:t=>{t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},13218:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},37005:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},36719:(t,e,n)=>{var r=n(38749),o=n(7518),a=n(31167),i=a&&a.isTypedArray,s=i?o(i):r;t.exports=s},3674:(t,e,n)=>{var r=n(14636),o=n(280),a=n(98612);t.exports=function(t){return a(t)?r(t):o(t)}},95062:t=>{t.exports=function(){return!1}},31292:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>c});var r=n(87286),o=n(66073),a=n.n(o);const i={name:"FilePickerWorks",props:{label:{type:String,default:"Pardavimo sąrašas, CSV"},message:{type:String,default:null},currentFile:{default:null}},data:function(){return{errors:{},file:null,uploadPercent:0,isUploadSuccess:!1}},computed:{fieldFileMessage:function(){return this.errors.file?this.errors.file[0]:this.isUploadSuccess?"Failas įkeltas sėkmingai":this.uploadPercent?"Įkeliama ".concat(this.uploadPercent,"%"):this.message},uploadButtonText:function(){return this.fileName?"Rinktis sekantį failą":"Pasirinkite failą"},uploadButtonIcon:function(){return this.fileName?"cloud-sync":"cloud-upload"},fieldFileType:function(){return this.errors.file?"is-danger":null},fileName:function(){return this.file?this.file.name:this.currentFile?this.currentFile:null}},methods:{upload:function(t){var e=this;this.errors={};var n=new FormData;n.append("file",this.file),this.isUploadSuccess=!1,axios.post("/works/store_works",n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:this.progressEvent}).then((function(t){e.isUploadSuccess=!0,e.$emit("file-updated",t.data.data),e.$emit("file-id-updated",t.data.data.id)})).catch((function(t){e.file=null,e.uploadPercent=0,t.response.data.errors?e.errors=t.response.data.errors:e.errors={_all:["Upload error"]},a()(e.errors,(function(t){e.$buefy.toast.open({message:t[0],type:"is-danger",queue:!1})}))}))},dropFile:function(){this.file=null,this.isUploadSuccess=!1,this.uploadPercent=0,this.$emit("file-updated",null),this.$emit("file-id-updated",null)},progressEvent:function(t){this.uploadPercent=Math.round(100*t.loaded/t.total)}}};var s=n(51900);const l=(0,s.Z)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-field",{attrs:{label:t.label,message:t.fieldFileMessage,type:t.fieldFileType}},[n("b-upload",{attrs:{"drag-drop":"",expanded:""},on:{input:t.upload},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}},[n("section",{staticClass:"section"},[n("div",{staticClass:"content has-text-centered"},[n("p",[n("b-icon",{attrs:{icon:t.uploadButtonIcon,size:"is-large"}})],1),t._v(" "),t.uploadButtonText?n("p",[t._v(t._s(t.uploadButtonText))]):t._e()])])]),t._v(" "),t.fileName?n("div",{staticClass:"control"},[n("span",{attrs:{title:t.fileName}},[t._v(t._s(t.fileName)+" ")])]):t._e()],1)}),[],!1,null,null,null).exports,u={name:"Works",components:{CardComponent:r.Z,FilePickerWorks:l},data:function(){return{works:[],nuo:new Date,iki:new Date,isLoading:!1,isFullPage:!0,defaultOpenedDetails:[1],showDetailIcon:!1,isNarrowed:!0,mobile_card:!0,file_works:null,failas_works:""}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{file_info_works:function(t){this.failas_works=t.name},print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/works").then((function(e){t.isLoading=!1,t.works=e.data.works,t.nuo=new Date(Date.parse(e.data.nuo_iki.nuo)),t.iki=new Date(Date.parse(e.data.nuo_iki.iki))})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))},suformuoti:function(){var t=this;this.isLoading=!0,axios.post("/works/store",{file_works:this.failas_works,nuo:this.nuo,iki:this.iki}).then((function(e){console.log(e.data.data),t.getData(),t.$buefy.toast.open({message:"Duomenys atnaujinti!",type:"is-info"})})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const c=(0,s.Z)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-main-section"},[n("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),n("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[n("file-picker-works",{on:{"file-updated":t.file_info_works},model:{value:t.file_works,callback:function(e){t.file_works=e},expression:"file_works"}}),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("b-datepicker",{attrs:{placeholder:"Pasirinkite data NUO",icon:"calendar-today",editable:""},model:{value:t.nuo,callback:function(e){t.nuo=e},expression:"nuo"}})],1),t._v(" "),n("div",{staticClass:"column"},[n("b-datepicker",{attrs:{placeholder:"Pasirinkite data IKI",icon:"calendar-today",editable:""},model:{value:t.iki,callback:function(e){t.iki=e},expression:"iki"}})],1)]),t._v(" "),n("p",{staticClass:"control"},[n("button",{staticClass:"button is-dark",on:{click:t.suformuoti}},[t._v("Skaičiuoti")])])],1),t._v(" "),n("card-component",{attrs:{title:"Darbo apskaita",icon:"account-multiple"}},[n("p",{staticClass:"has-text-centered is-size-4 has-text-weight-semibold"},[t._v("\n      "+t._s(t.nuo.toLocaleDateString("en-CA"))+" - "+t._s(t.iki.toLocaleDateString("en-CA"))+"\n    ")]),t._v(" "),n("div",{attrs:{id:"printMe"}},[n("b-table",{attrs:{bordered:"",data:t.works,loading:t.isLoading}},[n("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(e.row.sandelis))])]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("b-table",{attrs:{data:e.row.pardavejos}},[n("b-table-column",{attrs:{label:"Pardaveja",width:"300",field:"pardaveja"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n                  "+t._s(e.row.pardaveja)+" \n              ")]}}],null,!0)}),t._v(" "),n("b-table-column",{attrs:{label:"Apyvarta",field:"suma"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n                  "+t._s(e.row.suma.toFixed(2))+" € \n              ")]}}],null,!0)}),t._v(" "),n("b-table-column",{attrs:{label:"Grazinimai",field:"graza"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.graza?n("div",[t._v(t._s(e.row.graza.toFixed(2))+" €")]):n("div",[t._v("0 €")])]}}],null,!0)})],1)]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Inv. trukumai"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n          trukumai\n        ")]}}])}),t._v(" "),n("b-table-column",{staticClass:"is-actions-cell",attrs:{"custom-key":"actions"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"buttons is-right"},[n("button",{staticClass:"button is-small is-primary",attrs:{type:"button"}},[n("b-icon",{attrs:{icon:"account-edit",size:"is-small"}})],1),t._v(" "),n("button",{staticClass:"button is-small is-danger",attrs:{type:"button"}},[n("b-icon",{attrs:{icon:"trash-can",size:"is-small"}})],1)])]}}])}),t._v(" "),n("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"content has-text-centered"},[t.isLoading?[n("p",[n("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),n("p",[t._v("Gaunami duomenys...")])]:[n("p",[n("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),n("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"buttons"},[n("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")])],1)])],1)}),[],!1,null,null,null).exports}}]);