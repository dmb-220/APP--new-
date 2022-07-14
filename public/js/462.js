"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[462],{37263:(t,e,s)=>{s.d(e,{Z:()=>i});const a={name:"CardToolbar",props:{isMobile:{type:Boolean,default:!1}}};const i=(0,s(51900).Z)(a,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"notification is-card-toolbar"},[e("div",{staticClass:"level",class:{"is-mobile":t.isMobile}},[e("div",{staticClass:"level-left"},[e("div",{staticClass:"level-item"},[t._t("left")],2)]),t._v(" "),e("div",{staticClass:"level-right"},[e("div",{staticClass:"level-item"},[t._t("right")],2)])])])}),[],!1,null,null,null).exports},21462:(t,e,s)=>{s.r(e),s.d(e,{default:()=>l});var a=s(73727);function i(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}const n={name:"Prekes",components:{CardToolbar:s(37263).Z,CardComponent:a.Z},data:function(){var t;return i(t={isFullPage:!0,isLoading:!1,isModalLikutis:!1,adv:{header:!1},separator:!0,fields:["kiekis","preke","sand_is","sand_i","nr"],columns:[{label:"Kiekis",field:"kiekis"},{label:"Prekė",field:"preke"},{label:"Sandelis is",field:"sand_is"},{label:"Sandelis i",field:"sand_i"},{label:"Blanko nr.",field:"nr"}],dates:[]},"isLoading",!1),i(t,"sarasas",[]),i(t,"kiekis",[]),t},computed:{},created:function(){this.getData()},methods:{currentDate:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+".csv"},print:function(){this.mobile_card=!1,this.$htmlToPaper("printMe")},getData:function(){var t=this;this.isLoading=!0,this.axios.get("/stock_quant").then((function(e){t.isLoading=!1,t.sarasas=e.data.sarasas,t.kiekis=e.data.kiekis})).catch((function(e){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(e.message),type:"is-danger",queue:!1})}))}}};const l=(0,s(51900).Z)(n,(function(){var t=this,e=t._self._c;return e("div",[e("section",{staticClass:"section is-main-section"},[e("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}}),t._v(" "),e("card-component",{attrs:{title:"VALDYMAS",icon:"account-multiple"}}),t._v(" "),e("card-component",{attrs:{title:"Prekės",icon:"account-multiple"}},[e("div",{staticClass:"buttons"},[e("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")])],1),t._v(" "),e("hr"),t._v(" "),e("div",{attrs:{id:"printMe"}},[e("b-table",{attrs:{bordered:"",narrowed:!0,data:t.sarasas[1],"sort-icon":"arrow-up",loading:t.isLoading,"default-sort-direction":"asc","default-sort":"preke"}},[e("b-table-column",{attrs:{label:"Sandelis",width:"200"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold has-background-grey-light"},[t._v(t._s(s.index))])]}}])}),t._v(" "),e("b-table-column",{attrs:{label:"Prekes"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("table",{staticClass:"table"},[e("thead",[e("tr",[e("th",[t._v("Kodas")]),t._v(" "),e("th",[t._v("Kiekis")]),t._v(" "),e("th",[t._v("...")])])]),t._v(" "),e("tbody",t._l(s.row,(function(s,a){return e("tr",{staticClass:"columns"},[e("td",[t._v(t._s(a))]),t._v(" "),e("td",[t._v(t._s(s.kiekis))]),t._v(" "),e("td",[e("div",{staticClass:"buttons"},[e("b-button",{attrs:{type:"is-danger","icon-right":"delete"}})],1)])])})),0)])]}}])}),t._v(" "),e("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[e("div",{staticClass:"content has-text-centered"},[t.isLoading?[e("p",[e("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),t._v(" "),e("p",[t._v("Gaunami duomenys...")])]:[e("p",[e("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),t._v(" "),e("p",[t._v("Duomenų nerasta …")])]],2)])],1),t._v(" "),e("br")],1),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"buttons"},[e("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")]),t._v(" "),e("vue-excel-xlsx",{staticClass:"button is-dark is-medium",attrs:{data:t.csv,columns:t.columns,filename:"perkelimai",sheetname:"LT"}},[t._v("\n        ATSISIŲSTI (excel)\n      ")]),t._v(" "),e("download-csv",{staticClass:"button is-dark is-medium",attrs:{data:t.csv,fields:t.fields,delimiter:";","separator-excel":t.separator,advancedOptions:t.adv,name:t.currentDate()}},[t._v("\n        ATSISIŲSTI (csv)\n      ")])],1)])],1)])}),[],!1,null,"b6cdbfd6",null).exports}}]);