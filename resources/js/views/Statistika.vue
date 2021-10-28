<template>
    <section class="section is-main-section">
      <modal-statistika-box  
        :is-active="isModalView" 
        :view-subject="viewObjectName" 
        :view-pardavimai="viewName"
        :view-label="labelName" 
        @confirm="viewConfirm"/>
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="finance">
        <b-field position="is-centered">
            <b-input placeholder="Paieška..."
              @keyup.native.enter="paieska_post" 
              v-model="settings['ieskoti']"
              type="search"
              icon="magnify"
              expanded>
            </b-input>
            <p class="control">
                <button class="button is-primary" @click="paieska_post">Ieškoti</button>
            </p>
        </b-field>
        <b-field>
            <b-checkbox :value="false" v-model="settings['paieska_big']" type="is-info">Aktivuoti išplėstinę paieška</b-checkbox>
        </b-field>
        <b-field label="">
            <b-select placeholder="Pasirinkite..." @change.native="keisti_grupe" v-model="settings['grupe']" icon="earth" expanded>
              <option v-for="(grup, index) in grupes" :key="index" :value="index">
                {{ grup }} - {{ grupes_lv[grup] }}
              </option>
            </b-select>
          </b-field>
        <b-field horizontal>
          <b-button :type="settings['rodyti_lt'] ? 'is-primary' : 'is-dark'" @click="change_lt()">LIETUVA</b-button>
          <b-button :type="settings['rodyti_lv'] ? 'is-warning' : 'is-dark'" @click="change_lv()">LATVIJA</b-button>
          <b-button :type="settings['rodyti_ee'] ? 'is-danger' : 'is-dark'" @click="change_ee()">ESTIJA</b-button>
        </b-field>
        <b-field horizontal>
            <b-button :type="settings['pirk'] ? 'is-info' : 'is-dark'" @click="change_pirk()">GAMYBA</b-button>
            <b-button :type="settings['gam'] ? 'is-info' : 'is-dark'" @click="change_gam()">PIRKIMAI</b-button>
        </b-field>
        </card-component>
      <card-component title="STATISTIKA" icon="account-multiple">
        <div  id="printMe">
          <div class="columns">
            <div class="column has-text-centered has-text-weight-bold">
              Rasta: {{ settings['paieska'] }}<br>{{grupes[settings['grupe']]}}
            </div>
          </div>
          <b-table
            :data="pardavimai"
            ref="table"
            bordered
            striped
            :row-class="onClass"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="sandelis"
            @details-open="(row) => $buefy.toast.open(`Expanded ${row.sandeis}`)"
            :show-detail-icon="showDetailIcon">
            
            <b-table-column label="Sandelis"  field="sandelis" v-slot="props">
                  {{ props.row.sandelis }}
            </b-table-column>
            <b-table-column label="Likutis" field="likutis_sk" numeric sortable v-slot="props">
              {{ props.row.likutis_sk }}
            </b-table-column>
            <b-table-column label="Parduota" field="pardavimai_sk" numeric sortable v-slot="props">
              {{ props.row.pardavimai_sk }}
            </b-table-column>
            <b-table-column label="Viso" field="viso" numeric sortable v-slot="props">
              <b>{{ props.row.viso }}</b>
            </b-table-column>
            <b-table-column width="50px" :style="{'background-color': 'WhiteSmoke'}"  label="INFO"  field="info" v-slot="props">
                   <button v-if="!Array.isArray(props.row.buy)" class="button is-small is-danger" type="button" 
            @click.prevent="viewModal_pardavimai(props.row.buy && props.row.buy.sandelis, props.row.buy && props.row.buy.viso)">
                <b-icon icon="chart-bar" size="is-small"/>
              </button>
            </b-table-column>

            <template #detail="props">
            <div class="columns">
              <div class="column" :style="{'border': '1px solid'}">
                <b-table
                :data="props.row.list"
                default-sort-direction="desc"
                default-sort="kiekis"
                :bordered="true"
                :striped="true"
                :narrowed="true">
                    <b-table-column field="preke" label="Prekė" sortable v-slot="props">
                        {{ props.row.preke }}
                    </b-table-column>
                    <b-table-column :style="{'background-color': 'LightGray'}" label="Likučiai" field="likutis" sortable v-slot="props">
                        {{ props.row.likutis }}
                    </b-table-column>
                    <b-table-column :style="{'background-color': 'LightGray'}" label="Pardavimai" field="pardavimai" sortable v-slot="props">
                        {{ props.row.pardavimai }}
                    </b-table-column>
                </b-table>
              </div>
            </div>
            </template>

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
              <th> </th>
              <th> </th>
              <th>{{ viso_lik }}</th>
              <th>{{ viso_pard }}</th>
              <th> </th>
          </template>
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
import ModalStatistikaBox from '@/components/ModalStatistikaBox'

export default {
  name: 'statistika',
  components: { CardComponent, ModalStatistikaBox },
  data () {
    return {
    isLoading: false,
    isFullPage: true,
    defaultOpenedDetails: [1],
    showDetailIcon: true,
    isNarrowed: true,
    mobile_card: true,

    settings: {
      ieskoti: '',
      paieska: '',
      rodyti_lt: true,
      rodyti_lv: true,
      rodyti_ee: true,
      gam: true,
      pirk: true,
      paieska_big: false,
      rodyti_lt: true,
      rodyti_lv: true,
      rodyti_ee: true,
      grupe: '',
    },

    pardavimai: [],
    viso_pard: '',
    viso_lik: '',
    grupes: [],
    grupes_lv: [],

    isModalView: false,
    viewObject: null,
    viewPardavimai: null,
    viewLabel: null,
    }
  },
  computed: {
    viewObjectName () {
      if (this.viewObject) {
        return this.viewObject
      }
      return null
    },  
    viewName () {
      if (this.viewPardavimai) {
        return this.viewPardavimai
      }
      return null
    },
    labelName () {
      if (this.viewLabel) {
        return this.viewLabel
      }
      return null
    },
  },
  created() {
    this.getData()
  },
  methods: {
    onClass: function (row) {
      if(row.salis == 1){
        return "is-one2";
      }
      if(row.salis == 2){
        return "is-two2";
      }
      if(row.salis == 3){
        return "is-three2";
      }
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.$htmlToPaper('printMe');
    },
    change_gam(){
      this.settings['gam'] = !this.settings['gam'];
      this.settings['ieskoti'] = this.settings['paieska']
      this.paieska_post()
    },
    change_pirk(){
      this.settings['pirk'] = !this.settings['pirk'];
      this.settings['ieskoti'] = this.settings['paieska']
      this.paieska_post()
    },
    change_lt(){
      this.settings['rodyti_lt'] = !this.settings['rodyti_lt']
      this.settings['ieskoti'] = this.settings['paieska']
      this.paieska_post()
    },
    change_lv(){
      this.settings['rodyti_lv'] = !this.settings['rodyti_lv']
      this.settings['ieskoti'] = this.settings['paieska']
      this.paieska_post()
    },
    change_ee(){
      this.settings['rodyti_ee'] = !this.settings['rodyti_ee']
      this.settings['ieskoti'] = this.settings['paieska']
      this.paieska_post()
    },
     keisti_grupe(){
      if(!this.settings['ieskoti']){
      this.settings['ieskoti'] = this.settings['paieska']
      }
      this.paieska_post();
    },
    
    paieska_post(){
        axios
          .post(`/statistika/store`, {
            ieskoti: this.settings['ieskoti'],
            lt: this.settings['rodyti_lt'],
            lv: this.settings['rodyti_lv'],
            ee: this.settings['rodyti_ee'],
            gam: this.settings['gam'],
            pirk: this.settings['pirk'],
            paieska_big: this.settings['paieska_big'],
            grupe: this.settings['grupe']
            })
          .then(response => {
            console.log(response.data.data)
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
      .get('/statistika')
      .then(response => {
        this.isLoading = false
        this.pardavimai = response.data.data;
        this.viso_pard = response.data.viso_pard;
        this.viso_lik = response.data.viso_lik;

        this.grupes = response.data.grupes;
        this.grupes_lv = response.data.grupes_lv;
        this.settings = response.data.settings;
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
    /*viewModal_pardavimai2(viewObject) {
      let data = [];
      let pardavimai = [];
      let label = [];
      //gaunam duomenis is DB
      this.isLoading = true
      this.axios
      .get('/statistika/'+ viewObject)
      .then(response => {
        this.isLoading = false
        data = response.data.data;
        
        //paruosiam CHART rodymui
        for (let i = 0; i < data.length; i++) {
          pardavimai.push(data[i]['kiekis'])
          label.push(data[i]['data'])   
        }
        this.viewPardavimai = pardavimai
        this.viewLabel = label
      })
      .catch( err => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })

      this.viewObject = viewObject
      this.isModalView = true
    },*/

    viewModal_pardavimai (viewObject, viewPard) {
      //console.log(viewPardavimai);
      let pardavimai = [];

      let label = []
      let  i;

      let sk = viewPard.length
      for (i = 0; i < sk; i++) {
        pardavimai.push(viewPard[i]['kiekis'])
        label.push(viewPard[i]['data'])  
      }

      this.viewObject = viewObject
      this.viewPardavimai = pardavimai
      this.viewLabel = label
      this.isModalView = true
      //this.$emit('update');
    },

    viewConfirm () {
      this.isModalView = false
    },
    viewCancel () {
      this.isModalView = false
    },
  }
}
</script>
