"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[864],{6864:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});const i={name:"GPAIS",components:{CardComponent:n(87286).Z},data:function(){return{gpaisData:[],isLoading:!1,isFullPage:!0,labelPosition:"on-border",ModalActive:!1,ModalActive2:!1}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/v2/").then((function(e){t.isLoading=!1,t.gpaisData=e.data.data})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger"})}))}}};const a=(0,n(51900).Z)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-main-section"},[n("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),n("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[n("b-field",{staticClass:"has-addons has-addons-centered"},[n("b-dropdown",{attrs:{"aria-role":"menu"},scopedSlots:t._u([{key:"trigger",fn:function(t){var e=t.active;return[n("b-button",{attrs:{label:"Įmonės",type:"is-info is-light","icon-left":"briefcase-plus","icon-right":e?"menu-up":"menu-down"}})]}}])},[t._v(" "),n("b-dropdown-item",{attrs:{value:"company","aria-role":"menuitem"}},[n("b-icon",{attrs:{icon:"plus"}}),t._v("\n            Naujas\n        ")],1)],1),t._v(" "),n("b-dropdown",{attrs:{"aria-role":"menu"},scopedSlots:t._u([{key:"trigger",fn:function(t){var e=t.active;return[n("b-button",{attrs:{label:"Sąskatos",type:"is-info is-light","icon-left":"book-plus","icon-right":e?"menu-up":"menu-down"}})]}}])},[t._v(" "),n("b-dropdown-item",{attrs:{value:"invoice","aria-role":"menuitem"}},[n("b-icon",{attrs:{icon:"plus"}}),t._v("\n            Naujas\n        ")],1)],1)],1)],1),t._v(" "),n("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[n("b-table",{attrs:{bordered:"",data:t.gpaisData,loading:t.isLoading}},[n("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(e.row.sandelis))])]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(t){}}])}),t._v(" "),n("b-table-column",{attrs:{width:"50px",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"buttons"},[n("b-button",{attrs:{size:"is-medium","icon-right":"calendar-check",type:"is-info"},on:{click:function(n){return t.add(e.row.sandelis)}}}),t._v(" "),e.row.sandelis in t.list?n("b-button",{attrs:{"icon-right":"account-edit",size:"is-medium",type:"is-primary"},on:{click:function(n){return t.edit(e.row.sandelis)}}}):n("b-button",{attrs:{size:"is-medium","icon-right":"account-edit",type:"is-primary",disabled:""}})],1)]}}])}),t._v(" "),n("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"content has-text-centered"},[t.isLoading?[n("p",[n("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),n("p",[t._v("Gaunami duomenys...")])]:[n("p",[n("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),n("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1)],1)}),[],!1,null,null,null).exports}}]);