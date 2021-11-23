<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Prekių sąrašas CSV:" horizontal>
          <file-picker-dalinti @file-updated="file_info" v-model="file"/>
        </b-field>
          <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-sark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
      </card-component>
      
      <card-component title="Prekių dalinimas" icon="account-multiple">
         <hot-table ref="hotTableComponent" :style="" :data="data" :settings="hotSettings"></hot-table>
      </card-component>
    </section>
  </div>

</template>



<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import FilePickerDalinti from '@/components/FilePickerDalinti'

import { HotTable } from '@handsontable/vue';
import { HyperFormula } from 'hyperformula';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
// register Handsontable's modules
registerAllModules();

export default {
  name: "Prekiu_dalijimas",
  components: {CardToolbar, CardComponent, FilePickerDalinti, HotTable },
  data () {
    return {
      isLoading: false,
      style: 'height: 142px; overflow: hidden; border: 1px solid red;',
      hotSettings: {
        colHeaders: true,
        rowHeaders: true,
        height: 'auto',
        fixedRowsBottom: 2,
        formulas: {
          engine: HyperFormula
        },
        licenseKey: 'non-commercial-and-evaluation'
      },
      data: [],
      page: 1,
      file: null,
      failas: "",
      no_input: false,
      dalinti: [],
      sandeliai: [],
      share: []
    }
  },
  watch: {
    dalinti: function (value) {
      let i;
      //vienoje eileje 10 kodu
      this.data[0] = ["Kodas"];
      this.data[1] = ["Kiekis"];
      this.data[2] = [""];
      for (i = 0; i < this.sandeliai.length; i++) {
        this.data[i+3] = [this.sandeliai[i]];
      }

      for (i = 1; i < 12; i++) {
        this.data[0][i] = this.dalinti[(i * this.page) - 1]['barkodas'];
        this.data[1][i] = this.dalinti[(i * this.page) - 1]['likutis'];
      }
      this.data[0][i] = "SUMA";
      this.data[1][i] = '=SUM(B2:L2)';
      this.$refs.hotTableComponent.hotInstance.loadData(this.data);
      //console.log(this.data)
    },
    /*dalinti: function (value) {
      let i;
      //vienoje eileje 10 kodu
      this.data[0] = ["Kodas"];
      this.data[1] = ["Kiekis"];
      this.data[2] = [""];
      for (i = 0; i < this.sandeliai.length; i++) {
        this.data[i+3] = [this.sandeliai[i]];
      }

      for (i = 1; i < 12; i++) {
        this.data[0][i] = this.dalinti[(i * this.page) - 1]['barkodas'];
        this.data[1][i] = this.dalinti[(i * this.page) - 1]['likutis'];
      }
      this.data[0][i] = "SUMA";
      this.data[1][i] = '=SUM(B2:L2)';
      this.$refs.hotTableComponent.hotInstance.loadData(this.data);
      //console.log(this.data)
    },*/
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    file_info (value) {
      this.failas = value.name;
    },

  suformuoti(){
    axios
      .post(`/dalinti/store`, {
        file: this.failas,
        })
      .then(response => {
        console.log(response.data.data)
        this.getData()
    })
      .catch( err => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })
    },
  getData () {
      this.isLoading = true
      this.axios
      .get('/dalinti')
      .then(response => {
        this.isLoading = false
        this.dalinti = response.data.dalinti;   
        this.sandeliai = response.data.sandeliai;  

      })
      .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger',
              queue: false
            })
          })
    },
  }
}
</script>
