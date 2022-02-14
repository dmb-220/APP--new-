<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field label="SANDELIS:" horizontal>
          <b-select placeholder="Pasirinkite..." @change.native="keisti_sandelis" v-model="sandelis" icon="earth" expanded>
            <option v-for="(sand, index) in sandeliai" :key="index" :value="index">
              {{ sand.name }} - {{ sand.adresas }}
            </option>
          </b-select>
        </b-field>
        <b-field label="PAIEŠKA:" horizontal>
            <b-input placeholder="Paieška..." type="search" @keyup.native.enter="paieska_post" 
             v-model="ieskoti" icon="magnify"></b-input>    
          <div class="control">
            <b-button native-type="submit" type="is-primary" @click="paieska_post">Ieškoti</b-button>
          </div>
        </b-field>
      </card-component>
      <card-component title="Likuciai" icon="account-multiple">
      <div class="content has-text-centered">{{ sarasas.kodas }}</div>
      <hr>
        <b-table
          :mobile-cards="false"
          focusable
          bordered
          hoverable
          :narrowed="true"
          :data="sarasas.list"
          :loading="isLoading">
          <b-table-column  label="Sandelis"  field="name" v-slot="props">
                  {{ props.row.name }}
            </b-table-column>
            <b-table-column :style="{'background-color': 'greenyellow'}"  label="Kiekis"  field="kiekis" v-slot="props">
                  {{ props.row.kiekis }}
            </b-table-column>
             <b-table-column  label="Adresas"  field="adresas" v-slot="props">
                  {{ props.row.adresas }}
            </b-table-column>
            <b-table-column  label="Darbo laikas"  field="laikas" v-slot="props">
                  {{ props.row.laikas }}
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
      </card-component>
    </section>
  </div>
</template>

<style  scoped>
    
</style>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

export default {
  name: "SOAP-LT",
  components: {CardToolbar, CardComponent},
  data () {
    return {
     sarasas: [],
     ieskoti: '',
     sandelis: '',
     sandeliai: []
    }
  },
  watch: {
        },

  computed: {
  },

  created () {
    //this.$store.isNavBarVisible = false;
    this.$store.commit('set_value_nav')
    this.$store.commit('set_value_aside')
    this.getData();
  },

  methods: {
    keisti_sandelis(){
      this.paieska_post();
    },
    paieska_post(){
        axios
          .post(`/soaplt/store`, {
            ieskoti: this.ieskoti,
            sandelis: this.sandelis
            })
          .then(response => {
            console.log(response.data.data)
            this.rikiuoti = false;
            this.getData()
        })
          .catch( err => {
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
      .get('/soaplt')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas;
        this.sandeliai = response.data.sandeliai;
        this.ieskoti = response.data.ieskoti;
        this.sandelis = response.data.sandelis;
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

