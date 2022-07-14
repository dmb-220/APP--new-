"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[807],{36807:(t,i,e)=>{e.r(i),e.d(i,{default:()=>s});const n={name:"GPAIS",components:{CardComponent:e(87286).Z},data:function(){return{gpaisData:[],isLoading:!1,isFullPage:!0,labelPosition:"on-border",ModalActive:!1,ModalActive2:!1}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/v2/").then((function(i){t.isLoading=!1,t.gpaisData=i.data.data})).catch((function(i){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(i.message),type:"is-danger"})}))}}};const s=(0,e(51900).Z)(n,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{staticClass:"section is-main-section"},[e("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}}),t._v(" "),e("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[e("b-field",{staticClass:"has-addons has-addons-centered"},[e("b-dropdown",{attrs:{"aria-role":"list"},scopedSlots:t._u([{key:"trigger",fn:function(t){var i=t.active;return[e("b-button",{attrs:{label:"Įmonės",type:"is-info","icon-left":"briefcase-plus","icon-right":i?"menu-up":"menu-down"}})]}}])},[t._v(" "),e("b-dropdown-item",{attrs:{value:"company",type:"is-info","aria-role":"listitem"}},[e("b-icon",{attrs:{icon:"plus"}}),t._v("\n            Naujas\n        ")],1)],1),t._v(" "),e("b-dropdown",{attrs:{"aria-role":"list"},scopedSlots:t._u([{key:"trigger",fn:function(t){var i=t.active;return[e("b-button",{attrs:{label:"Sąskatos",type:"is-info is-light","icon-left":"book-plus","icon-right":i?"menu-up":"menu-down"}})]}}])},[t._v(" "),e("b-dropdown-item",{attrs:{value:"invoice",type:"is-info is-light","aria-role":"listitem"}},[e("b-icon",{attrs:{icon:"plus"}}),t._v("\n            Naujas\n        ")],1)],1)],1)],1),t._v(" "),e("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[e("b-table",{attrs:{bordered:"",data:t.gpaisData,loading:t.isLoading}},[e("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(i.row.sandelis))])]}}])}),t._v(" "),e("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(t){}}])}),t._v(" "),e("b-table-column",{attrs:{width:"50px",centered:""},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"buttons"},[e("b-button",{attrs:{size:"is-medium","icon-right":"calendar-check",type:"is-info"},on:{click:function(e){return t.add(i.row.sandelis)}}}),t._v(" "),i.row.sandelis in t.list?e("b-button",{attrs:{"icon-right":"account-edit",size:"is-medium",type:"is-primary"},on:{click:function(e){return t.edit(i.row.sandelis)}}}):e("b-button",{attrs:{size:"is-medium","icon-right":"account-edit",type:"is-primary",disabled:""}})],1)]}}])}),t._v(" "),e("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[e("div",{staticClass:"content has-text-centered"},[t.isLoading?[e("p",[e("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),e("p",[t._v("Gaunami duomenys...")])]:[e("p",[e("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),e("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1)],1)}),[],!1,null,null,null).exports}}]);