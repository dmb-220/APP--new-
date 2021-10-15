<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Bankas CSV:" horizontal>
          <file-picker-bankas @file-updated="file_info_bankas" v-model="file_bankas"/>
        </b-field>
        <b-field  label="Pardavimo CSV:" horizontal>
          <file-picker-pardavimai @file-updated="file_info_pardavimai" v-model="file_pardavimai"/>
        </b-field>
          <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-sark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
        <hr>
        <button class="button is-sark" @click="rinktis('1')">Pardavimai</button>
        <button class="button is-sark" @click="rinktis('2')">Grąžinimai</button>
        <button class="button is-sark" @click="rinktis('3')">VENIPAK</button>
      </card-component>
      <card-component v-if="isjungta" title="Apyvarta" icon="account-multiple"> 
        <!-- VISA APYVARTA INTE -->
        <div  id="printMe">
          <div class="has-text-centered">
            <b>UAB Sidonas ir Ko</b>
          </div>
          <div class="has-text-centered">
            Įm. kodas: 180886050
          </div>
          <div class="has-text-centered">
            Kęstučio 20-1, LT-87120, Telšiai, Lietuva
          </div>
          <br>
          <div class="has-text-centered is-size-5">
            <b>Internetinė parduotuvė ( INLV )</b>
          </div>
          <div v-if="rodo == 1" class="has-text-centered is-size-5">Pardavimai</div>
          <div v-if="rodo == 2" class="has-text-centered is-size-5">Grąžinimai</div>
          <div v-if="rodo == 3" class="has-text-centered is-size-5">VENIPAK</div>
          <div class="has-text-centered">
            LATVIJA
          </div>
          <br>
          <br>
          <b-table
          bordered
          :narrowed="true"
          :data="data_list"
          sort-icon="arrow-up"
          :loading="isLoading"
          default-sort-direction="asc"
          :row-class="onRowClass"
          default-sort="saskaitos_nr">
          <template slot-scope="props">
            <b-table-column label="Nr.">
              {{props.index + 1}}
            </b-table-column>
            <b-table-column label="Data" field="data" sortable>
                  {{props.row.data}}
            </b-table-column>
            <b-table-column label="DINETA"  field="saskaitos_nr" sortable>
                  {{ props.row.saskaitos_nr }}
            </b-table-column>
            <b-table-column class="has-text-right" label="Prestashop"  field="unikalus">
                  {{ props.row.unikalus }}
            </b-table-column>
            <b-table-column class="has-text-right" label="Su PVM"  field="suma">
                  {{  parseFloat(props.row.suma).toFixed(2) }}
            </b-table-column>
            <b-table-column class="has-text-right" label="Be PVM"  field="pardavimo_suma">
                  {{  parseFloat(props.row.pardavimo_suma).toFixed(2) }}
            </b-table-column>
            <b-table-column class="has-text-right" label="PVM 21%"  field="pvm_suma">
                  {{  parseFloat(props.row.pvm_suma).toFixed(2) }}
            </b-table-column>
            <b-table-column :visible="rodo == 1 || rodo == 3" class="has-text-right" label="Pristatymas"  field="pristatymas">
                  {{ parseFloat(props.row.pristatymas).toFixed(2) }}
            </b-table-column>
            <b-table-column :visible="rodo == 1 || rodo == 3" class="has-text-right" label="Per banka, Eur"  field="">
                  {{ parseFloat(props.row.pristatymas + props.row.suma).toFixed(2) }}
            </b-table-column>
            <b-table-column label="Bankas"  field="bankas">
                  {{ props.row.bankas && props.row.bankas.suma }}
            </b-table-column>
            <b-table-column :visible="rodo == 2" class="has-text-right" label="TEST"  field="bankas">
                   {{ props.row.bankas_list }}
            </b-table-column>
            <b-table-column label="Pirkėjas" field="pirkejas" sortable>
                  {{props.row.pirkejas}}
            </b-table-column>
          </template> 
          <section class="section" slot="empty">
            <div class="content has-text-centered">
              <template v-if="isLoading">
                <p>
                  <b-icon icon="dots-horizontal" size="is-large"/>
                </p>
                <p>Gaunami duomenys...</p>
              </template>
              <template v-else>
                <p>
                  <b-icon icon="emoticon-sad" size="is-large"/>
                </p>
                <p>Duomenų nerasta &hellip;</p>
              </template>
            </div>
          </section>
          <template slot="footer">
                <th class="has-text-right">VISO:</th>
                <th> </th>
                <th> </th>
                <th> </th>
                <th class="has-text-right">{{ apy_suma.toFixed(2) }}</th>
                <th class="has-text-right">{{ apy_suma2.toFixed(2) }}</th>
                <th class="has-text-right">{{ apy_pvm.toFixed(2) }}</th>
                <th v-if="rodo == 1 || rodo == 3" class="has-text-right">{{ parseFloat(apy_pristatymas).toFixed(2) }}</th>
                <th v-else class="has-text-right"> </th>

                <th v-if="rodo == 1 || rodo == 3" class="has-text-right">{{ parseFloat(apy_suma+apy_pristatymas).toFixed(2) }}</th>
                <th v-else class="has-text-right"> </th>
            </template>
        </b-table>
        </div>
        <hr>
        <div class="buttons">
          <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print('printMe')">SPAUSDINTI</b-button>
          <vue-excel-xlsx class = "button is-dark is-medium" :data="data_list" :columns="columns" :filename="'filename'" :sheetname="'sheetname'">
            Atsisiusti
        </vue-excel-xlsx>
        </div>
      </card-component>
      <card-component v-else title="Apyvarta" icon="account-multiple">
      <div v-if="isLoading">Generuojami duomenys</div>
      <div v-else>Duomenys paruošti rodymui, spauskite viršuje esančius myktukus.</div>
      </card-component>
    </section>
  </div>

</template>

<style  scoped>
    
</style>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'


import FilePickerBankas from '@/components/FilePickerBankas2'
import FilePickerPardavimai from '@/components/FilePickerPardavimai'

export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent, FilePickerBankas, FilePickerPardavimai},
  data () {
    return {
      columns : [
        {label: "Data", field: "data"},
        {label: "Nr.", field: "saskaitos_nr"},
        {label: "Unikalus nr.", field: "unikalus"},
        {label: "Suma.", field: "suma"},
        {label: "Pardavimo suma", field: "pardavimo_suma"},
        {label: "PVM suma", field: "pvm_suma"},
        {label: "Pristatymas", field: "pristatymas"},
        {label: "Bankas", field: "bankas_suma"},
        {label: "Pirkėjas", field: "pirkejas"},
      ],
      color: [
        'is-one', 'is-two', 'is-three'
      ],
      file_bankas: null,
      file_pardavimai: null,
      failas_bankas: "",
      failas_pardavimai: "",

      showDetailIcon: false,
      isLoading: false,
      sarasas: [],
      graza: [],
      venipak: [],

      data_list: [],
      sandelis: "INLV",
      bankas: "LV",
      rodo: '1',
      isjungta: 0
    }
  },
  created () {
    this.getData();
  },
  methods: {

    bankasFormat(value){
      console.log(value);
        return value;
    },

    file_info_bankas (value) {
      this.failas_bankas = value.name;
    },
    file_info_pardavimai (value) {
      this.failas_pardavimai = value.name;
    },

    onRowClass: function (row, index) {
      if(this.rodo != 2){
        if((row.bankas && row.bankas.suma) == (row.suma + row.pristatymas).toFixed(2)){
          return this.color[0];
        }else{
          if(!(row.bankas && row.bankas.suma)){
            return this.color[1];
          }else{
             return this.color[2];
          }
        }  
      }else{
        if((row.bankas && row.bankas.suma) + row.suma == 0){
          return this.color[0];
        }else{
          if(!(row.bankas && row.bankas.suma)){
            return this.color[1];
          }else{
             return this.color[2];
          }
        } 
      }   
    },

  print(print) {
    // Pass the element id here
    this.mobile_card = false;
    this.isvezta = false;
    this.$htmlToPaper(print);
  },

  rodyti(){
    if(this.rodo == 1){ this.data_list = this.sarasas;}
    if(this.rodo == 2){ this.data_list = this.graza;}
    if(this.rodo == 3){ this.data_list = this.venipak;}
  },
  
  rinktis(id){
    this.isjungta = 1;
    this.rodo = id;
    this.rodyti();
    console.log(this.rodo);
  },

  suformuoti(){
    axios
      .post(`/inte/store`, {
        file_pardavimai: this.failas_pardavimai,
        file_bankas: this.failas_bankas,
        sandelis: this.sandelis,
        bankas: this.bankas,
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
      .get('/inte/indexlv')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas;  
        this.graza = response.data.graza;
        this.venipak = response.data.venipak; 
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
  },

    computed: {
    apy_suma: function(){
      let total = [];
        Object.entries(this.data_list).forEach(([key, val]) => {
            total.push(val.suma) // the value of the current key.
        });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
    apy_suma2: function(){
      let total = [];
      Object.entries(this.data_list).forEach(([key, val]) => {
          total.push(val.pardavimo_suma) // the value of the current key.
      });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
    apy_pvm: function(){
      let total = [];
      Object.entries(this.data_list).forEach(([key, val]) => {
          total.push(val.pvm_suma) // the value of the current key.
      });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
    apy_pristatymas: function(){
      let total = [];
      Object.entries(this.data_list).forEach(([key, val]) => {
          total.push(val.pristatymas) // the value of the current key.
      });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
  },
}
</script>
