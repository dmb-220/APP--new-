
<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
      <file-picker-return @file-updated="file_info" v-model="file"/>
      <b-field label="PREKĖS:" horizontal>
        <b-button :type="gam ? 'is-info' : 'is-dark'" @click="change_gam()" expanded>GAMYBA</b-button>
        <b-button :type="pirk ? 'is-info' : 'is-dark'" @click="change_pirk()" expanded>PIRKIMAI</b-button>
        <b-input placeholder="Nuolaida" v-model="procentas"></b-input> 
      </b-field>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" type="is-dark">SUFORMUOTI</b-button>
      </div>
      </card-component>

      <card-component title="Prekės" icon="account-multiple">
      <b-table :row-class="onRowClass" :data="list" :columns="columns"></b-table>
      <div class="buttons">
        <vue-excel-xlsx class = "button is-dark is-medium" :data="list" :columns="columns" :filename="'perkelimai_LT'" :sheetname="'LT'" >
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
import FilePickerReturn from '@/components/FilePickerReturn'


export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent, FilePickerReturn },
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
    color: [
        'is-one2', 'is-two2', 'is-three2'
      ],
    list: [],
    file: null,
    failas: '',
    gam: false,
    pirk: false,
    procentas: 0,
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    onRowClass: function (row, index) {
      if(row.kaina == "Nera" || row.savikaina == "Nera"){
        return this.color[2];
      }
    },
    file_info (value) {
      //this.getData()
      //console.log(value)
      this.failas = value.name;
    },
    change_gam(){
      if(!this.gam){
        this.procentas = 70;
        this.gam = true
        }
      if(this.pirk){ this.pirk = false}
    },
    change_pirk(){
      if(!this.pirk){
        this.procentas = 50;
        this.pirk = true
        }
      if(this.gam){ this.gam = false}
    },

    getData () {
      this.axios
      .get('/return')
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
