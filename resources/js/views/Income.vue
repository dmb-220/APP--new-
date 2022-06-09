
<template>
    <section class="section is-main-section">
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
      <file-picker-post 
      @file-updated="file_info" 
      post-subject="/income/store_income" 
      label="CSV failo įkėlimas" 
      v-model="file"/>
      <p class="is-size-7">
        CSV failas gaunamas: Ataskaitos -> Generuojamos ataskaitos -> Atsargų operacijos
        Filtras: įvesti dokumento arba blanko nr.
      </p>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" type="is-dark" @click="suformuoti()">SUFORMUOTI</b-button>
      </div>
      </card-component>

      <card-component title="Prekės" icon="account-multiple">
      <b-table :row-class="onRowClass" :data="list" :columns="columns">
        <template #footer>
            <th> </th>
            <th> </th>
            <th> </th>
            <th>{{ kaina.toFixed(2) }}</th>
            <th>{{ savikaina.toFixed(2) }}</th>
          </template>
      </b-table>
      </card-component>
    </section>
</template>

<style  scoped>
    
</style>

<script>
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import FilePickerPost from '@/components/FilePickerPost'


export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent, FilePickerPost },
  data () {
    return {
      isLoading: false,
      isFullPage: true,
      columns : [
        { label: "Prekė",  field: "preke"},
        { label: "Pavadinimas", field: "pavadinimas" },
        { label: "Kiekis", field: "kiekis" },
        { label: "Pradine kaina", field: "kaina" },
        { label: "Savikaina", field: "savikaina" },
      ],
      color: [
        'is-one2', 'is-two2', 'is-three2'
      ],
      list: [],
      file: null,
      failas: '',
    }
  },
  computed: {
    kaina: function(){
      let total = [];
        Object.entries(this.list).forEach(([key, val]) => {
            total.push(val.kaina) // the value of the current key.
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    savikaina: function(){
      let total = [];
        Object.entries(this.list).forEach(([key, val]) => {
            total.push(val.savikaina) // the value of the current key.
        });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
  },
  created () {
    this.getData();
  },
  methods: {
    onRowClass: function (row, index) {
      if(row.kaina == "Nerasta" || row.savikaina == "Nerasta"){
        return this.color[2];
      }
    },
    file_info (value) {
      this.failas = value.name;
    },

    suformuoti(){
    this.isLoading = true
    axios
      .post(`/income/store`, {
        file: this.failas,
        })
      .then(response => {
        //console.log(response.data.data)
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
    getData () {
      this.isLoading = true
      this.axios
      .get('/income')
      .then(response => {
        this.isLoading = false
        this.list = response.data.list; 
        //console.log(response.data);  
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
