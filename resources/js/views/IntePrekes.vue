<template>
  <div>
   <modal-likutis-box :is-active="isModalLikutis" @confirm="likutisConfirm" @cancel="likutisCancel"/>

    <section class="section is-main-section">
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
        <button class="button is-primary" type="button" @click.prevent="likutisModal">
          ĮKELTI LIKUČIUS
        </button>
        <hr>
        <b-field label="PAIEŠKA:" horizontal>
          <b-taginput
            @keyup.native.enter="paieska_post"
            v-model="tags"
            ellipsis
            icon="label"
            placeholder="Pridėti prekę"
            aria-close-label="Ištrinti prekę">
          </b-taginput>
          <b-button native-type="submit" type="is-primary" @click="paieska_post" outlined>Ieškoti</b-button>
        </b-field>
        <b-field label=" " horizontal>
            <b-checkbox v-model="paieska_big" type="is-info">Aktivuoti išplėstinę paieška</b-checkbox>
        </b-field>
        <b-field horizontal>
          <b-button :type="salis['LT'] ? 'is-primary' : 'is-dark'" @click="change_lt()">LIETUVA</b-button>
          <b-button :type="salis['LV'] ? 'is-warning' : 'is-dark'" @click="change_lv()">LATVIJA</b-button>
          <b-button :type="salis['EE'] ? 'is-danger' : 'is-dark'" @click="change_ee()">ESTIJA</b-button>
        </b-field>
        </card-component>

      <card-component title="Prekės" icon="account-multiple">
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
      </div>
      <hr>
        <div  id="printMe">
        <b-table
        bordered
        :narrowed="true"
        :data="sarasas"
        sort-icon="arrow-up"
        :loading="isLoading"
        default-sort-direction="asc"
        default-sort="preke">
          <b-table-column label="Preke" field="preke" sortable v-slot="props">
                {{props.row.preke}}
          </b-table-column>
          <b-table-column cellClass="is-smoke" label="Viso" v-slot="props">
                {{ (props.row.liko_LT ? props.row.liko_LT : 0) + (props.row.liko_LV ? props.row.liko_LV : 0) + (props.row.liko_EE ? props.row.liko_EE : 0) }}
          </b-table-column>
          <b-table-column cellClass="is-one2" label="LIETUVA"  field="liko_LT" sortable v-slot="props">
                YRA: {{ props.row.liko_LT ? props.row.liko_LT : 0 }} / BUS: {{ props.row.new_LT }}
          </b-table-column>
          <b-table-column cellClass="is-two2" label="LATVIJA"  field="liko_LV" sortable v-slot="props">
                YRA: {{ props.row.liko_LV ? props.row.liko_LV : 0 }} / BUS: {{ props.row.new_LV }}
          </b-table-column>
          <b-table-column cellClass="is-three2"  label="ESTIJA"  field="liko_EE" sortable v-slot="props">
                YRA: {{ props.row.liko_EE ? props.row.liko_EE : 0 }} / BUS: {{ props.row.new_EE }}
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
              <th class="has-text-right">VISO:</th>
              <th> </th>
              <th> </th>
              <th class="has-text-right"></th>
              <th class="has-text-right"></th>
              <th class="has-text-right"></th>
          </template>
      </b-table>
      <br>

      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
        <vue-excel-xlsx class = "button is-dark is-medium" :data="LTto" :columns="columns" :filename="'perkelimai'" :sheetname="'LT'" >
          ATSISIŪSTI (excel)
        </vue-excel-xlsx>
        <download-csv
          class   = "button is-dark is-medium"
          :data   = "LTto"
          :fields = "fields"
          delimiter = ";"
          :advancedOptions = "adv"
          name = "perkelimai.csv">
          Atsisiusti CSV
        </download-csv>
      </div>
      </card-component>
    </section>
  </div>

</template>

<style  scoped>
    
</style>

<script>
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

import ModalLikutisBox from '@/components/ModalLikutisBox'

export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent, ModalLikutisBox},
  data () {
    return {
      isFullPage: true,
      isModalLikutis: false,
      adv: {
        header: false,
      },
      fields: ['kiekis', 'preke', 'sand_is', 'sand_i', 'nr'],
      columns : [
        {
            label: "Kiekis",
            field: "kiekis",
        },
        {
            label: "Prekė",
            field: "preke",
        },
        {
            label: "Sandelis is",
            field: "sand_is",
        },
        {
            label: "Sandelis i",
            field: "sand_i",
        },
        {
            label: "Blanko nr.",
            field: "nr",
        },
      ],
      tags: [],
      //ieskoti: '',
      paieska_big: false,
      paieska: '',
      salis: [],
      dates: [],
      isLoading: false,
      sarasas: [],
      LTto: [],
      failas_LT: '',
    }
  },
  computed: {
  },
  created () {
    this.getData();
    this.ieskoti = this.paieska;
  },
  methods: {
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isvezta = false;
      this.$htmlToPaper('printMe');
    },

    paieska_post(){
      axios
        .post(`/intepreke/store_save`, {
          ieskoti: this.ieskoti,
          tags: this.tags,
          paieska_big: this.paieska_big,
          salis: this.salis,
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
    change_lt(){
      this.salis['LT'] = !this.salis['LT']
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_lv(){
      this.salis['LV'] = !this.salis['LV']
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_ee(){
      this.salis['EE'] = !this.salis['EE']
      this.ieskoti = this.paieska
      this.paieska_post()
    },
  getData () {
      this.isLoading = true
      this.axios
      .get('/intepreke')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas; 
        this.LTto = response.data.LTto; 
        this.paieska_big = response.data.paieska_big ? true : false;
        this.paieska = response.data.paieska;
        this.salis = response.data.salis;
        this.tags = response.data.tags;
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

    likutisModal () {
      this.isModalLikutis = true
    },

    likutisConfirm (failai) {
      this.isLoading = true
      this.isModalLikutis = false
      axios
        .post(`/intepreke/store`, {
        file_LT: failai.LT,
        })
        .then(response => {
          console.log(response.data.data)
          this.getData()
          this.$buefy.toast.open({
            message: `Likučiai atnaujinti!`,
            queue: false
          })
      })
        .catch( err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
    },
    likutisCancel () {
      this.isModalLikutis = false
    },
  }
}
</script>
