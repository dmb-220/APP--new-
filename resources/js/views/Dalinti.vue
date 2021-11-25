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

/*function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  td.style.color = 'green';
  td.style.background = '#CEC';
}

function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
 Handsontable.renderers.TextRenderer.apply(this, arguments);

  // if row contains negative number
  if (parseInt(value, 10) < 0) {
    // add class "negative"
    td.className = 'make-me-red';
  }

  if (!value || value === '') {
    td.style.background = '#EEE';

  } else {
    if (value === 'Nissan') {
      td.style.fontStyle = 'italic';
    }

    td.style.background = '';
  }
}
// maps function to a lookup string
Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
*/
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
        /*afterSelection(row, col, row2, col2) {
          const meta = this.getCellMeta(row2, col2);

          if (meta.readOnly) {
            this.updateSettings({fillHandle: false});

          } else {
            this.updateSettings({fillHandle: true});
          }
        },
        cells(row, col) {
          const cellProperties = {};
          const data = this.instance.getData();

          if (row === 0 || data[row] && data[row][col] === 'readOnly') {
            cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
          }

          if (row === 0) {
            cellProperties.renderer = firstRowRenderer; // uses function directly

          } else {
            cellProperties.renderer = 'negativeValueRenderer'; // uses lookup map
          }

          return cellProperties;
        },*/
        licenseKey: 'non-commercial-and-evaluation'
      },
      page: 0,
      perpage: 11,
      maxpage: 0,
      file: null,
      failas: "",
      //duomenu masyvas lentelei
      data: [],
      raides: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      warehouse: [],
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
      let i, x, y, r, eilute = 3;
      //vienoje eileje 10 kodu
      this.data[0] = ["Kodas"];
      this.data[1] = ["Kiekis"];
      this.data[2] = [""];

      this.data[0][this.perpage+1] = "SUMA";
      this.data[1][this.perpage+1] = '=SUM(B2:L2)';

      //sudedam sandelius, 
      //iterpiam formule SUM
      let sand = 0, xx = eilute;
      for (i = 0; i < this.warehouse.length; i++) {
        let sk = this.warehouse[i].length;
        //console.log(sk)
        sand += sk;
        for (x = 0; x < sk; x++) {
          r = xx+1;
          //console.log(this.warehouse[i][x])
          this.data[xx] = [this.warehouse[i][x]];
          this.data[xx][this.perpage+1] = '=SUM(B'+r+':L'+r+')';
          xx++;
        }
        this.data[xx] = [""];
        xx++;
      }

      //Footer
      this.data[sand+5] = [""];
      this.data[sand+6] = ["SUMA"];
      this.data[sand+7] = ["BALANSAS"];

      this.data[sand+8] = ["INTERNETAS"];
      this.data[sand+9] = ["LIETUVA"];
      this.data[sand+10] = ["LATVIJA"];
      this.data[sand+11] = ["ESTIJA"];

      //stulpeliai su KODAI ir likuciu
      for (i = 1; i <= this.newas.length; i++) {
        let kodas = this.newas[i-1]['barkodas'];
        this.data[0][i] = kodas;
        this.data[1][i] = this.newas[i-1]['likutis'];

        if(kodas in this.share){
          //console.log(kodas);
          for (y = 0; y < this.share[kodas].length; y++) {
            let  xxx, ss = 0, z;
            //console.log(this.share[kodas][y]);    
            for (z = 0; z < this.warehouse.length; z++) {
              xxx = this.arraySearch(this.warehouse[z], this.share[kodas][y]);
              if(xxx){
                //console.log(z +' - '+ xxx +' - '+ ss);
                this.data[ss + xxx + eilute][i] = 1; break;
              }else{
                ss += this.warehouse[z].length + 1;
              }
            }
          }
          //this.data[2][i] = this.share[kodas].join(' ');
        }

        //iskaiciuoti masyvo pradini galini taskus
        //kad keiciant parduotuviu sasrasa veiktu 
        let lt = this.warehouse[0].length;
        let lv = this.warehouse[1].length;
        let ee = this.warehouse[2].length;
        console.log(sand+' - '+lt+' - '+lv+' - '+ee);

        let tp = eilute-1;
        let ts = sand+eilute+2; //masyvas/3 eilutes nuo virsaus/ 2 tarpai tarp sandeliu
        //SUMA//BALANSAS
        this.data[sand+6][i] = '=SUM('+this.raides[i]+(eilute+1)+':'+this.raides[i]+ts+')';
        this.data[sand+7][i] = '=('+(this.raides[i]+tp)+'-'+(this.raides[i]+(ts+2))+')';
        //INTERNETAS//VALSTYBES
        this.data[sand+8][i] = '=SUM('+this.raides[i]+'24:'+this.raides[i]+'26)';
        this.data[sand+9][i] = '=SUM('+this.raides[i]+'4:'+this.raides[i]+'23)';
        this.data[sand+10][i] = '=SUM('+this.raides[i]+'28:'+this.raides[i]+'51)';
        this.data[sand+11][i] = '=SUM('+this.raides[i]+'53:'+this.raides[i]+'64)';
      }
      //SUMA viso
      this.data[sand+8][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'24:'+this.raides[this.perpage+1]+'26)';
      this.data[sand+9][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'4:'+this.raides[this.perpage+1]+'26)';
      this.data[sand+10][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'28:'+this.raides[this.perpage+1]+'51)';
      this.data[sand+11][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+'53:'+this.raides[this.perpage+1]+'64)';

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
        this.warehouse = response.data.warehouse;

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
