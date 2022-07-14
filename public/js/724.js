"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[724],{32724:(t,e,i)=>{i.r(e),i.d(e,{default:()=>a});const s={name:"GPAIS",components:{CardComponent:i(87286).Z},data:function(){return{gpaisData:[],isLoading:!1,isFullPage:!0,labelPosition:"on-border",ModalActive:!1,ModalActive2:!1}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/v2/").then((function(e){t.isLoading=!1,t.gpaisData=e.data.data})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger"})}))}}};const a=(0,i(51900).Z)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"section is-main-section"},[i("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),i("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[i("div",{staticClass:"buttons has-addons is-centered"},[i("b-button",{attrs:{size:"medium","icon-left":"plus"}},[t._v("\n          Naujas įrašas\n      "),i("b-button",[i("b-dropdown",{attrs:{"aria-role":"list"},scopedSlots:t._u([{key:"trigger",fn:function(t){var e=t.active;return[i("b-button",{attrs:{label:"Įmonės",size:"medium","icon-left":"briefcase-plus","icon-right":e?"menu-up":"menu-down"}})]}}])},[t._v(" "),i("b-dropdown-item",{attrs:{"aria-role":"listitem"}},[t._v("NAUJAS")])],1),t._v(" "),i("b-dropdown",{attrs:{"aria-role":"list"},scopedSlots:t._u([{key:"trigger",fn:function(t){var e=t.active;return[i("b-button",{attrs:{label:"Sąskaitos",size:"medium","icon-left":"book-plus","icon-right":e?"menu-up":"menu-down"}})]}}])},[t._v(" "),i("b-dropdown-item",{attrs:{"aria-role":"listitem"}},[t._v("Naujas")]),t._v(" "),i("b-dropdown-item",{attrs:{"aria-role":"listitem"}},[t._v("Sąskaitų sąrašas")])],1)],1)],1)],1)]),t._v(" "),i("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[i("b-table",{attrs:{bordered:"",data:t.gpaisData,loading:t.isLoading}},[i("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(e.row.sandelis))])]}}])}),t._v(" "),i("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(t){}}])}),t._v(" "),i("b-table-column",{attrs:{width:"50px",centered:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"buttons"},[i("b-button",{attrs:{size:"is-medium","icon-right":"calendar-check",type:"is-info"},on:{click:function(i){return t.add(e.row.sandelis)}}}),t._v(" "),e.row.sandelis in t.list?i("b-button",{attrs:{"icon-right":"account-edit",size:"is-medium",type:"is-primary"},on:{click:function(i){return t.edit(e.row.sandelis)}}}):i("b-button",{attrs:{size:"is-medium","icon-right":"account-edit",type:"is-primary",disabled:""}})],1)]}}])}),t._v(" "),i("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[i("div",{staticClass:"content has-text-centered"},[t.isLoading?[i("p",[i("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),i("p",[t._v("Gaunami duomenys...")])]:[i("p",[i("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),i("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1)],1)}),[],!1,null,null,null).exports}}]);