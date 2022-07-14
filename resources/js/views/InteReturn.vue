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
        :data="sarasas"
        sort-icon="arrow-up"
        :loading="isLoading"
        default-sort-direction="asc"
        default-sort="preke">
          <b-table-column label="Nr." v-slot="props">
              {{props.index + 1}}
            </b-table-column>
          <b-table-column label="Preke" field="kodas" sortable v-slot="props">
                {{props.row.kodas}}
          </b-table-column>
          <b-table-column cellClass="is-smoke" label="Perkelti" v-slot="props">
                {{ props.row.perkelti }}
          </b-table-column>
          <b-table-column cellClass="is-one2" label="LIETUVA"  field="liko_LT" sortable v-slot="props">
                YRA: {{ props.row.INTE_old ? props.row.INTE_old : 0 }} / BUS: {{ props.row.INTE_new }}
          </b-table-column>
          <b-table-column cellClass="is-two2" label="LATVIJA"  field="liko_LV" sortable v-slot="props">
                YRA: {{ props.row.INLV_old ? props.row.INLV_old : 0 }} / BUS: {{ props.row.INLV_new }}
          </b-table-column>
          <b-table-column cellClass="is-three2"  label="ESTIJA"  field="liko_EE" sortable v-slot="props">
                YRA: {{ props.row.INEE_old ? props.row.INEE_old : 0 }} / BUS: {{ props.row.INEE_new }}
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
      csv: [],
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
      .get('/inte_return')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas; 
        this.csv = response.data.csv; 
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
