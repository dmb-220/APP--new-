"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[620],{78620:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});const s={name:"Gpais",components:{CardComponent:n(87286).Z},data:function(){return{works:"",isLoading:!1,isFullPage:!0,gpais:[]}},computed:{},created:function(){this.getData()},mounted:function(){},methods:{print:function(){this.mobile_card=!1,this.isPaginated=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.isLoading=!0,this.axios.get("/gpais").then((function(e){t.isLoading=!1,t.gpais=e.data.array})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const a=(0,n(51900).Z)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-main-section"},[n("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),n("card-component",{attrs:{title:"VALDYMAS",icon:"finance"}}),t._v(" "),n("card-component",{attrs:{title:"GPAIS",icon:"account-multiple"}},[n("div",{attrs:{id:"printMe"}},[n("b-table",{attrs:{bordered:"",data:t.gpais}},[n("b-table-column",{attrs:{label:" "},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.index+1)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Pavadinimas",field:"produktoKodas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.produktoKodas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Pakuote",field:"pakuotes_rusis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.pakuotes_rusis)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Kiekis, pakuoteje",field:"kiekis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.kiekis)+" vnt.\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Gavimo budas",field:"gavimoBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.gavimoBudas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Veiklos budas",field:"veiklosBudas"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.veiklosBudas)+"\n        ")]}}])}),t._v(" "),n("b-table-column",{attrs:{label:"Svoris, t.",field:"vienos_pakuotes_svoris_tonomis"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" \n            "+t._s(e.row.vienos_pakuotes_svoris_tonomis)+"\n        ")]}}])})],1)],1),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"buttons"},[n("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")])],1)])],1)}),[],!1,null,null,null).exports}}]);