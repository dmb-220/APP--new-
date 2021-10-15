"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Tables_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ModalBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/ModalBox */ "./resources/js/components/ModalBox.vue");
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
  name: 'ClientsTableSample',
  components: {
    ModalBox: _components_ModalBox__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    dataUrl: {
      type: String,
      "default": null
    },
    checkable: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    };
  },
  computed: {
    trashObjectName: function trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }

      return null;
    }
  },
  created: function created() {
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;

      if (this.dataUrl) {
        this.isLoading = true;
        axios.get(this.dataUrl).then(function (r) {
          _this.isLoading = false;

          if (r.data && r.data.data) {
            if (r.data.data.length > _this.perPage) {
              _this.paginated = true;
            }

            _this.clients = r.data.data;
          }
        })["catch"](function (err) {
          _this.isLoading = false;

          _this.$buefy.toast.open({
            message: "Error: ".concat(e.message),
            type: 'is-danger',
            queue: false
          });
        });
      }
    },
    trashModal: function trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    trashConfirm: function trashConfirm() {
      var _this2 = this;

      this.isModalActive = false;
      axios["delete"]("/clients/".concat(this.trashObject.id, "/destroy")).then(function (r) {
        _this2.getData();

        _this2.$buefy.snackbar.open({
          message: "Deleted ".concat(_this2.trashObject.name),
          queue: false
        });
      })["catch"](function (err) {
        _this2.$buefy.toast.open({
          message: "Error: ".concat(err.message),
          type: 'is-danger',
          queue: false
        });
      });
    },
    trashCancel: function trashCancel() {
      this.isModalActive = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'HeroBar',
  props: {
    hasRightVisible: {
      type: Boolean,
      "default": true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      "default": false
    },
    trashObjectName: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      isModalActive: false
    };
  },
  watch: {
    isActive: function isActive(newValue) {
      this.isModalActive = newValue;
    },
    isModalActive: function isModalActive(newValue) {
      if (!newValue) {
        this.cancel();
      }
    }
  },
  methods: {
    cancel: function cancel() {
      this.$emit('cancel');
    },
    confirm: function confirm() {
      this.$emit('confirm');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Notification',
  data: function data() {
    return {
      isDismissed: false
    };
  },
  methods: {
    dismiss: function dismiss() {
      this.isDismissed = true;
      this.$buefy.snackbar.open({
        message: 'Dismissed',
        queue: false
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Notification */ "./resources/js/components/Notification.vue");
/* harmony import */ var _components_ClientsTableSample__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ClientsTableSample */ "./resources/js/components/ClientsTableSample.vue");
/* harmony import */ var _components_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/CardComponent */ "./resources/js/components/CardComponent.vue");
/* harmony import */ var _components_TitleBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/TitleBar */ "./resources/js/components/TitleBar.vue");
/* harmony import */ var _components_HeroBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/HeroBar */ "./resources/js/components/HeroBar.vue");
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
  name: 'Tables',
  components: {
    HeroBar: _components_HeroBar__WEBPACK_IMPORTED_MODULE_4__["default"],
    TitleBar: _components_TitleBar__WEBPACK_IMPORTED_MODULE_3__["default"],
    CardComponent: _components_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
    ClientsTableSample: _components_ClientsTableSample__WEBPACK_IMPORTED_MODULE_1__["default"],
    Notification: _components_Notification__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    titleStack: function titleStack() {
      return ['Admin', 'Tables'];
    }
  }
});

/***/ }),

/***/ "./resources/js/components/ClientsTableSample.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ClientsTableSample.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientsTableSample.vue?vue&type=template&id=3eda099b& */ "./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b&");
/* harmony import */ var _ClientsTableSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientsTableSample.vue?vue&type=script&lang=js& */ "./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ClientsTableSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__.render,
  _ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ClientsTableSample.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/HeroBar.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/HeroBar.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeroBar.vue?vue&type=template&id=15cb1e9e& */ "./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e&");
/* harmony import */ var _HeroBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeroBar.vue?vue&type=script&lang=js& */ "./resources/js/components/HeroBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HeroBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__.render,
  _HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/HeroBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ModalBox.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/ModalBox.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalBox.vue?vue&type=template&id=75bd336e& */ "./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e&");
/* harmony import */ var _ModalBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalBox.vue?vue&type=script&lang=js& */ "./resources/js/components/ModalBox.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__.render,
  _ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ModalBox.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Notification.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/Notification.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification.vue?vue&type=template&id=6a4ce154& */ "./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&");
/* harmony import */ var _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notification.vue?vue&type=script&lang=js& */ "./resources/js/components/Notification.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__.render,
  _Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Notification.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/TitleBar.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/TitleBar.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TitleBar.vue?vue&type=template&id=31c7f286& */ "./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286&");
/* harmony import */ var _TitleBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TitleBar.vue?vue&type=script&lang=js& */ "./resources/js/components/TitleBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TitleBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__.render,
  _TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/TitleBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Tables.vue":
/*!***************************************!*\
  !*** ./resources/js/views/Tables.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tables.vue?vue&type=template&id=5ddc3dc4& */ "./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4&");
/* harmony import */ var _Tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tables.vue?vue&type=script&lang=js& */ "./resources/js/views/Tables.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__.render,
  _Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Tables.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsTableSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientsTableSample.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsTableSample_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/HeroBar.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/HeroBar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HeroBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ModalBox.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/ModalBox.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Notification.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Notification.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Notification.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/TitleBar.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/TitleBar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TitleBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TitleBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TitleBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Tables.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./resources/js/views/Tables.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tables.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ClientsTableSample_vue_vue_type_template_id_3eda099b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientsTableSample.vue?vue&type=template&id=3eda099b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b&");


/***/ }),

/***/ "./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroBar_vue_vue_type_template_id_15cb1e9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HeroBar.vue?vue&type=template&id=15cb1e9e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e&");


/***/ }),

/***/ "./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalBox_vue_vue_type_template_id_75bd336e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalBox.vue?vue&type=template&id=75bd336e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e&");


/***/ }),

/***/ "./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_6a4ce154___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Notification.vue?vue&type=template&id=6a4ce154& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&");


/***/ }),

/***/ "./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TitleBar_vue_vue_type_template_id_31c7f286___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TitleBar.vue?vue&type=template&id=31c7f286& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286&");


/***/ }),

/***/ "./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tables_vue_vue_type_template_id_5ddc3dc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tables.vue?vue&type=template&id=5ddc3dc4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ClientsTableSample.vue?vue&type=template&id=3eda099b& ***!
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
    "div",
    [
      _c("modal-box", {
        attrs: {
          "is-active": _vm.isModalActive,
          "trash-object-name": _vm.trashObjectName
        },
        on: { confirm: _vm.trashConfirm, cancel: _vm.trashCancel }
      }),
      _vm._v(" "),
      _c(
        "b-table",
        {
          attrs: {
            "checked-rows": _vm.checkedRows,
            checkable: _vm.checkable,
            loading: _vm.isLoading,
            paginated: _vm.paginated,
            "per-page": _vm.perPage,
            striped: true,
            hoverable: true,
            "default-sort": "name",
            data: _vm.clients
          },
          on: {
            "update:checkedRows": function($event) {
              _vm.checkedRows = $event
            },
            "update:checked-rows": function($event) {
              _vm.checkedRows = $event
            }
          }
        },
        [
          _c("b-table-column", {
            attrs: { "cell-class": "has-no-head-mobile is-image-cell" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c("div", { staticClass: "image" }, [
                      _c("img", {
                        staticClass: "is-rounded",
                        attrs: { src: props.row.avatar }
                      })
                    ])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: { label: "Name", field: "name", sortable: "" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _vm._v("\n      " + _vm._s(props.row.name) + "\n    ")
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: { label: "Company", field: "company", sortable: "" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _vm._v("\n      " + _vm._s(props.row.company) + "\n    ")
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: { label: "City", field: "city", sortable: "" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _vm._v("\n      " + _vm._s(props.row.city) + "\n    ")
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: {
              "cell-class": "is-progress-col",
              label: "Progress",
              field: "progress",
              sortable: ""
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c(
                      "progress",
                      {
                        staticClass: "progress is-small is-primary",
                        attrs: { max: "100" },
                        domProps: { value: props.row.progress }
                      },
                      [_vm._v(_vm._s(props.row.progress))]
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: { label: "Created" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c(
                      "small",
                      {
                        staticClass: "has-text-grey is-abbr-like",
                        attrs: { title: props.row.created }
                      },
                      [_vm._v(_vm._s(props.row.created))]
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("b-table-column", {
            attrs: { "custom-key": "actions", "cell-class": "is-actions-cell" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c(
                      "div",
                      { staticClass: "buttons is-right" },
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "button is-small is-primary",
                            attrs: {
                              to: {
                                name: "clients.edit",
                                params: { id: props.row.id }
                              }
                            }
                          },
                          [
                            _c("b-icon", {
                              attrs: { icon: "account-edit", size: "is-small" }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "button is-small is-danger",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.trashModal(props.row)
                              }
                            }
                          },
                          [
                            _c("b-icon", {
                              attrs: { icon: "trash-can", size: "is-small" }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "section",
            { staticClass: "section", attrs: { slot: "empty" }, slot: "empty" },
            [
              _c(
                "div",
                { staticClass: "content has-text-grey has-text-centered" },
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
                        _c("p", [_vm._v("Fetching data...")])
                      ]
                    : [
                        _c(
                          "p",
                          [
                            _c("b-icon", {
                              attrs: { icon: "emoticon-sad", size: "is-large" }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("p", [_vm._v("Nothing's here…")])
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HeroBar.vue?vue&type=template&id=15cb1e9e& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
  return _c("section", { staticClass: "hero is-hero-bar" }, [
    _c("div", { staticClass: "hero-body" }, [
      _c("div", { staticClass: "level" }, [
        _c("div", { staticClass: "level-left" }, [
          _c("div", { staticClass: "level-item" }, [
            _c("h1", { staticClass: "title" }, [_vm._t("default")], 2)
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.hasRightVisible,
                expression: "hasRightVisible"
              }
            ],
            staticClass: "level-right"
          },
          [_c("div", { staticClass: "level-item" }, [_vm._t("right")], 2)]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ModalBox.vue?vue&type=template&id=75bd336e& ***!
  \********************************************************************************************************************************************************************************************************************/
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
      attrs: { active: _vm.isModalActive, "has-modal-card": "" },
      on: {
        "update:active": function($event) {
          _vm.isModalActive = $event
        }
      }
    },
    [
      _c("div", { staticClass: "modal-card" }, [
        _c("header", { staticClass: "modal-card-head" }, [
          _c("p", { staticClass: "modal-card-title" }, [
            _vm._v("Confirm action")
          ])
        ]),
        _vm._v(" "),
        _c("section", { staticClass: "modal-card-body" }, [
          _c("p", [
            _vm._v("\n        This will permanently delete "),
            _c("b", [_vm._v(_vm._s(_vm.trashObjectName))])
          ]),
          _vm._v(" "),
          _c("p", [_vm._v("Action can not be undone.")])
        ]),
        _vm._v(" "),
        _c("footer", { staticClass: "modal-card-foot" }, [
          _c(
            "button",
            {
              staticClass: "button",
              attrs: { type: "button" },
              on: { click: _vm.cancel }
            },
            [_vm._v("Cancel")]
          ),
          _vm._v(" "),
          _c(
            "button",
            { staticClass: "button is-danger", on: { click: _vm.confirm } },
            [_vm._v("Delete")]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Notification.vue?vue&type=template&id=6a4ce154& ***!
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
  return !_vm.isDismissed
    ? _c("div", { staticClass: "notification" }, [
        _c("div", { staticClass: "level" }, [
          _c("div", { staticClass: "level-left" }, [
            _c("div", { staticClass: "level-item" }, [_vm._t("default")], 2)
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "level-right" }, [
            _c(
              "button",
              {
                staticClass: "button is-small is-white",
                attrs: { type: "button" },
                on: { click: _vm.dismiss }
              },
              [_vm._v("Dismiss")]
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/TitleBar.vue?vue&type=template&id=31c7f286& ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c("section", { staticClass: "section is-title-bar" }, [
    _c("div", { staticClass: "level" }, [
      _c("div", { staticClass: "level-left" }, [
        _c("div", { staticClass: "level-item" }, [
          _c(
            "ul",
            _vm._l(_vm.titleStack, function(title, index) {
              return _c("li", { key: index }, [_vm._v(_vm._s(title))])
            }),
            0
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "level-right" }, [
        _c("div", { staticClass: "level-item" }, [
          _c("div", { staticClass: "buttons is-right" }, [
            _c(
              "a",
              {
                staticClass: "button is-primary",
                attrs: {
                  href: "https://admin-one-laravel.justboil.me/",
                  target: "_blank"
                }
              },
              [
                _c("b-icon", {
                  attrs: { icon: "credit-card", "custom-size": "default" }
                }),
                _vm._v(" "),
                _c("span", [_vm._v("Premium Demo")])
              ],
              1
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Tables.vue?vue&type=template&id=5ddc3dc4& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    "div",
    [
      _c("title-bar", { attrs: { "title-stack": _vm.titleStack } }),
      _vm._v(" "),
      _c(
        "hero-bar",
        [
          _vm._v("\n    Tables\n    "),
          _c(
            "router-link",
            {
              staticClass: "button",
              attrs: { slot: "right", to: "/" },
              slot: "right"
            },
            [_vm._v("\n      Dashboard\n    ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "section is-main-section" },
        [
          _c("notification", { staticClass: "is-info" }, [
            _c(
              "div",
              [
                _c("b-icon", {
                  attrs: { icon: "buffer", "custom-size": "default" }
                }),
                _vm._v(" "),
                _c("b", [_vm._v("Sorted and paginated table.")]),
                _vm._v(" Based on Buefy's table.\n      ")
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "card-component",
            {
              staticClass: "has-table has-mobile-sort-spaced",
              attrs: { title: "Clients", icon: "account-multiple" }
            },
            [
              _c("clients-table-sample", {
                attrs: { "data-url": "/clients", checkable: true }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("notification", { staticClass: "is-info" }, [
            _c(
              "div",
              [
                _c("b-icon", {
                  attrs: { icon: "buffer", "custom-size": "default" }
                }),
                _vm._v(" "),
                _c("b", [_vm._v("Tightly wrapped")]),
                _vm._v(" — table header becomes card header\n      ")
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "card-component",
            { staticClass: "has-table has-mobile-sort-spaced" },
            [
              _c("clients-table-sample", {
                attrs: { "data-url": "/clients", checkable: true }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("notification", { staticClass: "is-info" }, [
            _c(
              "div",
              [
                _c("b-icon", {
                  attrs: { icon: "buffer", "custom-size": "default" }
                }),
                _vm._v(" "),
                _c("b", [_vm._v("Empty table.")]),
                _vm._v(" When there's nothing to show\n      ")
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c(
            "card-component",
            { staticClass: "has-table has-thead-hidden" },
            [_c("clients-table-sample")],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);