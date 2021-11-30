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
          <button class="button" v-on:click="page_set()">Puslapiai: {{page + 1}} ( {{maxpage+1}} )</button>
          <b-button icon-right="arrow-right" type="is-dark" v-if="page < maxpage" v-on:click="page += 1">TOLIAU</b-button>
          <b-button icon-right="arrow-right" type="is-dark" v-else disabled>ATGAL</b-button>
          <b-button v-on:click="bendra_info()">BENDRA INFO</b-button>
          </p>
      </b-field>
      <div  id="printMe">
        <hot-table ref="hotTableComponent" :data="duomenys[page]" :settings="hotSettings"></hot-table>
      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
      </div>
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
        colHeaders: false,
        rowHeaders: false,
        height: 'auto',
        selectionMode: 'multiple',
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
      let y, r, eilute = 5, ok = 1;
      let lt, lv, ee, sand; 

      let was = this.dalinti.sliceIntoChunks(this.perpage);
      this.maxpage = was.length -1;
      for(let a = 0; a <= this.maxpage; a++){
        this.newas = was[a];
        //susikuriam TAB - SHEAT pavadinimus
        this.make_sheat();

        this.data[0] = ["Kodas"];
        this.data[1] = ["Gaminys"];
        this.data[2] = ["Kaina"];
        this.data[3] = ["Kiekis"];
        this.data[4] = [""];

        this.data[0][this.perpage+1] = "SUMA";
        //this.data[1][this.perpage+1] = '=SUM(B2:L2)';

        //sudedam sandelius, 
        //iterpiam formule SUM
        let xx = eilute, yy = 0;
        sand = 0;
        for (let i = 0; i < this.warehouse.length; i++) {
          let sk = this.warehouse[i].length;
          //console.log(sk)
          sand += sk;
          for (let x = 0; x < sk; x++) {
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
        this.data[sand+7] = [""];
        this.data[sand+8] = ["SUMA"];
        this.data[sand+9] = ["BALANSAS"];

        this.data[sand+10] = ["INTERNETAS"];
        this.data[sand+11] = ["LIETUVA"];
        this.data[sand+12] = ["LATVIJA"];
        this.data[sand+13] = ["ESTIJA"];

        //stulpeliai su KODAI ir likuciu
        for (let i = 1; i <= this.newas.length; i++) {
          let kodas = this.newas[i-1]['barkodas'];
          let ko = kodas.split("-");
          let ks = ko.length-1;
          this.data[0][i] = ko[ks-1]+"-"+ko[ks];
          this.data[3][i] = this.newas[i-1]['likutis'];
          //console.log("ID: "+a+" "+kodas)
          if(this.newas[i-1]['likutis'] > 0){
            //reik tikrinti ar likutis nera maziau 
            //norima dalinti kieki
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
          }

          //iskaiciuoti masyvo pradini galini taskus
          //kad keiciant parduotuviu sasrasa veiktu 
          lt = this.warehouse[0].length;
          lv = this.warehouse[1].length;
          ee = this.warehouse[2].length;
          //console.log(sand+' - '+lt+' - '+lv+' - '+ee);

          let pirma = eilute-1;
          let paskutine = sand+eilute+2; //masyvas/3 eilutes nuo virsaus/ 2 tarpai tarp sandeliu

          //SUMA//BALANSAS
          this.data[sand+8][i] = '=SUM('+this.raides[i]+(eilute+1)+':'+this.raides[i]+paskutine+')';
          this.data[sand+9][i] = '=('+(this.raides[i]+pirma)+'-'+(this.raides[i]+(paskutine+2))+')';
          //INTERNETAS//VALSTYBES
          //this.data[sand+8][i] = '=('+this.raides[i]+(lt+eilute)+'+'+this.raides[i]+(lt+lv+eilute+1)+'+'+this.raides[i]+(lt+lv+ee+eilute+2)+')';
          this.data[sand+11][i] = '=SUM('+this.raides[i]+(eilute+1)+':'+this.raides[i]+(lt+eilute)+')';
          this.data[sand+12][i] = '=SUM('+this.raides[i]+(lt+eilute+2)+':'+this.raides[i]+(lt+lv+eilute+1)+')';
          this.data[sand+13][i] = '=SUM('+this.raides[i]+(lt+lv+eilute+3)+':'+this.raides[i]+(sand+7)+')';
        }
        //SUMA viso
        //this.data[sand+8][this.perpage+1] = '=('+this.raides[this.perpage+1]+(lt+eilute)+'+'+this.raides[this.perpage+1]+(lt+lv+eilute+1)+'+'+this.raides[this.perpage+1]+(lt+lv+ee+eilute+2)+')';
        this.data[sand+11][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+(eilute+1)+':'+this.raides[this.perpage+1]+(lt+eilute)+')';
        this.data[sand+12][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+(lt+eilute+2)+':'+this.raides[this.perpage+1]+(lt+lv+eilute+1)+')';
        this.data[sand+13][this.perpage+1] = '=SUM('+this.raides[this.perpage+1]+(lt+lv+eilute+3)+':'+this.raides[this.perpage+1]+(sand+7)+')';

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
  print() {
      this.$htmlToPaper('printMe');
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
