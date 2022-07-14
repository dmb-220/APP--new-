<template>
  <div>
    <section class="section is-main-section">
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
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
        :data="sarasas[1]"
        sort-icon="arrow-up"
        :loading="isLoading"
        default-sort-direction="asc"
        default-sort="preke">
          <b-table-column label="Sandelis" width="200" v-slot="props">
              <div class="is-size-2 has-text-centered has-text-weight-bold has-background-grey-light">{{props.index}}</div>
              <br>
              <div class="buttons">
              <b-button type="is-danger" icon-right="delete" />
            </div>
            </b-table-column>
          <b-table-column label="Prekes" v-slot="props">
            <table class="table">
              <thead>
                <tr>
                  <th>Kodas</th>
                  <th>Kiekis</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in props.row">
                  <td>{{ index }}</td>
                  <td>{{ item.kiekis }}</td>
                </tr>
              </tbody>
            </table>
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
      <br>

      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
        <vue-excel-xlsx class = "button is-dark is-medium" :data="csv" :columns="columns" :filename="'perkelimai'" :sheetname="'LT'" >
          ATSISIŲSTI (excel)
        </vue-excel-xlsx>
        <download-csv class = "button is-dark is-medium"
          :data = "csv"
          :fields = "fields"
          delimiter = ";"
          :separator-excel = "separator"
          :advancedOptions = "adv"
          :name = "currentDate()">
          ATSISIŲSTI (csv)
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

export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent},
  data () {
    return {
      isFullPage: true,
      isLoading: false,
      isModalLikutis: false,
      adv: {
        header: false,
      },
      separator: true,
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
      dates: [],
      isLoading: false,
      sarasas: [],
      kiekis: [],
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();   
      return date+".csv";
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.$htmlToPaper('printMe');
    },
  getData () {
      this.isLoading = true
      this.axios
      .get('/stock_quant')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas; 
        this.kiekis = response.data.kiekis; 
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
