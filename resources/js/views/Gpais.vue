<template>
    <section class="section is-main-section">
      <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>

      <card-component title="VALDYMAS" icon="finance">
        <!--<file-picker-post 
        @file-updated="file_info" 
        post-subject="/gpais/store_gpais" 
        label="CSV failo įkėlimas"  
        v-model="file"/> -->
      </card-component>
      <card-component title="GPAIS" icon="account-multiple">
        <div  id="printMe">
        <b-table
          bordered
          :data="gpais">
            <b-table-column label=" " v-slot="props"> 
                {{ props.index + 1 }}
            </b-table-column>
            <b-table-column label="Data" field="tiekimoRinkaiData" v-slot="props"> 
                {{ props.row.tiekimoRinkaiData }}
            </b-table-column>
            <b-table-column label="Pavadinimas" field="produktoKodas" v-slot="props"> 
                {{ props.row.produktoKodas }}
            </b-table-column>
            <b-table-column label="Kiekis, pakuoteje" field="kiekis" v-slot="props"> 
                {{ props.row.kiekis }} vnt.
            </b-table-column>
            <b-table-column label="Gavimo budas" field="gavimoBudas" v-slot="props"> 
                {{ props.row.gavimoBudas }}
            </b-table-column>
            <b-table-column label="Veiklos budas" field="veiklosBudas" v-slot="props"> 
                {{ props.row.veiklosBudas }}
            </b-table-column>
            <b-table-column label="Svoris, t." field="vienos_pakuotes_svoris_tonomis" v-slot="props"> 
                {{ props.row.vienos_pakuotes_svoris_tonomis }}
            </b-table-column>
        </b-table>
        </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
        <b-button tag="a" type="is-dark" size="is-medium" icon-left="download"
          href="gpais/get_xml" target="_blank">
          ATSISIŲSTI
        </b-button>
      </div>
      </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import FilePickerPost from '@/components/FilePickerPost'

export default {
  name: 'Gpais',
  components: { CardComponent, FilePickerPost },
  data () {
    return {
      menus: [
        { icon: 'account-group', text: 'People' },
        { icon: 'shopping-search', text: 'Orders' },
        { icon: 'credit-card-multiple', text: 'Payments' },
        { icon: 'dolly', text: 'Logistics' },
        { icon: 'clock-check', text: 'Jobs' },
        { icon: 'cart-arrow-right', text: 'Cart' },
        { icon: 'settings', text: 'Configuration' }
    ],
    works: '',
    isLoading: false,
    isFullPage: true,
    gpais: [],
    file: null,
    failas: '',
    }
  },
  computed: {
  },
  created() {
    this.getData()
    },

  methods: {
    file_info (value) {
      this.failas = value.name;
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getData () {
      this.isLoading = true
      this.axios
      .get('/gpais')
      .then(response => {
        this.isLoading = false
        this.gpais = response.data.array;
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
