"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[929],{37263:(t,e,a)=>{a.d(e,{Z:()=>n});const i={name:"CardToolbar",props:{isMobile:{type:Boolean,default:!1}}};const n=(0,a(51900).Z)(i,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"notification is-card-toolbar"},[e("div",{staticClass:"level",class:{"is-mobile":t.isMobile}},[e("div",{staticClass:"level-left"},[e("div",{staticClass:"level-item"},[t._t("left")],2)]),t._v(" "),e("div",{staticClass:"level-right"},[e("div",{staticClass:"level-item"},[t._t("right")],2)])])])}),[],!1,null,null,null).exports},98274:(t,e,a)=>{a.d(e,{Z:()=>n});const i={name:"ModalBox",props:{isActive:{type:Boolean,default:!1},confirmLabel:{type:String,default:"Patvirtinti"},confirmType:{type:String,default:"is-info"}},data:function(){return{isModalActive:!1}},computed:{confirmButtonClass:function(){return"button ".concat(this.confirmType)}},methods:{cancel:function(){this.$emit("cancel")},confirm:function(){this.$emit("confirm")}},watch:{isActive:function(t){this.isModalActive=t},isModalActive:function(t){t||this.cancel()}}};const n=(0,a(51900).Z)(i,(function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{active:t.isModalActive,"has-modal-card":""},on:{"update:active":function(e){t.isModalActive=e}}},[e("div",{staticClass:"modal-card"},[e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[t._v("Informacija")])]),t._v(" "),e("section",{staticClass:"modal-card-body"},[t._t("default")],2),t._v(" "),e("footer",{staticClass:"modal-card-foot"},[e("button",{staticClass:"button",attrs:{type:"button"},on:{click:t.cancel}},[t._v("Atšaukti")]),t._v(" "),e("button",{class:t.confirmButtonClass,on:{click:t.confirm}},[t._v(t._s(t.confirmLabel))])])])])}),[],!1,null,null,null).exports},71423:(t,e,a)=>{a.d(e,{Z:()=>n});const i={name:"ModalTrashBox",components:{ModalBox:a(98274).Z},props:{isActive:{type:Boolean,default:!1},trashSubject:{type:String,default:null}},methods:{cancel:function(){this.$emit("cancel")},confirm:function(){this.$emit("confirm")}}};const n=(0,a(51900).Z)(i,(function(){var t=this,e=t._self._c;return e("modal-box",{attrs:{"is-active":t.isActive,"confirm-type":"is-danger","confirm-label":"Ištrinti"},on:{"update:isActive":function(e){t.isActive=e},"update:is-active":function(e){t.isActive=e},confirm:t.confirm,cancel:t.cancel}},[e("p",[t._v("This will permanently delete "),e("b",[t._v(t._s(t.trashSubject))])]),t._v(" "),e("p",[t._v("Action could not be undone")])])}),[],!1,null,null,null).exports},8929:(t,e,a)=>{a.r(e),a.d(e,{default:()=>c});var i=a(73727),n=a(37263),s=a(71423);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var i,n,s=[],o=!0,r=!1;try{for(a=a.call(t);!(o=(i=a.next()).done)&&(s.push(i.value),!e||s.length!==e);o=!0);}catch(t){r=!0,n=t}finally{try{o||null==a.return||a.return()}finally{if(r)throw n}}return s}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}const l={name:"Barcode",components:{CardToolbar:n.Z,CardComponent:i.Z,ModalTrashBox:s.Z},data:function(){return{filename:"failas",sheetname:"pirmas lapas",lt:["MINS","TELS","MADA","MARI","NORF","BIGA","BABI","UKME","MANT","VISA","KEDA","AREN","MAXI","PANE","MAZE","TAIK","SAUL","TAUB"],barcode:"",old_barcode:"",kiekis:0,barlist:[],interval:0,columns:[{label:"Barkodas",field:"kodas"},{label:"Kiekis",field:"kiekis"}],isModalActive:!1,trashObject:null,trashObjectId:null}},computed:{viso:function(){var t=[];return Object.entries(this.barlist).forEach((function(e){var a=o(e,2),i=(a[0],a[1]);t.push(i.kiekis)})),t.reduce((function(t,e){return t+e}),0)},trashObjectName:function(){return this.trashObject?this.trashObject:null}},mounted:function(){var t=this;window.addEventListener("keydown",(function(e){if(t.interval&&clearInterval(t.interval),"Enter"==e.code){t.barcode&&(t.old_barcode=t.barcode),t.kiekis=1;var a=t.barlist.findIndex((function(e){return e.kodas===t.barcode}));return-1==a?t.barlist.push({kodas:t.barcode,kiekis:parseInt(t.kiekis)}):t.barlist[a].kiekis+=1,void(t.barcode="")}"Shift"!=e.key&&(t.barcode+=e.key,t.interval=setInterval((function(){return t.barcode=""}),20))}))},methods:{manual_add:function(){var t=this;if(console.log("RANKINIS"),this.old_barcode&&this.kiekis>0)var e=this.barlist.findIndex((function(e){return e.kodas===t.old_barcode}));-1==e?this.barlist.push({kodas:this.old_barcode,kiekis:parseInt(this.kiekis)}):this.barlist[e].kiekis+=parseInt(this.kiekis),this.kiekis=1},delete_barcode:function(){for(var t=[],e=0,a=0;a<this.barlist.length;a++)a!==this.trashObjectId&&(t[e]=this.barlist[a],e++,console.log(this.barlist[a]));this.barlist=t,console.log("Istrinta")},trashModal:function(t,e){this.trashObject=t,this.trashObjectId=e,this.isModalActive=!0},trashConfirm:function(){this.isModalActive=!1,this.delete_barcode()},trashCancel:function(){this.isModalActive=!1}}};const c=(0,a(51900).Z)(l,(function(){var t=this,e=t._self._c;return e("div",[e("section",{staticClass:"section is-main-section"},[e("modal-trash-box",{attrs:{"is-active":t.isModalActive,"trash-subject":t.trashObjectName},on:{confirm:t.trashConfirm,cancel:t.trashCancel}}),t._v(" "),e("card-component",{attrs:{title:"VALDYMAS",icon:"account-multiple"}},[e("b-field",{attrs:{label:"Parduotuvė:",horizontal:""}},[e("b-select",{attrs:{placeholder:"Pasirinkite",expanded:""}},t._l(t.lt,(function(a,i){return e("option",{key:a,domProps:{value:i}},[t._v(t._s(a))])})),0)],1),t._v(" "),e("hr"),t._v(" "),e("b-button",{attrs:{size:"is-medium",type:"is-dark"}},[t._v("IŠSAUGOTI")]),t._v(" "),e("vue-excel-xlsx",{staticClass:"button is-dark is-medium",attrs:{data:t.barlist,columns:t.columns,filename:t.filename,sheetname:t.sheetname}},[t._v("\n          ATSISŪSTI\n      ")])],1),t._v(" "),e("card-component",{attrs:{title:"Barkodai",icon:"account-multiple"}},[e("b-field",{attrs:{horizontal:"",label:"Paskutinis barkodas:"}},[e("b-input",{attrs:{name:"barcode",expanded:""},model:{value:t.old_barcode,callback:function(e){t.old_barcode=e},expression:"old_barcode"}}),t._v(" "),e("b-input",{attrs:{name:"kiekis",expanded:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"space",32,e.key,[" ","Spacebar"])?null:t.manual_add()}},model:{value:t.kiekis,callback:function(e){t.kiekis=e},expression:"kiekis"}}),t._v(" "),e("p",{staticClass:"control"},[e("b-button",{attrs:{label:"OK",type:"is-info",expanded:""},on:{click:function(e){return e.preventDefault(),t.manual_add()}}})],1)],1),t._v(" "),e("hr"),t._v(" "),e("b-table",{attrs:{bordered:"",narrowed:!0,data:t.barlist}},[e("b-table-column",{attrs:{label:"Nr."},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.index+1)+"\n          ")]}}])}),t._v(" "),e("b-table-column",{attrs:{label:"Barkodas",field:"kodas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.kodas)+"\n          ")]}}])}),t._v(" "),e("b-table-column",{staticClass:"has-text-right",attrs:{label:"Kiekis",field:"kiekis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.kiekis)+"\n          ")]}}])}),t._v(" "),e("b-table-column",{attrs:{label:"..."},scopedSlots:t._u([{key:"default",fn:function(a){return[e("b-button",{attrs:{type:"is-danger","icon-right":"delete"},on:{click:function(e){return e.preventDefault(),t.trashModal(a.row.kodas,a.index)}}})]}}])}),t._v(" "),e("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[e("div",{staticClass:"content has-text-centered"},[[e("p",[e("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),e("p",[t._v("Duomenų nerasta …")])]],2)]),t._v(" "),e("template",{slot:"footer"},[e("th",{staticClass:"has-text-right"},[t._v("VISO:")]),t._v(" "),e("th"),t._v(" "),e("th",{staticClass:"has-text-left"},[t._v(t._s(t.viso))])])],2)],1)],1)])}),[],!1,null,"5b0039c2",null).exports}}]);