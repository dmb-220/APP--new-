<template>
    <section class="section is-main-section">
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="finance">
          <file-picker-works @file-updated="file_info_works" v-model="file_works"/>
          <div class="columns">
            <div class="column">
              <b-datepicker
                placeholder="Pasirinkite data NUO"
                icon="calendar-today"
                v-model="nuo"
                editable>
              </b-datepicker>   
            </div>
            <div class="column"> 
              <b-datepicker
                placeholder="Pasirinkite data IKI"
                icon="calendar-today"
                v-model="iki"
                editable>
              </b-datepicker> 
            </div>
          </div>
          <p class="control">
            <button class="button is-dark" @click="suformuoti">Skaičiuoti</button>
          </p>
      </card-component>
      <card-component title="Darbo apskaita" icon="account-multiple">
        <p class="has-text-centered is-size-4 has-text-weight-semibold">
          {{ nuo.toLocaleDateString("en-CA") }} - {{ iki.toLocaleDateString("en-CA") }}
        </p>
        <div  id="printMe">
          <b-table
          bordered
          :data="works"
          :loading="isLoading">
            <b-table-column label="Sandelis" field="sandelis" v-slot="props"> 
                <div class="is-size-2 has-text-centered has-text-weight-bold">{{ props.row.sandelis }}</div>
            </b-table-column>
            <b-table-column label="Pardavejos" v-slot="props"> 
              <b-table :data="props.row.pardavejos">
                  <b-table-column label="Pardaveja" width="300" field="pardaveja" v-slot="props"> 
                      {{ props.row.pardaveja }} 
                  </b-table-column>
                  <b-table-column label="Apyvarta" field="suma" v-slot="props"> 
                      {{ props.row.suma.toFixed(2) }} € 
                  </b-table-column>
                  <b-table-column label="Grazinimai" field="graza" v-slot="props"> 
                      <div v-if="props.row.graza">{{ props.row.graza.toFixed(2) }} €</div>
                      <div v-else>0 €</div>
                  </b-table-column>
              </b-table>
            </b-table-column>
            <b-table-column label="Inv. trukumai" v-slot="props"> 
              <p class="is-size-7">2021-10-16 - 2022-05-21: 1678 €</p>
              <p class="is-size-7">2021-10-16 - 2022-05-21: 1678 €</p>
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell" v-slot="props">
              <div class="buttons">
                <button class="button is-info" type="button">
                  <b-icon icon="plus"/>
                </button>
                <button class="button is-primary" type="button">
                  <b-icon icon="account-edit"/>
                </button>
              </div>
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
        </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
      </div>
      </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import FilePickerWorks from '@/components/FilePickerWorks'

export default {
  name: 'Works',
  components: { CardComponent, FilePickerWorks },
  data () {
    return {
    works: [],
    nuo: new Date(),
    iki: new Date(),
    isLoading: false,
    isFullPage: true,
    defaultOpenedDetails: [1],
    showDetailIcon: false,
    isNarrowed: true,
    mobile_card: true,
    file_works: null,
    failas_works: "",   
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
    file_info_works(value) {
      this.failas_works = value.name;
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getData () {
      this.$buefy.toast.open({
        message: "Įkeliami nauji duomenys!",
        type: 'is-info',
      })
      this.isLoading = true
      this.axios
      .get('/works')
      .then(response => {
        this.isLoading = false
        this.works = response.data.works;
        this.nuo = new Date(Date.parse(response.data.nuo_iki['nuo']));
        this.iki = new Date(Date.parse(response.data.nuo_iki['iki']));
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
      this.isLoading = true
    axios
      .post(`/works/store`, {
        file_works: this.failas_works,
        nuo: this.nuo,
        iki: this.iki
        })
      .then(response => {
        console.log(response.data.data)
        this.getData()
        this.$buefy.toast.open({
          message: "Duomenys atnaujinti!",
          type: 'is-info',
          //queue: false
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
