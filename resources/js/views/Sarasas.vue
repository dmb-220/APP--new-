<template>
    <section class="section is-main-section">
      <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>

      <card-component title="VALDYMAS" icon="finance">
      </card-component>
      <card-component title="Sarasas" icon="account-multiple">
        <div  id="printMe">
        <b-table
          bordered
          :data="sarasas">
            <b-table-column label="Kodas" field="kodas" v-slot="props"> 
                {{ props.row.kodas }}
            </b-table-column>
            <b-table-column label="Kaina" field="kaina" v-slot="props"> 
                {{ props.row.kaina }}
            </b-table-column>
        </b-table>
        </div>
      <hr>
      <div class="buttons">
        <vue-excel-xlsx class = "button is-dark is-medium" :data="sarasas" :columns="columns" :filename="'perkelimai_LT'" :sheetname="'LT'" >
          ATSISIŪSTI
        </vue-excel-xlsx>
      </div>
      </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Sarasas',
  components: { CardComponent },
  data () {
    return {
      columns : [
        {
            label: "Prekė",
            field: "kodas",
        },
        {
            label: "Kaina",
            field: "kaina",
        },
      ],
    isLoading: false,
    isFullPage: true,
    sarasas: [],
    }
  },
  computed: {
  },
  created() {
    this.getData()
    },

  methods: {
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getData () {
      this.isLoading = true
      this.axios
      .get('/sarasas')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.array;
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
