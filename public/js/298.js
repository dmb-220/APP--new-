"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[298],{37263:(s,t,i)=>{i.d(t,{Z:()=>a});const e={name:"CardToolbar",props:{isMobile:{type:Boolean,default:!1}}};const a=(0,i(51900).Z)(e,(function(){var s=this,t=s._self._c;return t("div",{staticClass:"notification is-card-toolbar"},[t("div",{staticClass:"level",class:{"is-mobile":s.isMobile}},[t("div",{staticClass:"level-left"},[t("div",{staticClass:"level-item"},[s._t("left")],2)]),s._v(" "),t("div",{staticClass:"level-right"},[t("div",{staticClass:"level-item"},[s._t("right")],2)])])])}),[],!1,null,null,null).exports},68298:(s,t,i)=>{i.r(t),i.d(t,{default:()=>n});var e=i(73727);const a={name:"Prekes",components:{CardToolbar:i(37263).Z,CardComponent:e.Z},data:function(){return{isFullPage:!0,isLoading:!1,isModalLikutis:!1,labelPosition:"on-border",allSelected:[],columns:[{label:"Prekė",field:"preke"},{label:"Kiekis",field:"kiekis"},{label:"Pavadinimas",field:"pavadinimas"}],dates:[],salis:{LT:1,LV:0,EE:0},salis_nr:1,sarasas:[],kiekis:[],settings:[],list:[],checkboxGroup:[]}},computed:{},created:function(){this.getData()},methods:{selectAll:function(s,t){console.log(s),console.log(t);for(var i=0,e=Object.keys(t);i<e.length;i++){var a=e[i];console.log(a+" -> "+p[a])}},suformuoti:function(){var s=this;this.isLoading=!0,axios.post("/stock_quant/store",{settings:this.settings,salis:this.salis}).then((function(t){console.log(t.data.data),s.getData(),s.$buefy.toast.open({message:"Duomenys atnaujinti!",type:"is-info"})})).catch((function(t){s.isLoading=!1,s.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger"})}))},print:function(){this.mobile_card=!1,this.$htmlToPaper("printMe")},change_lt:function(){this.salis.LT=1,this.salis.LV=0,this.salis.EE=0,this.list=this.sarasas[1],this.salis_nr=1},change_lv:function(){this.salis.LT=0,this.salis.LV=1,this.salis.EE=0,this.list=this.sarasas[2],this.salis_nr=2},change_ee:function(){this.salis.LT=0,this.salis.LV=0,this.salis.EE=1,this.list=this.sarasas[3],this.salis_nr=3},getData:function(){var s=this;this.isLoading=!0,this.axios.get("/stock_quant").then((function(t){s.isLoading=!1,s.sarasas=t.data.sarasas,s.kiekis=t.data.kiekis,s.settings=t.data.settings,s.checkboxGroup=t.data.sandeliai,s.allSelected=s.checkboxGroup,s.list=s.sarasas[1],s.settings.paieska_big=!!s.settings.paieska_big,s.settings.min=parseInt(s.settings.min)})).catch((function(t){s.isLoading=!1,s.$buefy.toast.open({message:"Error: ".concat(t.message),type:"is-danger",queue:!1})}))}}};const n=(0,i(51900).Z)(a,(function(){var s=this,t=s._self._c;return t("div",[t("section",{staticClass:"section is-main-section"},[t("b-loading",{attrs:{"is-full-page":s.isFullPage},model:{value:s.isLoading,callback:function(t){s.isLoading=t},expression:"isLoading"}}),s._v(" "),t("card-component",{attrs:{title:"VALDYMAS",icon:"account-multiple"}},[t("b-field",{attrs:{label:"PAIEŠKA","label-position":s.labelPosition}},[t("b-taginput",{attrs:{ellipsis:"",icon:"label"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&s._k(t.keyCode,"enter",13,t.key,"Enter")?null:s.suformuoti.apply(null,arguments)}},model:{value:s.settings.tags,callback:function(t){s.$set(s.settings,"tags",t)},expression:"settings['tags']"}})],1),s._v(" "),t("b-field",{attrs:{label:"MIN kiekis","label-position":s.labelPosition}},[t("b-numberinput",{attrs:{min:0},model:{value:s.settings.min,callback:function(t){s.$set(s.settings,"min",t)},expression:"settings['min']"}})],1),s._v(" "),t("b-field",[t("b-checkbox",{attrs:{type:"is-info"},model:{value:s.settings.paieska_big,callback:function(t){s.$set(s.settings,"paieska_big",t)},expression:"settings['paieska_big']"}},[s._v("Aktivuoti išplėstinę paieška")])],1),s._v(" "),t("b-field",{attrs:{horizontal:""}},[t("b-button",{attrs:{type:s.salis.LT?"is-primary":"is-dark"},on:{click:function(t){return s.change_lt()}}},[s._v("LIETUVA")]),s._v(" "),t("b-button",{attrs:{type:s.salis.LV?"is-warning":"is-dark"},on:{click:function(t){return s.change_lv()}}},[s._v("LATVIJA")]),s._v(" "),t("b-button",{attrs:{type:s.salis.EE?"is-danger":"is-dark"},on:{click:function(t){return s.change_ee()}}},[s._v("ESTIJA")])],1),s._v(" "),t("div",{staticClass:"buttons"},[t("b-button",{attrs:{size:"is-medium","icon-left":"desktop-classic",type:"is-dark"},on:{click:s.suformuoti}},[s._v("\n          RODYTI\n        ")])],1)],1),s._v(" "),t("card-component",{attrs:{title:"Prekės",icon:"account-multiple"}},[t("div",{attrs:{id:"printMe"}},[t("b-table",{attrs:{bordered:"",narrowed:!0,data:s.list,"sort-icon":"arrow-up",loading:s.isLoading,"default-sort-direction":"asc","default-sort":"preke"}},[t("b-table-column",{attrs:{label:"Sandelis",width:"300"},scopedSlots:s._u([{key:"default",fn:function(i){return[t("div",{staticClass:"is-size-2 has-text-centered has-text-weight-bold has-background-grey-light"},[s._v(s._s(i.index))]),s._v(" "),t("br"),s._v(" "),t("div",{staticClass:"buttons"},[t("vue-excel-xlsx",{staticClass:"button is-dark",attrs:{data:s.checkboxGroup[s.salis_nr][i.index],columns:s.columns,fileName:i.index}},[s._v("\n              ATSISIŲSTI\n            ")])],1),s._v(" "),t("br"),s._v("\n          Kodai: "+s._s(s.checkboxGroup[s.salis_nr][i.index].length)+"\n        ")]}}])}),s._v(" "),t("b-table-column",{attrs:{label:"Prekes"},scopedSlots:s._u([{key:"default",fn:function(i){return[t("table",{staticClass:"table"},[t("thead",[t("tr",[t("th",{staticClass:"has-background-grey-light has-text-centered",attrs:{width:"15"}},[t("b-button",{attrs:{size:"is-small","icon-right":"check"},on:{click:function(t){return s.selectAll(i.index,i.row)}}})],1),s._v(" "),t("th",{staticClass:"has-background-grey-light",attrs:{width:"200"}},[s._v("Kodas")]),s._v(" "),t("th",{staticClass:"has-background-grey-light"},[s._v("Kiekis")]),s._v(" "),t("th",{staticClass:"has-background-grey-light"},[s._v("VISO")])])]),s._v(" "),t("tbody",s._l(i.row,(function(i,e){return t("tr",{key:e},[t("td",{staticClass:"has-text-centered"},[t("b-checkbox",{attrs:{"native-value":i},model:{value:s.checkboxGroup[s.salis_nr][i.sandelis],callback:function(t){s.$set(s.checkboxGroup[s.salis_nr],i.sandelis,t)},expression:"checkboxGroup[salis_nr][item.sandelis]"}})],1),s._v(" "),t("td",[s._v(s._s(e))]),s._v(" "),t("td",[s._v(s._s(i.kiekis))]),s._v(" "),t("td",{staticClass:"has-background-grey-lighter"},[s._v(s._s(s.kiekis[e]))])])})),0)])]}}])})],1),s._v(" "),t("br")],1),s._v(" "),t("hr"),s._v(" "),t("div",{staticClass:"buttons"},[t("b-button",{attrs:{size:"is-medium","icon-left":"printer",type:"is-dark"},on:{click:s.print}},[s._v("SPAUSDINTI")])],1)])],1)])}),[],!1,null,"2be996d6",null).exports}}]);