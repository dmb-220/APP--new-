"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Gpais_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
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
  name: 'Gpais',
  components: {
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      works: '',
      isLoading: false,
      isFullPage: true,
      gpais: []
    };
  },
  computed: {},
  created: function created() {
    this.getData();
  },
  mounted: function mounted() {},
  methods: {
    print: function print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getData: function getData() {
      var _this = this;

      this.isLoading = true;
      this.axios.get('/gpais').then(function (response) {
        _this.isLoading = false;
        _this.gpais = response.data.array;
      })["catch"](function (err) {
        _this.isLoading = false;

        _this.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Gpais.vue":
/*!**************************************!*\
  !*** ./resources/js/views/Gpais.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gpais.vue?vue&type=template&id=58614d33& */ "./resources/js/views/Gpais.vue?vue&type=template&id=58614d33&");
/* harmony import */ var _Gpais_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gpais.vue?vue&type=script&lang=js& */ "./resources/js/views/Gpais.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Gpais_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__.render,
  _Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Gpais.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Gpais.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/views/Gpais.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gpais_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Gpais.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gpais_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Gpais.vue?vue&type=template&id=58614d33&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Gpais.vue?vue&type=template&id=58614d33& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Gpais_vue_vue_type_template_id_58614d33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Gpais.vue?vue&type=template&id=58614d33& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=template&id=58614d33&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=template&id=58614d33&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Gpais.vue?vue&type=template&id=58614d33& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { staticClass: "section is-main-section" },
    [
      _c("b-loading", {
        attrs: { "is-full-page": _vm.isFullPage },
        model: {
          value: _vm.isLoading,
          callback: function ($$v) {
            _vm.isLoading = $$v
          },
          expression: "isLoading",
        },
      }),
      _vm._v(" "),
      _c("card-component", { attrs: { title: "VALDYMAS", icon: "finance" } }),
      _vm._v(" "),
      _c(
        "card-component",
        { attrs: { title: "GPAIS", icon: "account-multiple" } },
        [
          _c(
            "div",
            { attrs: { id: "printMe" } },
            [
              _c(
                "b-table",
                { attrs: { bordered: "", data: _vm.gpais } },
                [
                  _c("b-table-column", {
                    attrs: { label: " " },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.index + 1) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: { label: "Data", field: "tiekimoRinkaiData" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.row.tiekimoRinkaiData) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: { label: "Pavadinimas", field: "produktoKodas" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.row.produktoKodas) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: { label: "Kiekis, pakuoteje", field: "kiekis" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.row.kiekis) +
                                " vnt.\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: { label: "Gavimo budas", field: "gavimoBudas" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.row.gavimoBudas) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: { label: "Veiklos budas", field: "veiklosBudas" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(props.row.veiklosBudas) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                  _vm._v(" "),
                  _c("b-table-column", {
                    attrs: {
                      label: "Svoris, t.",
                      field: "vienos_pakuotes_svoris_tonomis",
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (props) {
                          return [
                            _vm._v(
                              " \n            " +
                                _vm._s(
                                  props.row.vienos_pakuotes_svoris_tonomis
                                ) +
                                "\n        "
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
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
                    type: "is-dark",
                  },
                  on: { click: _vm.print },
                },
                [_vm._v("SPAUSDINTI")]
              ),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: {
                    tag: "a",
                    type: "is-dark",
                    size: "is-medium",
                    "icon-left": "download",
                    href: "gpais/get_xml",
                    target: "_blank",
                  },
                },
                [_vm._v("\n        ATSISIŲSTI\n      ")]
              ),
            ],
            1
          ),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);