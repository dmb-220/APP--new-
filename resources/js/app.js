// Axios & Echo global
require('./bootstrap');

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);


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
