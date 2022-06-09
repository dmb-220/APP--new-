<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'PAGRINDINIS',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Į pradžią'
          },
          /*{
            to: '/uzsakymai',
            icon: 'cart',
            label: 'Užsakymai'
          },
          {
            to: '/testas',
            label: 'Testas',
            icon: 'calculator',
          },*/
        ],
        'DUOMENYS',
        [
          {
            to: '/statistika',
            label: 'Statistika',
            icon: 'chart-bar',
          },

          {
            label: 'Prekės',
            subLabel: 'Prekių judėjimas',
            icon: 'view-list',
            menu: [
              {
                to: '/prekes',
                label: 'Bendras',
                icon: 'cart',
              },
              {
                to: '/likuciai',
                label: 'Likučiai',
                icon: 'buffer',
              },
              {
                to: '/pardavimai',
                label: 'Pardavimai',
                icon: 'currency-eur',
              }
            ]
          },
          {
            to: '/akcijos',
            label: 'Akcijos',
            icon: 'bell-ring',
          },
          /*{
            to: '/analize',
            label: 'Analizė',
            icon: 'chart-tree',
          },*/
          /*{
            to: '/sandeliai',
            label: 'Sandeliai',
            icon: 'archive',
          },*/
          /*{
            to: '/vaztarasciai',
            label: 'Važtarščių žurnalas',
            icon: 'eye',
          },*/
          {
            to: '/kelione',
            label: 'Kelionės lapas',
            icon: 'bus',
          },
          /*{
            to: '/perkelimai',
            label: 'Perkėlimai',
            icon: 'bus',
          },*/
          {
            label: 'Pirk. / Grąžin. ',
            subLabel: 'Sudengimas su Banku',
            icon: 'clipboard-list',
            menu: [
              {
                to: '/inte',
                label: 'LT INTE',
                icon: 'arrow-right',
              },
              {
                to: '/intepigu',
                label: 'LT PIGU',
                icon: 'arrow-right',
              },
              {
                to: '/intelv',
                label: 'LV INTE',
                icon: 'arrow-right',
              },
              {
                to: '/inteee',
                label: 'EE INTE',
                icon: 'arrow-right',
              }
            ]
          },
          {
            to: '/return',
            label: 'Gražinimas LV/EE',
            icon: 'bell-ring',
          },

          {
            label: 'INTE grąžin.',
            subLabel: 'Pinigų grąžinimas',
            icon: 'view-list',
            menu: [
              {
                to: '/grazinimai',
                label: 'LT SEPA',
                icon: 'arrow-right',
              },
              {
                to: '/grazinimai_lv',
                label: 'LV SEPA',
                icon: 'arrow-right',
              },
              {
                to: '/grazinimai_ee',
                label: 'EE SEPA',
                icon: 'arrow-right',
              }
            ]
          },
          {
            to: '/dalinti',
            label: 'Prekių dalijimas',
            icon: 'share',
          }, 
          {
            to: '/inte_prekes',
            label: 'INTE Perkėlimai',
            icon: 'codepen',
          }, 
          {
            label: 'Vertimai',
            subLabel: 'Automatinis vertimas',
            icon: 'codepen',
            menu: [
              {
                to: '/replaceee',
                label: 'LT to EE',
                icon: 'arrow-right',
              },
              {
                to: '/replacelv',
                label: 'LT to LV',
                icon: 'arrow-right',
              }
            ]
          },
          {
            label: 'Irankiai',
            subLabel: 'Lengvesnis darbas',
            icon: 'view-list',
            menu: [
              {
                to: '/works',
                label: 'Darbo apskaita',
                icon: 'lan',
              },
              {
                to: '/export',
                label: 'Exportas lipdukams',
                icon: 'export',
              },
              {
                to: '/terminal',
                label: 'Bankiniai terminalai',
                icon: 'sitemap',
              },
              {
                to: '/gpais',
                label: 'GPAIS',
                icon: 'recycle',
              },
              {
                to: '/income',
                label: 'Pajamavimo suma',
                icon: 'coins',
              }          
            ]
          },
          {},
          {},
          {}
        ]
      ]
    }
  },
  created () {
  }
}
</script>
