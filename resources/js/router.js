import Vue from 'vue'
import Router from 'vue-router'
import Pagrindinis from './views/Pagrindinis.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'pagrindinis',
      component: Pagrindinis
    },
    {
      path: '/statistika',
      name: 'Statistika',
      component: () => import('./views/Statistika.vue')
    },
    {
      path: '/likuciai',
      name: 'Likuciai',
      component: () => import('./views/Likuciai.vue'),
    },
    {
      path: '/pardavimai',
      name: 'Pardavimai',
      component: () => import('./views/Pardavimai.vue')
    },
    {
      path: '/prekes',
      name: 'Prekes',
      component: () => import('./views/Prekes.vue')
    },
    {
      path: '/akcijos',
      name: 'akcijos',
      component: () => import('./views/Akcijos.vue')
    },
    {
      path: '/kelione',
      name: 'kelione',
      component: () => import('./views/Keliones.vue')
    },
    {
      path: '/grazinimai',
      name: 'grazinimai',
      component: () => import('./views/Grazinimai.vue')
    },
    {
      path: '/grazinimai_lv',
      name: 'grazinimai_lv',
      component: () => import('./views/Grazinimai_LV.vue')
    },

    {
      path: '/grazinimai_ee',
      name: 'grazinimai_ee',
      component: () => import('./views/Grazinimai_EE.vue')
    },
    {
      path: '/inte_prekes',
      name: 'inte_prekes',
      component: () => import('./views/IntePrekes.vue')
    },
    {
      path: '/inte',
      name: 'inte',
      component: () => import('./views/Inte.vue')
    },
    {
      path: '/intepigu',
      name: 'intepigu',
      component: () => import('./views/Intepigu.vue')
    },
    {
      path: '/inteee',
      name: 'inteee',
      component: () => import('./views/Inteee.vue')
    },
    {
      path: '/intelv',
      name: 'intelv',
      component: () => import('./views/Intelv.vue')
    },
    {
      path: '/replace',
      name: 'replace',
      component: () => import('./views/Replace.vue')
    },
    {
      path: '/replacelv',
      name: 'replacelv',
      component: () => import('./views/ReplaceLV.vue')
    },
    {
      path: '/dalinti',
      name: 'dalinti',
      component: () => import('./views/Dalinti.vue')
    },
    {
      path: '/CSV_sarasas',
      name: 'CSV_sarasas',
      component: () => import('./views/CSV_Sarasas.vue')
    },
    {
      path: '/return',
      name: 'return',
      component: () => import('./views/ReturnProducts.vue')
    },
    /*
    {
      path: '/sandeliai',
      name: 'sandeliai',
      component: () => import('./views/Sandeliai.vue')
    },
    {
      path: '/vaztarasciai',
      name: 'vaztarasciai',
      component: () => import('./views/Vaztarasciai.vue')
    },
    
    {
      path: '/analize',
      name: 'analize',
      component: () => import('./views/Analize.vue')
    },
    {
      path: '/perkelimai',
      name: 'perkelimai',
      component: () => import('./views/Perkelimai.vue')
    },
    {
      path: '/generuoti',
      name: 'generuoti',
      component: () => import('./views/Generuoti.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin/Admin.vue')
    },
    {
      path: '/uzsakymai',
      name: 'uzsakymai',
      component: () => import('./views/Uzsakymai.vue')
    },
    {
      path: '/testas',
      name: 'testas',
      component: () => import('./views/Testas.vue')
    },

    {
      path: '/visi_likuciai',
      name: 'visi_likuciai',
      component: () => import('./views/VisiLikuciai.vue')
    },

    {
      path: '/soap',
      name: 'soap',
      component: () => import('./views/Soap.vue')
    },
    {
      path: '/soaplt',
      name: 'soaplt',
      component: () => import('./views/SoapLT.vue')
    },
    {
      path: '/ee_list',
      name: 'eelist',
      component: () => import('./views/ee_list.vue')
    },*/

  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
