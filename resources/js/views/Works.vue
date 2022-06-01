<template>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="finance">
      </card-component>

      <card-component title="Darbo apskaita" icon="account-multiple">
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
                  </b-table-column><b-table-column label="Grazinimai" field="graza" v-slot="props"> 
                      {{ props.row.graza.toFixed(2) }} €
                  </b-table-column>
              </b-table>
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

export default {
  name: 'Works',
  components: { CardComponent },
  data () {
    return {
    works: '',
     isLoading: false,
     defaultOpenedDetails: [1],
     showDetailIcon: false,
     isNarrowed: true,
     mobile_card: true,
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
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getData () {
      this.isLoading = true
      this.axios
      .get('/works')
      .then(response => {
        this.isLoading = false
        this.works = response.data.works;
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
