<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Swedbank CSV:" horizontal>
          <file-picker-terminalas @file-updated="file_info_bankas" v-model="file_bankas"/>
        </b-field>
        <b-field  label="Luminor CSV:" horizontal> 
          <file-picker-terminalas @file-updated="file_info_bankas2" v-model="file_bankas2"/>
        </b-field>
          <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-sark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
      </card-component>
      <card-component title="Bankiniai terminalai (SWEDBANK)" icon="account-multiple">
        <div id="printMe">
          <div class="columns">
            <!-- SWEDBANK -->
            <div class="column">
              <div>SWEDBANK</div>
              <b-table
                bordered
                :narrowed="true"
                :data="swedbank"
                sort-icon="arrow-up"
                default-sort-direction="asc"
                default-sort="data">
                <b-table-column label="DATA" field="data" sortable v-slot="props">
                      {{ props.row.data }}
                </b-table-column>
                <b-table-column class="has-text-right" label="SUMA"  field="suma" v-slot="props">
                      {{ props.row.suma.toFixed(2) }}
                </b-table-column>
                <b-table-column class="has-text-right" label="KOMISINIAI"  field="komisiniai" v-slot="props">
                      {{ props.row.komisiniai.toFixed(2) }}
                </b-table-column>
                <b-table-column class="has-text-right" label="PAJAMOS"  field="pajamos" v-slot="props">
                      {{ props.row.pajamos.toFixed(2) }}
                </b-table-column>
              <template #footer>
                <th>Pinigai:<br>Pajamos:</th>
                <th>{{ pinigai.suma.toFixed(2) }}<br>{{ pajamos.suma.toFixed(2) }}</th>
                <th>{{ pinigai.komisiniai.toFixed(2) }}<br>{{ pajamos.komisiniai.toFixed(2) }}</th>
                <th>{{ pinigai.pajamos.toFixed(2) }}<br>{{ pajamos.pajamos.toFixed(2) }}</th>
              </template>
            </b-table>
          </div>
          <!-- LUMINOR -->
          <div class="column">
            <div>LUMINOR</div>
            <b-table
              bordered
              :narrowed="true"
              :data="luminor"
              sort-icon="arrow-up"
              :loading="isLoading"
              default-sort-direction="asc"
              default-sort="data">
              <b-table-column label="DATA" field="data" sortable v-slot="props">
                    {{ props.row.data }}
              </b-table-column>
              <b-table-column class="has-text-right" label="SUMA"  field="suma" v-slot="props">
                    {{ props.row.suma.toFixed(2) }}
              </b-table-column>
              <b-table-column class="has-text-right" label="KOMISINIAI"  field="komisiniai" v-slot="props">
                    {{ props.row.komisiniai.toFixed(2) }}
              </b-table-column>
              <b-table-column class="has-text-right" label="PAJAMOS"  field="pajamos" v-slot="props">
                    {{ props.row.pajamos.toFixed(2) }}
              </b-table-column>
              <template #footer>
                <th>Pinigai:<br>Pajamos:</th>
                <th>{{ pinigai_suma.toFixed(2) }}<br>{{ pajamos_suma.toFixed(2) }}</th>
                <th>{{ pinigai_komisiniai.toFixed(2) }}<br>{{ pajamos_komisiniai.toFixed(2) }}</th>
                <th>{{ pinigai_pajamos.toFixed(2) }}<br>{{ pajamos_pajamos.toFixed(2) }}</th>
              </template>
              </b-table>
            </div>
          </div>
        </div>
        <hr>
        <div class="buttons">
          <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print('printMe')">SPAUSDINTI</b-button>
          <vue-excel-xlsx class = "button is-dark is-medium" :data="luminor" :columns="columns" :filename="'filename'" :sheetname="'sheetname'">
            ATSISIŲSTI
          </vue-excel-xlsx>
        </div>
      </card-component>
    </section>
  </div>

</template>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

import FilePickerTerminalas from '@/components/FilePickerTerminalas'

export default {
  name: "Terminalas",
  components: {CardToolbar, CardComponent, FilePickerTerminalas },
  data () {
    return {
      defaultOpenedDetails: [1],
      showDetailIcon: false,
      isLoading: false,
      columns : [
        {label: "Data", field: "data"},
        {label: "Suma.", field: "suma"},
        {label: "Komisiniai", field: "komisiniai"},
        {label: "Pajamos", field: "pajamos"},
      ],
      columns2 : [
        {label: "Parduotuve", field: "store"},
        {label: "Suma.", field: "suma"},
        {label: "Komisiniai", field: "komisiniai"},
        {label: "Pajamos", field: "pajamos"},
      ],
      color: [
        'is-one',
        'is-two',
        'is-three'
      ],
      file_bankas: null,
      failas_bankas: "",
      file_bankas2: null,
      failas_bankas2: "",
      swedbank: [],
      luminor: [],
      pinigai: [],
      pajamos: [],
      title: [],
      store: [],
    }
  },
  computed: {
    pinigai_suma: function(){
      let total = 0;
      let all = this.luminor.length - 1;
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != all){ total += val.suma; }
        });
      return total;
    },
    pinigai_komisiniai: function(){
      let total = [];
      let all = this.luminor.length - 1;
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != all){
            total.push(val.komisiniai) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    pinigai_pajamos: function(){
      let total = [];
      let all = this.luminor.length - 1;
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != all){
            total.push(val.pajamos) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    pajamos_suma: function(){
      let total = [];
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != 0){
            total.push(val.suma) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    pajamos_komisiniai: function(){
      let total = [];
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != 0){
            total.push(val.komisiniai) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    pajamos_pajamos: function(){
      let total = [];
        Object.entries(this.luminor).forEach(([key, val]) => {
          if(key != 0){
            total.push(val.pajamos) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
  },
  created () {
    this.getData();
  },
  methods: {
    file_info_bankas (value) {
      this.failas_bankas = value.name;
  },
  file_info_bankas2 (value) {
      this.failas_bankas2 = value.name;
  },
  onClass: function (row) {
    console.log(row);
    if(row.index == this.sarasas.length - 1){
      return "is-one2";
    }
    if(row.index == 1){
      return "is-one2";
    }
  },
  print(print) {
    // Pass the element id here
    this.mobile_card = false;
    this.isvezta = false;
    this.$htmlToPaper(print);
  },
  getData () {
      this.isLoading = true
      this.axios
      .get('/terminal')
      .then(response => {
        this.isLoading = false
        this.swedbank = response.data.swedbank; 
        this.luminor = response.data.luminor; 
        this.pinigai = response.data.viso['pinigai'];
        this.pajamos = response.data.viso['pajamos'];  
        this.title = response.data.title; 
        this.store = response.data.store;       
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

    suformuoti(){
    axios
      .post(`/terminal/store`, {
        file_bankas: this.failas_bankas,
        file_bankas2: this.failas_bankas2,
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
  }
}
</script>
