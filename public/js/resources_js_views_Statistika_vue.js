"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Statistika_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ModalBoxFull',
  props: {
    isActive: {
      type: Boolean,
      "default": false
    },
    confirmLabel: {
      type: String,
      "default": 'Patvirtinti'
    },
    confirmType: {
      type: String,
      "default": 'is-info'
    }
  },
  data: function data() {
    return {
      isModalActive: false
    };
  },
  computed: {
    confirmButtonClass: function confirmButtonClass() {
      return "button ".concat(this.confirmType);
    }
  },
  methods: {
    confirm: function confirm() {
      this.$emit('confirm');
    }
  },
  watch: {
    isActive: function isActive(newValue) {
      this.isModalActive = newValue;
    },
    isModalActive: function isModalActive(newValue) {
      if (!newValue) {//this.cancel()
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalBoxFull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalBoxFull */ "./resources/js/components/ModalBoxFull.vue");
/* harmony import */ var _components_Charts_bar_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Charts/bar.config */ "./resources/js/components/Charts/bar.config.js");
/* harmony import */ var _components_Charts_BarChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Charts/BarChart */ "./resources/js/components/Charts/BarChart.js");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ModalPardavimaitBox",
  components: {
    ModalBoxFull: _ModalBoxFull__WEBPACK_IMPORTED_MODULE_0__["default"],
    BarChart: _components_Charts_BarChart__WEBPACK_IMPORTED_MODULE_2__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    isActive: {
      type: Boolean,
      "default": false
    },
    viewSubject: {
      type: String,
      "default": ''
    },
    viewPardavimai: {
      type: Array,
      "default": null
    },
    viewLabel: {
      type: Array,
      "default": null
    }
  },
  data: function data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: _components_Charts_bar_config__WEBPACK_IMPORTED_MODULE_1__.chartOptionsMain
      },
      pardavimai: this.viewPardavimai,
      label: this.viewLabel
    };
  },
  computed: {},
  watch: {
    $props: {
      handler: function handler() {
        this.fillChartData();
      },
      deep: true,
      immediate: true
    }
  },
  mounted: function mounted() {},
  created: function created() {//console.log(this.viewPardavimai);
    //this.$parent.$on('update', this.uzklausa);
  },
  methods: {
    cancel: function cancel() {
      this.$emit('cancel');
    },
    confirm: function confirm() {
      this.$emit('confirm');
    },
    fillChartData: function fillChartData() {
      this.defaultChart.chartData = {
        datasets: [//viso
        {
          //label: 'VISO',
          fill: true,
          borderColor: _components_Charts_bar_config__WEBPACK_IMPORTED_MODULE_1__.chartColors["default"].info,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: _components_Charts_bar_config__WEBPACK_IMPORTED_MODULE_1__.chartColors["default"].info,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: _components_Charts_bar_config__WEBPACK_IMPORTED_MODULE_1__.chartColors["default"].info,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.viewPardavimai
        }],
        labels: this.viewLabel
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var _components_ModalStatistikaBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ModalStatistikaBox */ "./resources/js/components/ModalStatistikaBox.vue");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'statistika',
  components: {
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalStatistikaBox: _components_ModalStatistikaBox__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    var _settings;

    return {
      isLoading: false,
      isFullPage: true,
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      isNarrowed: true,
      mobile_card: true,
      settings: (_settings = {
        ieskoti: '',
        paieska: '',
        rodyti_lt: true,
        rodyti_lv: true,
        rodyti_ee: true,
        gam: true,
        pirk: true,
        paieska_big: false
      }, _defineProperty(_settings, "rodyti_lt", true), _defineProperty(_settings, "rodyti_lv", true), _defineProperty(_settings, "rodyti_ee", true), _defineProperty(_settings, "grupe", ''), _settings),
      pardavimai: [],
      viso_pard: '',
      viso_lik: '',
      grupes: [],
      grupes_lv: [],
      isModalView: false,
      viewObject: null,
      viewPardavimai: null,
      viewLabel: null
    };
  },
  computed: {
    viewObjectName: function viewObjectName() {
      if (this.viewObject) {
        return this.viewObject;
      }

      return null;
    },
    viewName: function viewName() {
      if (this.viewPardavimai) {
        return this.viewPardavimai;
      }

      return null;
    },
    labelName: function labelName() {
      if (this.viewLabel) {
        return this.viewLabel;
      }

      return null;
    }
  },
  created: function created() {
    this.getData();
  },
  methods: {
    onClass: function onClass(row) {
      if (row.salis == 1) {
        return "is-one2";
      }

      if (row.salis == 2) {
        return "is-two2";
      }

      if (row.salis == 3) {
        return "is-three2";
      }
    },
    print: function print() {
      // Pass the element id here
      this.mobile_card = false;
      this.$htmlToPaper('printMe');
    },
    change_gam: function change_gam() {
      this.settings['gam'] = !this.settings['gam'];
      this.settings['ieskoti'] = this.settings['paieska'];
      this.paieska_post();
    },
    change_pirk: function change_pirk() {
      this.settings['pirk'] = !this.settings['pirk'];
      this.settings['ieskoti'] = this.settings['paieska'];
      this.paieska_post();
    },
    change_lt: function change_lt() {
      this.settings['rodyti_lt'] = !this.settings['rodyti_lt'];
      this.settings['ieskoti'] = this.settings['paieska'];
      this.paieska_post();
    },
    change_lv: function change_lv() {
      this.settings['rodyti_lv'] = !this.settings['rodyti_lv'];
      this.settings['ieskoti'] = this.settings['paieska'];
      this.paieska_post();
    },
    change_ee: function change_ee() {
      this.settings['rodyti_ee'] = !this.settings['rodyti_ee'];
      this.settings['ieskoti'] = this.settings['paieska'];
      this.paieska_post();
    },
    keisti_grupe: function keisti_grupe() {
      if (!this.settings['ieskoti']) {
        this.settings['ieskoti'] = this.settings['paieska'];
      }

      this.paieska_post();
    },
    paieska_post: function paieska_post() {
      var _this = this;

      axios.post("/statistika/store", {
        ieskoti: this.settings['ieskoti'],
        lt: this.settings['rodyti_lt'],
        lv: this.settings['rodyti_lv'],
        ee: this.settings['rodyti_ee'],
        gam: this.settings['gam'],
        pirk: this.settings['pirk'],
        paieska_big: this.settings['paieska_big'],
        grupe: this.settings['grupe']
      }).then(function (response) {
        console.log(response.data.data);

        _this.getData();
      })["catch"](function (err) {
        _this.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    getData: function getData() {
      var _this2 = this;

      this.isLoading = true;
      this.axios.get('/statistika').then(function (response) {
        _this2.isLoading = false;
        _this2.pardavimai = response.data.data;
        _this2.viso_pard = response.data.viso_pard;
        _this2.viso_lik = response.data.viso_lik;
        _this2.grupes = response.data.grupes;
        _this2.grupes_lv = response.data.grupes_lv;
        _this2.settings = response.data.settings;
      })["catch"](function (err) {
        _this2.isLoading = false;

        _this2.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },

    /*viewModal_pardavimai2(viewObject) {
      let data = [];
      let pardavimai = [];
      let label = [];
      //gaunam duomenis is DB
      this.isLoading = true
      this.axios
      .get('/statistika/'+ viewObject)
      .then(response => {
        this.isLoading = false
        data = response.data.data;
        
        //paruosiam CHART rodymui
        for (let i = 0; i < data.length; i++) {
          pardavimai.push(data[i]['kiekis'])
          label.push(data[i]['data'])   
        }
        this.viewPardavimai = pardavimai
        this.viewLabel = label
      })
      .catch( err => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })
       this.viewObject = viewObject
      this.isModalView = true
    },*/
    viewModal_pardavimai: function viewModal_pardavimai(viewObject, viewPard) {
      //console.log(viewPardavimai);
      var pardavimai = [];
      var label = [];
      var i;
      var sk = viewPard.length;

      for (i = 0; i < sk; i++) {
        pardavimai.push(viewPard[i]['kiekis']);
        label.push(viewPard[i]['data']);
      }

      this.viewObject = viewObject;
      this.viewPardavimai = pardavimai;
      this.viewLabel = label;
      this.isModalView = true; //this.$emit('update');
    },
    viewConfirm: function viewConfirm() {
      this.isModalView = false;
    },
    viewCancel: function viewCancel() {
      this.isModalView = false;
    }
  }
});

/***/ }),

/***/ "./resources/js/components/Charts/BarChart.js":
/*!****************************************************!*\
  !*** ./resources/js/components/Charts/BarChart.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'bar-chart',
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__.Bar,
  mixins: [vue_chartjs__WEBPACK_IMPORTED_MODULE_0__.mixins.reactiveProp],
  props: {
    extraOptions: Object
  },
  data: function data() {
    return {
      ctx: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$watch('chartData', function (newVal, oldVal) {
      if (!oldVal) {
        _this.renderChart(_this.chartData, _this.extraOptions);
      }
    }, {
      immediate: true
    });
  }
});

/***/ }),

/***/ "./resources/js/components/Charts/bar.config.js":
/*!******************************************************!*\
  !*** ./resources/js/components/Charts/bar.config.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chartColors": () => (/* binding */ chartColors),
/* harmony export */   "baseChartOptions": () => (/* binding */ baseChartOptions),
/* harmony export */   "chartOptionsMain": () => (/* binding */ chartOptionsMain)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chartColors = {
  "default": {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860',
    lietuva: '#5b9600',
    latvija: 'GoldenRod',
    estija: 'tomato',
    viso: 'black'
  }
};
var baseChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  responsive: true
};
var chartOptionsMain = _objectSpread(_objectSpread({}, baseChartOptions), {}, {
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  scales: {
    yAxes: [{
      barPercentage: 1,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent'
      },
      ticks: {
        padding: 20,
        fontColor: '#9a9a9a'
      }
    }],
    xAxes: [{
      barPercentage: 1,
      gridLines: {
        drawBorder: false,
        color: 'rgba(225,78,202,0.1)',
        zeroLineColor: 'transparent'
      },
      ticks: {
        padding: 20,
        fontColor: '#9a9a9a'
      }
    }]
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.is-one2 {\n    background: #BFFCC6 !important;\n}\n.is-two2 {\n    background: #FFF5BA !important;\n}\n.is-three2 {\n    background: #FFABAB !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistika.vue?vue&type=style&index=0&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./resources/js/components/ModalBoxFull.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/ModalBoxFull.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalBoxFull.vue?vue&type=template&id=6756ccf8& */ "./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8&");
/* harmony import */ var _ModalBoxFull_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalBoxFull.vue?vue&type=script&lang=js& */ "./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalBoxFull_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__.render,
  _ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ModalBoxFull.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ModalStatistikaBox.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ModalStatistikaBox.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalStatistikaBox.vue?vue&type=template&id=133f1880& */ "./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880&");
/* harmony import */ var _ModalStatistikaBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalStatistikaBox.vue?vue&type=script&lang=js& */ "./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalStatistikaBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__.render,
  _ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ModalStatistikaBox.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Statistika.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/Statistika.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Statistika.vue?vue&type=template&id=5f6443e8& */ "./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8&");
/* harmony import */ var _Statistika_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Statistika.vue?vue&type=script&lang=js& */ "./resources/js/views/Statistika.vue?vue&type=script&lang=js&");
/* harmony import */ var _Statistika_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Statistika.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Statistika_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__.render,
  _Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Statistika.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBoxFull_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalBoxFull.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBoxFull_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalStatistikaBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalStatistikaBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalStatistikaBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Statistika.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Statistika.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistika.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistika.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBoxFull_vue_vue_type_template_id_6756ccf8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalBoxFull.vue?vue&type=template&id=6756ccf8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8&");


/***/ }),

/***/ "./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalStatistikaBox_vue_vue_type_template_id_133f1880___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalStatistikaBox.vue?vue&type=template&id=133f1880& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880&");


/***/ }),

/***/ "./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistika_vue_vue_type_template_id_5f6443e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistika.vue?vue&type=template&id=5f6443e8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBoxFull.vue?vue&type=template&id=6756ccf8& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-modal",
    {
      attrs: {
        "full-screen": "",
        active: _vm.isModalActive,
        "has-modal-card": ""
      },
      on: {
        "update:active": function($event) {
          _vm.isModalActive = $event
        }
      }
    },
    [
      _c("div", { staticClass: "modal-card" }, [
        _c("header", { staticClass: "modal-card-head" }, [
          _c("p", { staticClass: "modal-card-title" }, [_vm._v("PARDAVIMAI")])
        ]),
        _vm._v(" "),
        _c(
          "section",
          { staticClass: "modal-card-body" },
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _c("footer", { staticClass: "modal-card-foot" }, [
          _c(
            "button",
            { class: _vm.confirmButtonClass, on: { click: _vm.confirm } },
            [_vm._v(_vm._s(_vm.confirmLabel))]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalStatistikaBox.vue?vue&type=template&id=133f1880& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-box-full",
    {
      attrs: {
        "is-active": _vm.isActive,
        "confirm-type": "is-success",
        "confirm-label": "Uždaryti"
      },
      on: {
        "update:isActive": function($event) {
          _vm.isActive = $event
        },
        "update:is-active": function($event) {
          _vm.isActive = $event
        },
        confirm: _vm.confirm
      }
    },
    [
      _c(
        "card-component",
        {
          attrs: {
            title: _vm.viewSubject,
            icon: "finance",
            "header-icon": "reload"
          },
          on: { "header-icon-click": _vm.fillChartData }
        },
        [
          _vm.defaultChart.chartData
            ? _c(
                "div",
                { staticClass: "chart-area" },
                [
                  _c("bar-chart", {
                    ref: "bigChart",
                    staticStyle: { height: "100%" },
                    attrs: {
                      "chart-id": "big-bar-chart",
                      "chart-data": _vm.defaultChart.chartData,
                      "extra-options": _vm.defaultChart.extraOptions
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Statistika.vue?vue&type=template&id=5f6443e8& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { staticClass: "section is-main-section" },
    [
      _c("modal-statistika-box", {
        attrs: {
          "is-active": _vm.isModalView,
          "view-subject": _vm.viewObjectName,
          "view-pardavimai": _vm.viewName,
          "view-label": _vm.labelName
        },
        on: { confirm: _vm.viewConfirm }
      }),
      _vm._v(" "),
      _c("b-loading", {
        attrs: { "is-full-page": _vm.isFullPage },
        model: {
          value: _vm.isLoading,
          callback: function($$v) {
            _vm.isLoading = $$v
          },
          expression: "isLoading"
        }
      }),
      _vm._v(" "),
      _c(
        "card-component",
        { attrs: { title: "VALDYMAS", icon: "finance" } },
        [
          _c(
            "b-field",
            { attrs: { position: "is-centered" } },
            [
              _c("b-input", {
                attrs: {
                  placeholder: "Paieška...",
                  type: "search",
                  icon: "magnify",
                  expanded: ""
                },
                nativeOn: {
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.paieska_post.apply(null, arguments)
                  }
                },
                model: {
                  value: _vm.settings["ieskoti"],
                  callback: function($$v) {
                    _vm.$set(_vm.settings, "ieskoti", $$v)
                  },
                  expression: "settings['ieskoti']"
                }
              }),
              _vm._v(" "),
              _c("p", { staticClass: "control" }, [
                _c(
                  "button",
                  {
                    staticClass: "button is-primary",
                    on: { click: _vm.paieska_post }
                  },
                  [_vm._v("Ieškoti")]
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            [
              _c(
                "b-checkbox",
                {
                  attrs: { value: false, type: "is-info" },
                  model: {
                    value: _vm.settings["paieska_big"],
                    callback: function($$v) {
                      _vm.$set(_vm.settings, "paieska_big", $$v)
                    },
                    expression: "settings['paieska_big']"
                  }
                },
                [_vm._v("Aktivuoti išplėstinę paieška")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            { attrs: { label: "" } },
            [
              _c(
                "b-select",
                {
                  attrs: {
                    placeholder: "Pasirinkite...",
                    icon: "earth",
                    expanded: ""
                  },
                  nativeOn: {
                    change: function($event) {
                      return _vm.keisti_grupe.apply(null, arguments)
                    }
                  },
                  model: {
                    value: _vm.settings["grupe"],
                    callback: function($$v) {
                      _vm.$set(_vm.settings, "grupe", $$v)
                    },
                    expression: "settings['grupe']"
                  }
                },
                _vm._l(_vm.grupes, function(grup, index) {
                  return _c(
                    "option",
                    { key: index, domProps: { value: index } },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(grup) +
                          " - " +
                          _vm._s(_vm.grupes_lv[grup]) +
                          "\n          "
                      )
                    ]
                  )
                }),
                0
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            { attrs: { horizontal: "" } },
            [
              _c(
                "b-button",
                {
                  attrs: {
                    type: _vm.settings["rodyti_lt"] ? "is-primary" : "is-dark"
                  },
                  on: {
                    click: function($event) {
                      return _vm.change_lt()
                    }
                  }
                },
                [_vm._v("LIETUVA")]
              ),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: {
                    type: _vm.settings["rodyti_lv"] ? "is-warning" : "is-dark"
                  },
                  on: {
                    click: function($event) {
                      return _vm.change_lv()
                    }
                  }
                },
                [_vm._v("LATVIJA")]
              ),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: {
                    type: _vm.settings["rodyti_ee"] ? "is-danger" : "is-dark"
                  },
                  on: {
                    click: function($event) {
                      return _vm.change_ee()
                    }
                  }
                },
                [_vm._v("ESTIJA")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-field",
            { attrs: { horizontal: "" } },
            [
              _c(
                "b-button",
                {
                  attrs: { type: _vm.settings["pirk"] ? "is-info" : "is-dark" },
                  on: {
                    click: function($event) {
                      return _vm.change_pirk()
                    }
                  }
                },
                [_vm._v("GAMYBA")]
              ),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: { type: _vm.settings["gam"] ? "is-info" : "is-dark" },
                  on: {
                    click: function($event) {
                      return _vm.change_gam()
                    }
                  }
                },
                [_vm._v("PIRKIMAI")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "card-component",
        { attrs: { title: "STATISTIKA", icon: "account-multiple" } },
        [
          _c(
            "div",
            { attrs: { id: "printMe" } },
            [
              _c("div", { staticClass: "columns" }, [
                _c(
                  "div",
                  {
                    staticClass: "column has-text-centered has-text-weight-bold"
                  },
                  [
                    _vm._v(
                      "\n          Rasta: " + _vm._s(_vm.settings["paieska"])
                    ),
                    _c("br"),
                    _vm._v(
                      _vm._s(_vm.grupes[_vm.settings["grupe"]]) + "\n        "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c(
                "b-table",
                {
                  ref: "table",
                  attrs: {
                    data: _vm.pardavimai,
                    bordered: "",
                    striped: "",
                    "row-class": _vm.onClass,
                    "opened-detailed": _vm.defaultOpenedDetails,
                    detailed: "",
                    "detail-key": "sandelis",
                    "show-detail-icon": _vm.showDetailIcon
                  },
                  on: {
                    "details-open": function(row) {
                      return _vm.$buefy.toast.open("Expanded " + row.sandeis)
                    }
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "detail",
                      fn: function(props) {
                        return [
                          _c("div", { staticClass: "columns" }, [
                            _c(
                              "div",
                              {
                                staticClass: "column",
                                style: { border: "1px solid" }
                              },
                              [
                                _c(
                                  "b-table",
                                  {
                                    attrs: {
                                      data: props.row.list,
                                      "default-sort-direction": "desc",
                                      "default-sort": "kiekis",
                                      bordered: true,
                                      striped: true,
                                      narrowed: true
                                    }
                                  },
                                  [
                                    _c("b-table-column", {
                                      attrs: {
                                        field: "preke",
                                        label: "Prekė",
                                        sortable: ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(props) {
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(props.row.preke) +
                                                    "\n                "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("b-table-column", {
                                      style: {
                                        "background-color": "LightGray"
                                      },
                                      attrs: {
                                        label: "Likučiai",
                                        field: "likutis",
                                        sortable: ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(props) {
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(props.row.likutis) +
                                                    "\n                "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("b-table-column", {
                                      style: {
                                        "background-color": "LightGray"
                                      },
                                      attrs: {
                                        label: "Pardavimai",
                                        field: "pardavimai",
                                        sortable: ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(props) {
                                              return [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(
                                                      props.row.pardavimai
                                                    ) +
                                                    "\n                "
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ])
                        ]
                      }
                    },
                    {
                      key: "footer",
                      fn: function() {
                        return [
                          _c("th"),
                          _vm._v(" "),
                          _c("th"),
                          _vm._v(" "),
                          _c("th", [_vm._v(_vm._s(_vm.viso_lik))]),
                          _vm._v(" "),
                          _c("th", [_vm._v(_vm._s(_vm.viso_pard))]),
                          _vm._v(" "),
                          _c("th")
                        ]
                      },
                      proxy: true
                    }
                  ])
                },
                [
                  _c("b-table-column", {
                    attrs: { label: "Sandelis", field: "sandelis" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(props) {
                          return [
                            _vm._v(
                              "\n              " +
                                _vm._s(props.row.sandelis) +
                                "\n        "
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: {
                      label: "Likutis",
                      field: "likutis_sk",
                      numeric: "",
                      sortable: ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(props) {
                          return [
                            _vm._v(
                              "\n          " +
                                _vm._s(props.row.likutis_sk) +
                                "\n        "
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: {
                      label: "Parduota",
                      field: "pardavimai_sk",
                      numeric: "",
                      sortable: ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(props) {
                          return [
                            _vm._v(
                              "\n          " +
                                _vm._s(props.row.pardavimai_sk) +
                                "\n        "
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: {
                      label: "Viso",
                      field: "viso",
                      numeric: "",
                      sortable: ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(props) {
                          return [_c("b", [_vm._v(_vm._s(props.row.viso))])]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    style: { "background-color": "WhiteSmoke" },
                    attrs: { width: "50px", label: "INFO", field: "info" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(props) {
                          return [
                            !Array.isArray(props.row.buy)
                              ? _c(
                                  "button",
                                  {
                                    staticClass: "button is-small is-danger",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.viewModal_pardavimai(
                                          props.row.buy &&
                                            props.row.buy.sandelis,
                                          props.row.buy && props.row.buy.viso
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c("b-icon", {
                                      attrs: {
                                        icon: "chart-bar",
                                        size: "is-small"
                                      }
                                    })
                                  ],
                                  1
                                )
                              : _vm._e()
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _vm._v(" "),
                  _c(
                    "section",
                    {
                      staticClass: "section",
                      attrs: { slot: "empty" },
                      slot: "empty"
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "content has-text-centered" },
                        [
                          _vm.isLoading
                            ? [
                                _c(
                                  "p",
                                  [
                                    _c("b-icon", {
                                      attrs: {
                                        icon: "dots-horizontal",
                                        size: "is-large"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("p", [_vm._v("Gaunami duomenys...")])
                              ]
                            : [
                                _c(
                                  "p",
                                  [
                                    _c("b-icon", {
                                      attrs: {
                                        icon: "emoticon-sad",
                                        size: "is-large"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("p", [_vm._v("Duomenų nerasta …")])
                              ]
                        ],
                        2
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "buttons" },
            [
              _c(
                "b-button",
                {
                  attrs: {
                    size: "is-medium",
                    "icon-left": "printer",
                    type: "is-dark"
                  },
                  on: { click: _vm.print }
                },
                [_vm._v("SPAUSDINTI")]
              )
            ],
            1
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);