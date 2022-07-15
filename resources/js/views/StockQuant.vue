<template>
  <div>
    <section class="section is-main-section">
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field label="PAIEŠKA" :label-position="labelPosition">
          <b-taginput
            @keyup.native.enter="suformuoti"
            v-model="settings['tags']"
            ellipsis
            icon="label">
          </b-taginput>
        </b-field>
        <b-field label="MIN kiekis" :label-position="labelPosition">
          <b-numberinput v-model="settings['min']" :min="0"></b-numberinput>
        </b-field>
        <b-field>
            <b-checkbox v-model="settings['paieska_big']" type="is-info">Aktivuoti išplėstinę paieška</b-checkbox>
        </b-field>
        <b-field horizontal>
          <b-button :type="salis['LT'] ? 'is-primary' : 'is-dark'" @click="change_lt()">LIETUVA</b-button>
          <b-button :type="salis['LV'] ? 'is-warning' : 'is-dark'" @click="change_lv()">LATVIJA</b-button>
          <b-button :type="salis['EE'] ? 'is-danger' : 'is-dark'" @click="change_ee()">ESTIJA</b-button>
        </b-field>
        <div class="buttons">
          <b-button size="is-medium" icon-left="desktop-classic" type="is-dark" @click="suformuoti">
            RODYTI
          </b-button>
        </div>
      </card-component>
      <card-component title="Prekės" icon="account-multiple">
        <div  id="printMe">
        <b-table
        bordered
        :narrowed="true"
        :data="list"
        sort-icon="arrow-up"
        :loading="isLoading"
        default-sort-direction="asc"
        default-sort="preke">
          <b-table-column label="Sandelis" width="300" v-slot="props">
            <div class="is-size-2 has-text-centered has-text-weight-bold has-background-grey-light">{{ props.index }}</div>
            <br>
            <div class="buttons">
              <vue-excel-xlsx
                class = "button is-dark" 
                :data="checkboxGroup[salis_nr][props.index]"
                :columns="columns"
                :fileName="props.index">
                ATSISIŲSTI
              </vue-excel-xlsx>
            </div>
            <br>
            Kodai: {{ checkboxGroup[salis_nr][props.index].length }}
          </b-table-column>
          <b-table-column label="Prekes" v-slot="props">
            <table class="table">
              <thead>
                <tr>
                  <th class="has-background-grey-light has-text-centered" width="15">
                     <b-button @click="selectAll(props.index, props.row)" size="is-small" icon-right="check" />
                  </th>
                  <th class="has-background-grey-light"  width="200">Kodas</th>
                  <th class="has-background-grey-light">Kiekis</th>
                  <th class="has-background-grey-light">VISO</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in props.row" :key="index">
                  <td>
                  <b-checkbox-button size="is-small" v-model="checkboxGroup[salis_nr][item.sandelis]" :native-value="item">
                    <b-icon icon="check"></b-icon>
                  </b-checkbox>
                  </td>
                  <td>{{ index }}</td>
                  <td>{{ item.kiekis }}</td>
                  <td class="has-background-grey-lighter">{{ kiekis[index] }}</td>
                </tr>
              </tbody>
            </table>
          </b-table-column>
      </b-table>
      <br>

      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
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
      labelPosition: 'on-border',
      allSelected: [],
      columns : [
        {
            label: "Prekė",
            field: "preke",
        },
        {
            label: "Kiekis",
            field: "kiekis",
        },
        {
            label: "Pavadinimas",
            field: "pavadinimas",
        },
      ],
      dates: [],
      salis:{
        LT: 1, LV: 0, EE: 0
      },
      salis_nr: 1,
      sarasas: [],
      kiekis: [],
      settings: [],
      list: [],
      checkboxGroup:[]
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    selectAll(sandelis, array) {
      if(this.checkboxGroup[this.salis_nr][sandelis].length < 1){
        for(let row in array) {
            this.checkboxGroup[this.salis_nr][sandelis].push(array[row]);
        }
      }else{
        this.checkboxGroup[this.salis_nr][sandelis] = [];
      }
    },
    suformuoti(){
      this.isLoading = true
    axios
      .post(`/stock_quant/store`, {
        settings: this.settings,
        salis: this.salis,
        })
      .then(response => {
        console.log(response.data.data)
        this.getData()
        this.$buefy.toast.open({
          message: "Duomenys atnaujinti!",
          type: 'is-info',
        })
    })
      .catch( err => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
        })
      })
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.$htmlToPaper('printMe');
    },
    change_lt(){
      this.salis['LT'] = 1;
      this.salis['LV'] = 0;
      this.salis['EE'] = 0;
      this.list = this.sarasas[1];
      this.salis_nr = 1;
    },
    change_lv(){
      this.salis['LT'] = 0;
      this.salis['LV'] = 1;
      this.salis['EE'] = 0;
      this.list = this.sarasas[2];
      this.salis_nr = 2;
    },
    change_ee(){
      this.salis['LT'] = 0;
      this.salis['LV'] = 0;
      this.salis['EE'] = 1;
      this.list = this.sarasas[3];
      this.salis_nr = 3;
    },
    getData () {
      this.isLoading = true
      this.axios
      .get('/stock_quant')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas; 
        this.kiekis = response.data.kiekis; 
        this.settings = response.data.settings;
        this.checkboxGroup = response.data.sandeliai;

        this.allSelected = this.checkboxGroup;
        this.list = this.sarasas[1];
        this.settings['paieska_big'] = this.settings['paieska_big'] ? true : false;
        this.settings['min'] = parseInt(this.settings['min']);
        
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
