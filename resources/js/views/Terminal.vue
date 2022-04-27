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
      <b-tabs type="is-toggle">
        <b-tab-item label="Pagal data" icon="google-photos">
          <div id="printMe">
            <b-table
            bordered
            :narrowed="true"
            :data="sarasas"
            sort-icon="arrow-up"
            :loading="isLoading"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="data"
            :show-detail-icon="showDetailIcon"
            @details-open="(row) => $buefy.toast.open(`Atidaryta ${row.data}`)"
            :row-class="onClass"
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

            <template #detail="props">
              <div class="columns">
                <div class="column" :style="{'border': '1px solid'}">
                <b-table
                    :data="props.row.pard"
                    default-sort-direction="desc"
                    default-sort="parduotuve"
                    :bordered="true"
                    :striped="true"
                    :narrowed="true">
                        <b-table-column field="parduotuve" label="Parduotuve" sortable v-slot="props">
                            {{ props.row.parduotuve }}
                        </b-table-column>
                        <b-table-column label="Suma" field="suma" sortable v-slot="props">
                            {{ parseFloat(props.row.suma).toFixed(2) }}
                        </b-table-column>
                        <b-table-column label="Komisiniai" field="komisiniai" sortable v-slot="props">
                            {{ parseFloat(props.row.komisiniai).toFixed(2) }}
                        </b-table-column>
                        <b-table-column label="Pajamos" field="pajamos" sortable v-slot="props">
                            {{ parseFloat(props.row.pajamos).toFixed(2) }}
                        </b-table-column>
                    </b-table>
                </div>
              </div>
            </template>

            <section class="section" slot="empty">
              <div class="content has-text-centered">
                <template v-if="isLoading">
                  <p><b-icon icon="dots-horizontal" size="is-large"/></p>
                  <p>Gaunami duomenys...</p>
                </template>
                <template v-else>
                  <p><b-icon icon="emoticon-sad" size="is-large"/></p>
                  <p>Duomenų nerasta &hellip;</p>
                </template>
              </div>
            </section>
            <template #footer>
            <th><br>BE<br></th>
              <th>{{ title.pirmas }}<br>{{ title.antras }}<br>{{ title.trecias }}</th>
              <th>{{ viso.suma.toFixed(2) }}<br>{{ pinigai.suma.toFixed(2) }}<br>{{ pajamos.suma.toFixed(2) }}</th>
              <th>{{ viso.komisiniai.toFixed(2) }}<br>{{ pinigai.komisiniai.toFixed(2) }}<br>{{ pajamos.komisiniai.toFixed(2) }}</th>
              <th>{{ viso.pajamos.toFixed(2) }}<br>{{ pinigai.pajamos.toFixed(2) }}<br>{{ pajamos.pajamos.toFixed(2) }}</th>
            </template>
          </b-table>
        </div>
        <hr>
        <div class="buttons">
          <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print('printMe')">SPAUSDINTI</b-button>
          <vue-excel-xlsx class = "button is-dark is-medium" :data="sarasas" :columns="columns" :filename="'filename'" :sheetname="'sheetname'">
            ATSISIŲSTI
        </vue-excel-xlsx>
        </div>
        </b-tab-item>
        <b-tab-item label="Pagal parduotuves" icon="library-music">
          <div id="printMe2">
            <b-table
            bordered
            :narrowed="true"
            :data="store"
            sort-icon="arrow-up"
            :loading="isLoading"
            default-sort-direction="asc"
            default-sort="store">
              <b-table-column label="Parduotuve" field="store" sortable v-slot="props">
                    {{ props.row.store }}
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
            <section class="section" slot="empty">
              <div class="content has-text-centered">
                <template v-if="isLoading">
                  <p><b-icon icon="dots-horizontal" size="is-large"/></p>
                  <p>Gaunami duomenys...</p>
                </template>
                <template v-else>
                  <p><b-icon icon="emoticon-sad" size="is-large"/></p>
                  <p>Duomenų nerasta &hellip;</p>
                </template>
              </div>
            </section>
            <template #footer>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </template>
          </b-table>
        </div>
        <hr>
        <div class="buttons">
          <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print('printMe2')">SPAUSDINTI</b-button>
          <vue-excel-xlsx class = "button is-dark is-medium" :data="store" :columns="columns2" :filename="'filename'" :sheetname="'sheetname'">
            ATSISIŲSTI
        </vue-excel-xlsx>
        </div>
        </b-tab-item>
      </b-tabs>
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
      showDetailIcon: true,
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
      sarasas: [],
      pinigai: [],
      pajamos: [],
      viso: [],
      title: [],
      store: [],
    }
  },
  computed: {
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
        this.sarasas = response.data.data; 
        this.pinigai = response.data.viso['pinigai'];
        this.pajamos = response.data.viso['pajamos'];  
        this.viso = response.data.viso['viso']; 
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
