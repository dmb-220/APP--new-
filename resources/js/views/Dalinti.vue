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
      <hr>
      <b-field  label=" ">
        <p class="control">
          <b-button icon-left="arrow-left" type="is-dark" v-if="page > 0" v-on:click="page -= 1">ATGAL</b-button>
          <b-button icon-left="arrow-left" type="is-dark" v-else disabled>ATGAL</b-button>
          <button class="button" v-on:click="page_set()">Puslapiai: {{page + 1}}</button>
          <b-button icon-right="arrow-right" type="is-dark" v-if="page < maxpage" v-on:click="page += 1">TOLIAU</b-button>
          <b-button icon-right="arrow-right" type="is-dark" v-else disabled>ATGAL</b-button>
          <b-button v-on:click="bendra_info()">BENDRA INFO</b-button>
          </p>
      </b-field>
      <hot-table ref="hotTableComponent" :data="duomenys[page]" :settings="hotSettings"></hot-table>

      <!--<b-tabs type="is-boxed" :multiline="multiline">
        <template v-for="(tab, index) in tabs">
          <b-tab-item :key="index" :label="tab">
            <hot-table :data="duomenys[index]" :settings="hotSettings"></hot-table>
          </b-tab-item>
        </template>
        <b-tab-item v-if="maxpage > 0" :key="maxpage+1" label="BENDRA INFO">
          <hot-table ref="hotTableComponent" :data="bendra" :settings="hotSettings"></hot-table>
        </b-tab-item>
      </b-tabs> -->
      </card-component>
    </section>
  </div>

</template>

<style>
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
      multiline: true,
      page: 0,
      perpage: 11,
      maxpage: 0,
      file: null,
      failas: "",
      //duomenu masyvas lentelei
      data: [],
      bendra: [],
      duomenys: [],
      raides: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      warehouse: [],
      dalinti: [],
      newas: [],
      sandeliai: [],
      share: [],
      tabs: [],
    }
  },
  watch: {
    page: function (value) {
      //uzkraunam atnaujintus duomenis i lentele
      this.$refs.hotTableComponent.hotInstance.loadData(this.duomenys[value]);
    },
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    create_array() {
      let i, x, y, r, eilute = 3, ok = 1;
      let was = this.dalinti.sliceIntoChunks(this.perpage);
      this.maxpage = was.length -1;
      for(let a = 0; a <= this.maxpage; a++){
        this.newas = was[a];
        //susikuriam TAB - SHEAT pavadinimus
        this.make_sheat();

        this.data[0] = ["Kodas"];
        this.data[1] = ["Kiekis"];
        this.data[2] = [""];

        this.data[0][this.perpage+1] = "SUMA";
        this.data[1][this.perpage+1] = '=SUM(B2:L2)';

        //sudedam sandelius, 
        //iterpiam formule SUM
        let sand = 0, xx = eilute, yy = 0;
        for (i = 0; i < this.warehouse.length; i++) {
          let sk = this.warehouse[i].length;
          //console.log(sk)
          sand += sk;
          for (x = 0; x < sk; x++) {
            r = xx+1;
            //console.log(this.warehouse[i][x])
            this.data[xx] = [this.warehouse[i][x]];
            this.data[xx][this.perpage+1] = '=SUM(B'+r+':L'+r+')';

            //bendra info, sudedam sablona pirma karta sukant cikla
            //poto ignoruojam
            if(ok == 1){
              this.bendra[yy] = [this.warehouse[i][x]];
              this.bendra[yy][1] = 0;
            }

            xx++; yy++;
          }
          this.data[xx] = [""];
          xx++; yy++;
        }
        ok = 0;

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
          //console.log("ID: "+a+" "+kodas)
          if(kodas in this.share){
            //console.log(kodas);
            for (y = 0; y < this.share[kodas].length; y++) {
              let  xxx, ss = 0, z;
              //console.log(this.share[kodas][y]);    
              for (z = 0; z < this.warehouse.length; z++) {
                xxx = this.arraySearch(this.warehouse[z], this.share[kodas][y]);
                if(xxx){
                  //console.log(z +' - '+ xxx +' - '+ ss);
                  this.bendra[ss + xxx][1] += 1;
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
          //console.log(sand+' - '+lt+' - '+lv+' - '+ee);

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

        this.duomenys[a] = this.data;
        this.data = [];
      }
      //uzkraunam atnaujintus duomenis i lentele
      this.$refs.hotTableComponent.hotInstance.loadData(this.duomenys[0]);
    },
    page_set(){
      this.$refs.hotTableComponent.hotInstance.loadData(this.duomenys[this.page]);
    },
    bendra_info(){
      this.$refs.hotTableComponent.hotInstance.loadData(this.bendra);
    },
    make_sheat(){
      for(let i = 0; i <= this.maxpage; i++){
        this.tabs[i] = "Puslapis "+(i+1);
      }
    },
  arraySearch(arr, val) {
    for (var i=0; i<arr.length; i++)
        if (arr[i] === val)                    
            return i;
    return false;
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

        this.create_array()
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
