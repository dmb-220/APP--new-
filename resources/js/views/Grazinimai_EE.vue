<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Bankas CSV:" horizontal>
          <file-picker-bankas @file-updated="file_info_bankas" v-model="file_bankas"/>
        </b-field>
        <b-field  label="Grazinimo CSV:" horizontal>
          <file-picker-grazinimai @file-updated="file_info_grazinimai" v-model="file_grazinimai"/>
        </b-field>
        <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-sark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
      </card-component>
      <card-component title="Grazinimas ESTIJA" icon="account-multiple">
      <b-field>
        <b-checkbox v-model="no_input" :value="true" type="is-info">Redaguoti informacija</b-checkbox>
      </b-field>
      <hr>
        <div  id="printMe">
        <b-table
         :checked-rows.sync="checkedRows"
        checkable
        :checkbox-position="checkboxPosition"
        :is-row-checkable="onRowClass"
        bordered
        :narrowed="true"
        :data="graza"
        sort-icon="arrow-up"
        :loading="isLoading"
        default-sort-direction="asc"
        default-sort="saskaitos_nr">
          <b-table-column label="Data" field="data" sortable v-slot="props">
                {{props.row.data}}
          </b-table-column>
          <b-table-column label="Nr"  field="saskaitos_nr" sortable v-slot="props">
                {{ props.row.saskaitos_nr }}
          </b-table-column>
          <b-table-column class="has-text-right" label="SUMA"  field="suma" v-slot="props">
                <b-input v-if="no_input" type="text" v-model="props.row.suma"></b-input>
                <div v-else>{{ props.row.suma }}</div>
          </b-table-column>
           <b-table-column label="Unikalus"  field="unikalus" v-slot="props">
                {{ props.row.unikalus }}
          </b-table-column>
          <b-table-column label="Saskaita"  field="bankas" v-slot="props">
            <b-input v-if="no_input" type="text" v-model="props.row.bankas && props.row.bankas.saskaita"></b-input>
            <div v-else>{{ props.row.bankas && props.row.bankas.saskaita }}</div>
          </b-table-column>
          <b-table-column label="Pirkejas" cellClass="is-smoke" field="pirkejas" v-slot="props">
          <b-input v-if="no_input" type="text" v-model="props.row.bankas && props.row.bankas.pavadinimas "></b-input>
          <div v-else>{{ props.row.bankas && props.row.bankas.pavadinimas }}</div>
          </b-table-column>
          <b-table-column label="Prestashop" cellClass="is-smoke" field="pirkejas" v-slot="props">
                <small>( {{ props.row.pirkejas }} )</small>
          </b-table-column>
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
        <template #footer>
              <th class="has-text-right"></th>
              <th> </th>
              <th> </th>
              <th class="has-text-right"></th>
          </template>
      </b-table>
      <br>

      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
        <b-button size="is-medium" icon-left="download" type="is-dark" v-if="checkedRows.length > 0" @click="xml">ATSISIŪSTI</b-button>
        <b-button size="is-medium" icon-left="download" type="is-dark" v-else disabled @click="xml">ATSISIŪSTI</b-button>
      </div>
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

import FilePickerBankas from '@/components/FilePickerBankas'
import FilePickerGrazinimai from '@/components/FilePickerGrazinimai'

export default {
  name: "Grazinimai",
  components: {CardToolbar, CardComponent, FilePickerBankas, FilePickerGrazinimai },
  data () {
    return {
      checkboxPosition: 'left',
      checkedRows: [],
      showDetailIcon: false,
      isLoading: false,
      color: [
        'is-one',
        'is-two',
        'is-three'
      ],
      file_bankas: null,
      file_grazinimai: null,
      failas_bankas: "",
      failas_grazinimai: "",
      no_input: false,
      graza: [],

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
    file_info_grazinimai (value) {
      this.failas_grazinimai = value.name;
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isvezta = false;
      this.no_input = false;
      this.$htmlToPaper('printMe');
    },
    onRowClass: function (row) {
      if(row.bankas && row.bankas.saskaita == "EE"){
        return false;
      }else{
        return true;
      }    
    },
    xml(){
    axios
      .post(`/grazinimai/sepa_EE`, {
        list: this.checkedRows,
        })
      .then(response => {
        console.log(response.data)
        var blob = new Blob([response.data], {encoding:"UTF-8", type:"text/plain; charset=UTF-8"})

        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'grazinimas_EE.xml'
        link.click()
    })
      .catch( err => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })
},

suformuoti(){
    axios
      .post(`/grazinimai/store_EE`, {
        file_grazinimai: this.failas_grazinimai,
        file_bankas: this.failas_bankas,
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
      .get('grazinimai/grazinimai_ee')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas;  
        this.graza = response.data.graza;    
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
