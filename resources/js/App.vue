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
            to: '/likuciai',
            label: 'Likučiai',
            icon: 'buffer',
          },
          {
            to: '/pardavimai',
            label: 'Pardavimai',
            icon: 'currency-eur',
          },
          {
            to: '/prekes',
            label: 'Prekes',
            icon: 'cart',
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
            label: 'INTE grąžinimai',
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
            to: '/inte_prekes',
            label: 'INTE Perkėlimai',
            icon: 'codepen',
          }, 
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
            label: 'Vertimai',
            subLabel: 'Automatinis vertimas',
            icon: 'codepen',
            menu: [
              {
                to: '/replace',
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

          /*{
            to: '/visi_likuciai',
            label: 'Likuciai pagal sandeli',
            icon: 'bus',
          },      */ 
        ],
        /*'VEIKSMAI',
        [
          {
            to: '/csv_sarasas',
            label: 'CSV failų įkėlimas',
            icon: 'view-list'
          },
          {
            to: '/generuoti',
            label: 'Generuoti duomenis',
            icon: 'calculator',
          },
          {
            to: '/admin',
            label: 'Administravimas',
            icon: 'bullhorn',
          },
        ]*/
      ]
    }
  },
  created () {
  }
}
</script>
