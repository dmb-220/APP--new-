"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[673],{28673:(t,i,s)=>{s.r(i),s.d(i,{default:()=>a});const e={name:"GPAIS",components:{CardComponent:s(87286).Z},data:function(){return{gpaisData:[],isLoading:!1,isFullPage:!0,labelPosition:"on-border",ModalActive:!1,ModalActive2:!1}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var t=this;this.$buefy.toast.open({message:"Įkeliami nauji duomenys!",type:"is-info"}),this.isLoading=!0,this.axios.get("/v2/").then((function(i){t.isLoading=!1,t.gpaisData=i.data.data})).catch((function(i){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(i.message),type:"is-danger"})}))}}};const a=(0,s(51900).Z)(e,(function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("section",{staticClass:"section is-main-section"},[s("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(i){t.isLoading=i},expression:"isLoading"}}),t._v(" "),s("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}},[s("b-field",{staticClass:"has-addons has-addons-centered"},[s("p",{staticClass:"control"},[s("b-button",{attrs:{type:"is-info is-light","icon-left":"briefcase-plus",size:"is-medium"}})],1),t._v(" "),s("p",{staticClass:"control"},[s("b-button",{attrs:{type:"is-info is-light","icon-left":"archive-plus",size:"is-medium"}})],1),t._v(" "),s("p",{staticClass:"control"},[s("b-button",{attrs:{size:"is-medium","icon-left":"format-align-center"}})],1),t._v(" "),s("p",{staticClass:"control"},[s("b-button",{attrs:{size:"is-medium","icon-left":"format-align-right"}})],1),t._v(" "),s("b-input",{attrs:{placeholder:"Search...",type:"search",size:"is-medium",icon:"magnify"}})],1)],1),t._v(" "),s("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[s("b-table",{attrs:{bordered:"",data:t.gpaisData,loading:t.isLoading}},[s("b-table-column",{attrs:{label:"Sandelis",field:"sandelis"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold"},[t._v(t._s(i.row.sandelis))])]}}])}),t._v(" "),s("b-table-column",{attrs:{label:"Pardavejos"},scopedSlots:t._u([{key:"default",fn:function(t){}}])}),t._v(" "),s("b-table-column",{attrs:{width:"50px",centered:""},scopedSlots:t._u([{key:"default",fn:function(i){return[s("div",{staticClass:"buttons"},[s("b-button",{attrs:{size:"is-medium","icon-right":"calendar-check",type:"is-info"},on:{click:function(s){return t.add(i.row.sandelis)}}}),t._v(" "),i.row.sandelis in t.list?s("b-button",{attrs:{"icon-right":"account-edit",size:"is-medium",type:"is-primary"},on:{click:function(s){return t.edit(i.row.sandelis)}}}):s("b-button",{attrs:{size:"is-medium","icon-right":"account-edit",type:"is-primary",disabled:""}})],1)]}}])}),t._v(" "),s("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[s("div",{staticClass:"content has-text-centered"},[t.isLoading?[s("p",[s("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),s("p",[t._v("Gaunami duomenys...")])]:[s("p",[s("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),s("p",[t._v("Duomenų nerasta …")])]],2)])],1)],1)],1)}),[],!1,null,null,null).exports}}]);