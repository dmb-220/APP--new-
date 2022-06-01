// Axios & Echo global
require('./bootstrap');

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import JsonCSV from 'vue-json-csv'
Vue.component('downloadCsv', JsonCSV)

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {}); // config is optional. more below
import "vue-wysiwyg/dist/vueWysiwyg.css";

import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: ['fullscreen=yes',],
  styles: ['https://unpkg.com/buefy/dist/buefy.min.css', 'http://inte.lt/css/print.css',]
}
Vue.use(VueHtmlToPaper, options);
// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

/* Router & Store */
import router from './router'
import store from './store'

/* Vue. Main component */
import App from './App.vue'


/* Collapse mobile aside menu on route change */
router.afterEach(() => {
  store.commit('asideMobileStateToggle', false)
})

Vue.config.productionTip = false

/* Main component */
Vue.component('App', App)

/* Buefy */
Vue.use(Buefy)

/* This is main entry point */

new Vue({
  store,
  router,
  render: h => h(App),
  mounted() {
    document.documentElement.classList.remove('has-spinner-active')
  }
}).$mount('#app')
