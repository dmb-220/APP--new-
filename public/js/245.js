"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[245],{37263:(t,s,i)=>{i.d(s,{Z:()=>a});const e={name:"CardToolbar",props:{isMobile:{type:Boolean,default:!1}}};const a=(0,i(51900).Z)(e,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"notification is-card-toolbar"},[s("div",{staticClass:"level",class:{"is-mobile":t.isMobile}},[s("div",{staticClass:"level-left"},[s("div",{staticClass:"level-item"},[t._t("left")],2)]),t._v(" "),s("div",{staticClass:"level-right"},[s("div",{staticClass:"level-item"},[t._t("right")],2)])])])}),[],!1,null,null,null).exports},77245:(t,s,i)=>{i.r(s),i.d(s,{default:()=>n});var e=i(73727);const a={name:"Prekes",components:{CardToolbar:i(37263).Z,CardComponent:e.Z},data:function(){return{isFullPage:!0,isLoading:!1,isModalLikutis:!1,labelPosition:"on-border",adv:{header:!1},separator:!0,fields:["kiekis","preke","sand_is","sand_i","nr"],columns:[{label:"Kiekis",field:"kiekis"},{label:"Prekė",field:"preke"},{label:"Sandelis is",field:"sand_is"},{label:"Sandelis i",field:"sand_i"},{label:"Blanko nr.",field:"nr"}],dates:[],salis:{LT:1,LV:0,EE:0},sarasas:[],kiekis:[],settings:[],list:[],checkboxGroup:[]}},computed:{},created:function(){this.getData()},methods:{currentDate:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+".csv"},print:function(){this.mobile_card=!1,this.$htmlToPaper("printMe")},change_lt:function(){this.salis.LT=1,this.salis.LV=0,this.salis.EE=0,this.list=this.sarasas[1]},change_lv:function(){this.salis.LT=0,this.salis.LV=1,this.salis.EE=0,this.list=this.sarasas[2]},change_ee:function(){this.salis.LT=0,this.salis.LV=0,this.salis.EE=1,this.list=this.sarasas[3]},getData:function(){var t=this;this.isLoading=!0,this.axios.get("/stock_quant").then((function(s){t.isLoading=!1,t.sarasas=s.data.sarasas,t.kiekis=s.data.kiekis,t.settings=s.data.settings,t.list=t.sarasas[1]})).catch((function(s){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(s.message),type:"is-danger",queue:!1})}))}}};const n=(0,i(51900).Z)(a,(function(){var t=this,s=t._self._c;return s("div",[s("section",{staticClass:"section is-main-section"},[s("b-loading",{attrs:{"is-full-page":t.isFullPage},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}}),t._v(" "),s("card-component",{attrs:{title:"VALDYMAS",icon:"account-multiple"}},[s("b-field",{attrs:{label:"PAIEŠKA","label-position":t.labelPosition}},[s("b-taginput",{attrs:{ellipsis:"",icon:"label",placeholder:"Pridėti prekę","aria-close-label":"Ištrinti prekę"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.paieska_post.apply(null,arguments)}},model:{value:t.settings.tags,callback:function(s){t.$set(t.settings,"tags",s)},expression:"settings['tags']"}})],1),t._v(" "),s("b-field",{attrs:{label:"MIN kiekis","label-position":t.labelPosition}},[s("b-numberinput",{attrs:{min:0},model:{value:t.settings.min,callback:function(s){t.$set(t.settings,"min",s)},expression:"settings['min']"}})],1),t._v(" "),s("b-field",[s("b-checkbox",{attrs:{type:"is-info"},model:{value:t.settings.paieska_big,callback:function(s){t.$set(t.settings,"paieska_big",s)},expression:"settings['paieska_big']"}},[t._v("Aktivuoti išplėstinę paieška")])],1),t._v(" "),s("b-field",{attrs:{horizontal:""}},[s("b-button",{attrs:{type:t.salis.LT?"is-primary":"is-dark"},on:{click:function(s){return t.change_lt()}}},[t._v("LIETUVA")]),t._v(" "),s("b-button",{attrs:{type:t.salis.LV?"is-warning":"is-dark"},on:{click:function(s){return t.change_lv()}}},[t._v("LATVIJA")]),t._v(" "),s("b-button",{attrs:{type:t.salis.EE?"is-danger":"is-dark"},on:{click:function(s){return t.change_ee()}}},[t._v("ESTIJA")])],1),t._v(" "),s("div",{staticClass:"buttons"},[s("b-button",{attrs:{size:"is-medium","icon-left":"desktop-classic",type:"is-dark"}},[t._v("\n          RODYTI\n        ")])],1)],1),t._v(" "),s("card-component",{attrs:{title:"Prekės",icon:"account-multiple"}},[s("div",{attrs:{id:"printMe"}},[s("b-table",{attrs:{bordered:"",narrowed:!0,data:t.list,"sort-icon":"arrow-up",loading:t.isLoading,"default-sort-direction":"asc","default-sort":"preke"}},[s("b-table-column",{attrs:{label:"Sandelis",width:"300"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold has-background-grey-light"},[t._v(t._s(i.index))]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"buttons"},[s("b-button",{attrs:{type:"is-danger","icon-right":"delete"}})],1),t._v(" "),s("br"),t._v("\n          "+t._s(t.checkboxGroup[i.index])+"\n          ")]}}])}),t._v(" "),s("b-table-column",{attrs:{label:"Prekes"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("table",{staticClass:"table"},[s("thead",[s("tr",[s("th",{staticClass:"has-background-grey-light",attrs:{width:"200"}},[t._v("Kodas")]),t._v(" "),s("th",{staticClass:"has-background-grey-light"},[t._v("Kiekis")]),t._v(" "),s("th",{staticClass:"has-background-grey-light"},[t._v("VISO")])])]),t._v(" "),s("tbody",t._l(i.row,(function(e,a){return s("tr",{key:a},[s("td",[s("b-checkbox",{attrs:{"native-value":a},model:{value:t.checkboxGroup[i.index],callback:function(s){t.$set(t.checkboxGroup,i.index,s)},expression:"checkboxGroup[props.index]"}},[t._v("\n                    "+t._s(a)+"\n                  ")])],1),t._v(" "),s("td",[t._v(t._s(e.kiekis))]),t._v(" "),s("td",{staticClass:"has-background-grey-lighter"},[t._v(t._s(t.kiekis[a]))])])})),0)])]}}])})],1),t._v(" "),s("br")],1),t._v(" "),s("hr"),t._v(" "),s("div",{staticClass:"buttons"},[s("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:t.print}},[t._v("SPAUSDINTI")]),t._v(" "),s("vue-excel-xlsx",{staticClass:"button is-dark is-medium",attrs:{data:t.csv,columns:t.columns,filename:"perkelimai",sheetname:"LT"}},[t._v("\n        ATSISIŲSTI (excel)\n      ")]),t._v(" "),s("download-csv",{staticClass:"button is-dark is-medium",attrs:{data:t.csv,fields:t.fields,delimiter:";","separator-excel":t.separator,advancedOptions:t.adv,name:t.currentDate()}},[t._v("\n        ATSISIŲSTI (csv)\n      ")])],1)])],1)])}),[],!1,null,"332822a7",null).exports}}]);