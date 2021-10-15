
<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
      </card-component>

      <card-component title="Prekės" icon="account-multiple">
      {{ list }}
      <div class="buttons">
        <vue-excel-xlsx :data="list" :columns="columns" :filename="'perkelimai_LT'" :sheetname="'LT'" >
          ATSISIŪSTI
        </vue-excel-xlsx>
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
      columns : [
        {
            label: "Blanko nr.",
            field: "blankas",
        },
        {
            label: "Prekė",
            field: "preke",
        },
        {
            label: "Perkelti",
            field: "kiekis",
        },
        {
            label: "Nuolaida",
            field: "procentas",
        },
        {
            label: "Pradine kaina",
            field: "kaina",
        },
        {
            label: "Savikaina",
            field: "savikaina",
        },
      ],
      list: [],
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      this.axios
      .get('/ee')
       .then(response => {
        this.list = response.data.list; 
        console.log(response.data);  
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
