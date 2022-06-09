<template>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="finance">
      <div class="has-text-centered">Paskutini karta atnaujinta: {{ date }}</div>
        <div class="columns">
          <div class="column">
            <file-picker-post 
            @file-updated="file_info"
            post-subject="/export/store_akcija" 
            label="Export failo įkėlimas" 
            v-model="file"/>
            <p class="is-size-7">
              CSV failas: Ataskaitos -> Generuojamos ataskaitos -> Eksportas lipduku spausdinimui<br>
              Filtras: viska išvalyti, nes reikalingas visas barkodų sąrašas
            </p>
            <p class="control">
              <b-button size="is-medium" type="is-dark" @click="update_list">Atnaujinti</b-button>
            </p>
          </div>
          <div class="column">
            <file-picker-post 
            @file-updated="file_info2" 
            post-subject="/export/store_akcija" 
            label="Saskaitos failo įkėlimas" 
            v-model="file2"/>
            <p class="is-size-7">
              CSV failas: Ataskaitos -> Generuojamos ataskaitos -> Atsargų operacijos arba<br>
              Atsargos -> Atsargų ataskaitos -> Prekių likutis<br>
              Filtras: išsifiltruoti norimų prekių sąrašą
            </p>
            <p class="control">
              <b-button size="is-medium" type="is-dark" @click="update_list">Atnaujinti</b-button>
            </p>
          </div>
        </div>
      </card-component>
      <card-component title="Lipduku eksportas" icon="account-multiple">
        <div class="has-text-centered">Prekiu kiekis: {{ sarasas.length }}</div>
        <hr>
        <b-table
        :mobile-cards="mobile_card"
        bordered
        hoverable
        :narrowed="isNarrowed"
        :data="sarasas"
        :loading="isLoading">
        <b-table-column label=" " centered cellClass="is-smoke" sortable v-slot="props"> 
            {{ props.index + 1 }}
          </b-table-column>
          <b-table-column label="Kodas" field="kodas" centered cellClass="is-smoke" sortable v-slot="props"> 
            {{ props.row.kodas }}
          </b-table-column>
          <b-table-column label="Pavadinimas" field="p_lt" centered cellClass="is-smoke" sortable v-slot="props"> 
            {{ props.row.p_lt }}
          </b-table-column>
          <b-table-column label="Sudetis" field="sudetis_lt" centered cellClass="is-smoke" sortable v-slot="props">
            {{ props.row.sudetis_lt }}
          </b-table-column>
          <b-table-column label="Pirkimas" field="pirkimo_kaina" centered cellClass="is-smoke" sortable v-slot="props">
            {{ props.row.pirkimo_kaina }}
          </b-table-column>
          <b-table-column label="Gamintojas" field="gamintojas_lt" centered cellClass="is-smoke" sortable v-slot="props">
            {{ props.row.gamintojas_lt }}
          </b-table-column>
          <b-table-column label="Pardavimas" field="pardavimo_kaina_lt" centered cellClass="is-smoke" sortable v-slot="props">
            {{ props.row.pardavimo_kaina_lt }}
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
        </b-table>
        <hr>
      <div class="buttons">
        <vue-excel-xlsx class="button is-dark is-medium" :data="sarasas" :columns="columns" :filename="'perkelimai'" :sheetname="'LT'" >
          ATSISIŲSTI (excel)
        </vue-excel-xlsx>
      </div>
      </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import FilePickerPost from '@/components/FilePickerPost'

export default {
  name: 'Export',
  components: { CardComponent, FilePickerPost },
  data () {
    return {
      columns : [
        { label: "Kodas", field: "kodas", },
        { label: "P-LT", field: "p_lt", },
        { label: "P-LV", field: "p_lv", },
        { label: "P-EE", field: "p_ee", },
        { label: "Sudetis LT", field: "sudetis_lt", },
        { label: "Sudetis LV", field: "sudetis_lv", },
        { label: "Sudetis EE", field: "sudetis_ee", },
        { label: "Pirk. kaina", field: "pirkimo_kaina", },
        { label: "Gamintojas LT", field: "gamintojas_lt", },
        { label: "Gamintojas LV", field: "gamintojas_lv", },
        { label: "Gamintojas EE", field: "gamintojas_ee", },
        { label: "Pard. kaina LT", field: "pardavimo_kaina_lt", },
        { label: "Pard. kaina LV", field: "pardavimo_kaina_lv", },
        { label: "Pard. kaina EE", field: "pardavimo_kaina_ee", },
        { label: "Dydis", field: "dydis", },
      ],
      file: null,
      failas: '',
      file2: null,
      failas2: '',
      isLoading: false,
      isNarrowed: true,
      mobile_card: true,
      sarasas: [],
      date: '',
    }
  },
  computed: {
  },
  created() {
    this.getData()
    },
  mounted () {
  },
  methods: {
    file_info (value) {
      this.failas = value.name;
    },
    file_info2 (value) {
      this.failas2 = value.name;
    },
    getData () {
      this.isLoading = true
      this.axios
      .get('/export')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas;
        this.date = response.data.date;

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
    update_list(){
      this.isLoading = true
      this.axios
      .post(`/export/store`, {
        file: this.failas,
        file2: this.failas2,
        })
      .then(response => {
        console.log(response.data.data)
        this.getData()
        this.isLoading = false
        this.$buefy.toast.open({
          message: "Duomenys atnaujinti!",
          type: 'is-info',
          queue: false
        })
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
