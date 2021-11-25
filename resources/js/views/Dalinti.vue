<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Prekių sąrašas CSV:" horizontal>
          <file-picker-dalinti @file-updated="file_info" v-model="file"/>
        </b-field>
          <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-dark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
      </card-component>
      <card-component title="Prekių dalinimas" icon="account-multiple">
      <div>Prekių: {{dalinti.length}}</div>

        <b-field  label=" ">
          <p class="control">
            <b-button icon-left="arrow-left" type="is-dark" v-if="page > 0" v-on:click="page -= 1">ATGAL</b-button>
            <b-button icon-left="arrow-left" type="is-dark" v-else disabled>ATGAL</b-button>
            <button class="button" disabled>Puslapiai: {{page + 1}}</button>
            <b-button icon-right="arrow-right" type="is-dark" v-if="page < maxpage" v-on:click="page += 1">TOLIAU</b-button>
            <b-button icon-right="arrow-right" type="is-dark" v-else disabled>ATGAL</b-button>
          </p>
        </b-field>
        <hot-table ref="hotTableComponent" :style="" :data="data" :settings="hotSettings"></hot-table>
      </card-component>
    </section>
  </div>

</template>

<style>
td.custom-cell {
  color: #fff;
  background-color: #37bc6c;
}
</style>

<script>
Array.prototype.sliceIntoChunks = function(chunkSize) {
  var chunks = [];
  var temparray = null;

  for (var i = 0; i < this.length; i++) {
      if (i % chunkSize === 0) {
          temparray = new Array();
          chunks.push(temparray);
      }
      temparray.push(this[i]);
  }

  return chunks;
};
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import FilePickerDalinti from '@/components/FilePickerDalinti'

import { HotTable, HotColumn } from '@handsontable/vue';
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
      //style: 'height: 142px; overflow: hidden; border: 1px solid red;',
      hotSettings: {
        colHeaders: true,
        rowHeaders: true,
        height: 'auto',
        formulas: {
          engine: HyperFormula
        },
        licenseKey: 'non-commercial-and-evaluation'
      },
      data: [],
      raides: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      page: 0,
      perpage: 11,
      maxpage: 0,
      file: null,
      failas: "",
      dalinti: [],
      newas: [],
      sandeliai: [],
      share: []
    }
  },
  watch: {
    page: function (value) {
      this.set_array();
    },
    newas: function (value) {
      let i, y, r;
      //vienoje eileje 10 kodu
      this.data[0] = ["Kodas"];
      this.data[1] = ["Kiekis"];
      this.data[2] = [""];

      this.data[0][this.perpage+1] = "SUMA";
      this.data[1][this.perpage+1] = '=SUM(B2:L2)';

      //sudedam sandelius, 
      //iterpiam formule SUM
      let sand = this.sandeliai.length;
      console.log(sand);
      for (i = 0; i < sand; i++) {
        r = i+4;
        console.log(this.sandeliai[i]);
        this.data[i+3] = [this.sandeliai[i]];
        this.data[i+3][this.perpage+1] = '=SUM(B'+r+':L'+r+')';
      }

      //Footer
      this.data[sand+3] = [""];
      this.data[sand+4] = ["SUMA"];
      this.data[sand+5] = ["BALANSAS"];

      this.data[sand+6] = ["INTERNETAS"];
      this.data[sand+7] = ["LIETUVA"];
      this.data[sand+8] = ["LATVIJA"];
      this.data[sand+9] = ["ESTIJA"];

      //stulpeliai su KODAI ir likuciu
      for (i = 1; i <= this.newas.length; i++) {
        let kodas = this.newas[i-1]['barkodas'];
        this.data[0][i] = kodas;
        this.data[1][i] = this.newas[i-1]['likutis'];

        //console.log(kodas);
        //jei likuciu nera, irasom kieki
        if(kodas in this.share){
          for (y = 0; y < this.share[kodas].length; y++) {
            //console.log(this.share[kodas][y]);
            let  xxx = this.arraySearch(this.sandeliai, this.share[kodas][y]);
            //console.log(xxx);
            this.data[xxx+3][i] = 1;
          }
          //this.data[2][i] = this.share[kodas].join(' ');
        }
        this.data[sand+4][i] = '=SUM('+this.raides[i]+'4:'+this.raides[i]+'62)';
        this.data[sand+5][i] = '=('+this.raides[i]+'2-'+this.raides[i]+'64)';

        this.data[sand+6][i] = '=SUM('+this.raides[i]+'24:'+this.raides[i]+'26)';
        this.data[sand+7][i] = '=SUM('+this.raides[i]+'4:'+this.raides[i]+'23)';
        this.data[sand+8][i] = '=SUM('+this.raides[i]+'27:'+this.raides[i]+'50)';
        this.data[sand+9][i] = '=SUM('+this.raides[i]+'51:'+this.raides[i]+'62)';
      }
      //SUMA viso
      this.data[sand+6][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'24:'+this.raides[this.perpage+1]+'26)';
      this.data[sand+7][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'4:'+this.raides[this.perpage+1]+'26)';
      this.data[sand+8][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'27:'+this.raides[this.perpage+1]+'50)';
      this.data[sand+9][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'51:'+this.raides[this.perpage+1]+'62)';

      //uzkraunam atnaujintus duomenis i lentele
      this.$refs.hotTableComponent.hotInstance.loadData(this.data);
    },
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
  arraySearch(arr, val) {
    for (var i=0; i<arr.length; i++)
        if (arr[i] === val)                    
            return i;
    return false;
  },
  set_array(){
    let was = this.dalinti.sliceIntoChunks(this.perpage);
        this.maxpage = was.length -1;
        this.newas = was[this.page];
        //console.log(this.was)
  },
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
        this.share = response.data.array; 

        this.set_array();
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
