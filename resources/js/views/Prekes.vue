<template>
  <div>
    <modal-view-box :is-active="isModalView" :view-subject="viewObjectName" :view-info="viewInfoName" @confirm="viewConfirm" @cancel="viewCancel"/>
    <modal-pardavimai-box  :is-active="isModalViewP" 
                          :view-subject="viewObjectNameP" 
                          :view-pardavimai="viewPardavimaiName"
                          :view-pardavimai-lt="viewPardavimaiLTName"  
                          :view-pardavimai-lv="viewPardavimaiLVName" 
                          :view-label="labelPardavimaiName"  @confirm="viewConfirm_pardavimai"/>

    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
          <b-field label="PAIEŠKA:" horizontal>
            <b-input placeholder="Paieška..." type="search" @keyup.native.enter="paieska_post" 
             v-model="ieskoti" icon="magnify"></b-input> 
            <b-button native-type="submit" type="is-primary" @click="paieska_post" outlined>Ieškoti</b-button>
        </b-field>
        <b-field label=" " horizontal>
            <b-checkbox :value="false" v-model="paieska_big" type="is-info">Aktivuoti išplėstinę paieška</b-checkbox>
        </b-field>
        <b-field label=" " horizontal>
            <b-checkbox :value="false" v-model="visi" @click='switch_post' type="is-info">Visi sandeliai (MODESTA)</b-checkbox>
        </b-field>
        <b-field label=" " horizontal>
            <b-checkbox :value="false" v-model="kainos" @change='kainos_keisti' type="is-info">Rodyti kaina</b-checkbox>
        </b-field>
        <b-field label="GRUPĖ:" horizontal>
            <b-select placeholder="Pasirinkite..." @change.native="keisti_grupe" v-model="grupe" icon="earth" expanded>
              <option v-for="(grup, index) in grupes" :key="index" :value="index">
                {{ grup }} - {{ grupes_lv[grup] }}
              </option>
            </b-select>
          </b-field>
        <b-field label="RODYTI:" horizontal>
          <b-button :type="rodyti_lt ? 'is-primary' : 'is-dark'" @click="change_lt()">LIETUVA</b-button>
          <b-button :type="rodyti_lv ? 'is-warning' : 'is-dark'" @click="change_lv()">LATVIJA</b-button>
          <b-button :type="rodyti_ee ? 'is-danger' : 'is-dark'" @click="change_ee()">ESTIJA</b-button>
        </b-field>
        <b-field label="PREKĖS:" horizontal>
          <b-button :type="pirk? 'is-info' : 'is-dark'" @click="change_pirk()">GAMYBA</b-button>
          <b-button :type="gam ? 'is-info' : 'is-dark'" @click="change_gam()">PIRKIMAI</b-button>
        </b-field>
        <b-field label="GRUPAVIMAS:" horizontal>
          <b-switch type="is-info" v-model="rikiuoti" @click.native="switch_post">
            Veikia TIK su mūsų GAM gaminiais! 
          </b-switch>
        </b-field>
        </card-component>
        <card-component title="PREKIŲ SĄRAŠAS" icon="account-multiple">
        <div  id="printMe">
        <div class="columns">
          <div class="column has-text-centered has-text-weight-bold">
            Rasta: {{sarasas.length }}<br>{{paieska}}<br>{{grupes[grupe]}}
            </div>
        </div>
        <b-field grouped group-multiline>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="50">50 įrašų puslapyje</option>
                <option value="100">100 įrašų puslapyje</option>
                <option value="150">150 įrašų puslapyje</option>
                <option value="200">200 įrašų puslapyje</option>
            </b-select>
            <div class="control is-flex">
                <b-switch v-model="isPaginated">Puslapiai</b-switch>
            </div>
        </b-field>
        <b-table
        :paginated="isPaginated"
          :per-page="perPage"
          :pagination-position="paginationPosition"
        :mobile-cards="mobile_card"
        bordered
        hoverable
        :narrowed="true"
        :data="sarasas"
        :opened-detailed="defaultOpenedDetails"
        detailed
        sort-icon="arrow-up"
        detail-key="preke"
        @details-open="(row, index) => $buefy.toast.open(`Išskleista ${ row.preke } prekė!`)"
        :loading="isLoading">
          <b-table-column label="Preke"  field="preke" sortable v-slot="props">
                {{ props.row.preke }}
          </b-table-column> 
          <b-table-column :visible='kainos'  label="Kaina"  field="kaina" v-slot="props">
                {{ props.row.kaina }}
          </b-table-column>
          <b-table-column :visible='rodyti_lt' cellClass="is-one2" label="LT likučiai" field="likutis.LT_viso" sortable v-slot="props">
                {{props.row.likutis && props.row.likutis.LT_viso}}
          </b-table-column>
          <b-table-column :visible='rodyti_lt' cellClass="is-one2" label="LT pardavimai" field="pardavimai.LT_viso" sortable v-slot="props">
                {{props.row.pardavimai && props.row.pardavimai.LT_viso}}
          </b-table-column>
          <b-table-column :visible='rodyti_lv' cellClass="is-two2" label="LV likučiai" field="likutis.LV_viso" sortable v-slot="props">
            {{props.row.likutis && props.row.likutis.LV_viso}}
          </b-table-column>
          <b-table-column :visible='rodyti_lv' cellClass="is-two2" label="LV pardavimai" field="pardavimai.LV_viso" sortable v-slot="props">
                 {{props.row.pardavimai && props.row.pardavimai.LV_viso}}
          </b-table-column>
          <b-table-column :visible='rodyti_ee' cellClass="is-three2" label="EE likučiai" field="likutis.EE_viso" sortable v-slot="props">
                {{props.row.likutis && props.row.likutis.EE_viso}}
          </b-table-column>
          <b-table-column :visible='rodyti_ee' cellClass="is-three2" label="EE pardavimai" field="pardavimai.EE_viso" sortable v-slot="props">
                {{props.row.pardavimai && props.row.pardavimai.EE_viso}}
          </b-table-column>
          <b-table-column cellClass="is-smoke" label="LIKUČIAI" field="likutis.viso" sortable v-slot="props">
                {{props.row.likutis && props.row.likutis.viso}}
          </b-table-column>
          <b-table-column cellClass="is-smoke" label="PARDAVIMAI" field="pardavimai.viso" sortable v-slot="props">
                {{props.row.pardavimai && props.row.pardavimai.viso}}
          </b-table-column>
          <b-table-column cellClass="is-smoke" label="Informacija" v-slot="props">
            <button v-if="!Array.isArray(props.row.buy)" class="button is-small is-danger" type="button" 
            @click.prevent="viewModal_pardavimai(props.row.buy && props.row.buy.preke, props.row.buy && props.row.buy.viso,
             props.row.buy && props.row.buy.LT, props.row.buy && props.row.buy.LV)">
                <b-icon icon="chart-bar" size="is-small"/>
              </button>
               - 
            <button v-if="!Array.isArray(props.row.atsargos)" class="button is-small is-primary" type="button" 
            @click.prevent="viewModal(props.row.atsargos && props.row.atsargos.preke, props.row.atsargos && props.row.atsargos.info)">
                <b-icon icon="eye" size="is-small"/>
              </button>
          </b-table-column>

        <template #detail="props">
          <div  class="columns">
          <div v-show='rodyti_lt' class="column" :style="{'border': '1px dotted'}">
            <div class="has-text-centered">LIETUVA:</div>
            <br>
            <b-table v-if="props.row.akcija_lt.length > 0"
            :data="props.row.akcija_lt"
            default-sort-direction="asc"
            default-sort="sandelis">
                <b-table-column cellClass="is-smoke" label="Akcija" v-slot="props">
                    <small>{{ props.row.akcija }}</small>
                </b-table-column>
                <b-table-column cellClass="is-one2" label="Kaina" v-slot="props">
                    <small>{{ props.row.kaina }} &euro;</small>
                </b-table-column>
                <b-table-column cellClass="is-one2" label="Galioja IKI" v-slot="props">
                    <small>{{ props.row.galioja_iki.split(" ")[0] }}</small>
                </b-table-column>
            </b-table>
            <br v-if="props.row.akcija_lt.length > 0">
            <b-table
            :data="props.row.list.LT"
            default-sort-direction="asc"
            default-sort="sandelis">
                <b-table-column cellClass="is-smoke" field="sandelis" label="Sandelis" sortable v-slot="props">
                    <small>{{ props.row.sandelis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-one2" field="likutis.kiekis" label="Likuciai" v-slot="props">
                    <small>{{ props.row.likutis && props.row.likutis.kiekis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-one2" field="pardavimai.kiekis" label="Pardavimai" v-slot="props">
                    <small>{{ props.row.pardavimai && props.row.pardavimai.kiekis }}</small>
                </b-table-column>
            </b-table>
          </div>
          <div v-show='rodyti_lv' class="column" :style="{'border': '1px dotted'}" >
            <div class="has-text-centered">LATVIJA:</div>
            <br>
            <b-table v-if="props.row.akcija_lv.length > 0"
            :data="props.row.akcija_lv"
            default-sort-direction="asc"
            default-sort="sandelis">
                <b-table-column cellClass="is-smoke" label="Akcija" v-slot="props">
                    <small>{{ props.row.akcija }}</small>
                </b-table-column>
                <b-table-column cellClass="is-two2" label="Kaina" v-slot="props">
                    <small>{{ props.row.kaina }} &euro;</small>
                </b-table-column>
                <b-table-column cellClass="is-two2" label="Galioja IKI" v-slot="props">
                    <small>{{ props.row.galioja_iki.split(" ")[0] }}</small>
                </b-table-column>
            </b-table>
            <br v-if="props.row.akcija_lv.length > 0">
            <b-table
            :data="props.row.list.LV"
            default-sort-direction="asc"
            default-sort="sandelis">
                <b-table-column cellClass="is-smoke" field="sandelis" label="Sandelis" sortable v-slot="props">
                    <small>{{ props.row.sandelis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-two2" field="likutis.kiekis" label="Likuciai" v-slot="props">
                    <small>{{ props.row.likutis && props.row.likutis.kiekis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-two2" field="pardavimai.kiekis" label="Pardavimai" v-slot="props">
                    <small>{{ props.row.pardavimai && props.row.pardavimai.kiekis }}</small>
                </b-table-column>
            </b-table>
          </div>
          <div v-show='rodyti_ee' class="column" :style="{'border': '1px dotted'}">
            <div class="has-text-centered">ESTIJA:</div>
            <br>
            <b-table
            :data="props.row.list.EE"
            default-sort-direction="asc"
            default-sort="sandelis">
                <b-table-column cellClass="is-smoke" field="sandelis" label="Sandelis" sortable v-slot="props">
                    <small>{{ props.row.sandelis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-three2" field="likutis.kiekis" label="Likuciai" v-slot="props">
                    <small>{{ props.row.likutis && props.row.likutis.kiekis }}</small>
                </b-table-column>
                <b-table-column cellClass="is-three2" field="pardavimai.kiekis" label="Pardavimai" v-slot="props">
                    <small>{{ props.row.pardavimai && props.row.pardavimai.kiekis }}</small>
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
            <th v-show='kainos'> </th>
            <th v-show='rodyti_lt'>{{ viso.lt_lik }}</th>
            <th v-show='rodyti_lt'>{{ viso.lt_pard }}</th>
            <th v-show='rodyti_lv'>{{ viso.lv_lik }}</th>
            <th v-show='rodyti_lv'>{{ viso.lv_pard }}</th>
            <th v-show='rodyti_ee'>{{ viso.ee_lik }}</th>
            <th v-show='rodyti_ee'>{{ viso.ee_pard }}</th>
            <th>{{ viso.lt_lik + viso.lv_lik + viso.ee_lik }}</th>
            <th>{{ viso.lt_pard + viso.lv_pard + viso.ee_pard }}</th>
        </template>
      </b-table>
      </div>
      <hr>
      <div class="buttons">
        <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print">SPAUSDINTI</b-button>
        <vue-excel-xlsx class = "button is-dark is-medium" :data="sarasas" :columns="columns" :filename="'Prekiu_sarasas'" :sheetname="'Prekių sąrašas'">
            ATSISIŲSTI
        </vue-excel-xlsx>
      </div>
      </card-component>
    </section>
  </div>

</template>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import ModalViewBox from '@/components/ModalViewBox'
import ModalPardavimaiBox from '@/components/ModalPardavimaiBox'

export default {
  name: "Prekes",
  components: {CardToolbar, CardComponent, ModalViewBox, ModalPardavimaiBox},
  data () {
    return {
      columns : [
        {label: "Prekė", field: "preke"},
        {label: "Pilna kaina", field: "kaina"},
        {label: "LT", field: 'LT_viso'},
        {label: "LV", field: 'LV_viso'},
        {label: "EE", field: 'EE_viso'},
        {label: "Likutis", field: 'viso'},
      ],
      isPaginated: true,
      paginationPosition: 'bottom',
      perPage: 50,
      isLoading: false,
      rodyti_lt: true,
     rodyti_lv: true,
     rodyti_ee: true,
     atsargos: [],
      sarasas: [],
      grupes: [],
      grupes_lv: [],
      grupe: '',
      defaultOpenedDetails: [1],
      ieskoti: '',
      paieska: '',
      visi: false,
     salis: '',
     rikiuoti: false,
     gam: true,
     pirk: true,
     mobile_card: true,
     paieska_big: false,
     viso: [],
     kainos: false,
     perkelimai: true,

    isModalView: false,
    viewObject: null,
    viewInfo: null,

    isModalViewP: false,
    viewObjectP: null,
    viewPardavimai: null,
    viewPardavimaiLT: null,
    viewPardavimaiLV: null,
    labelPardavimai: null,
    }
  },
  computed: {
    viewObjectName () {
      if (this.viewObject) {
        return this.viewObject
      }
      return null
    },  
    viewInfoName () {
      if (this.viewInfo) {
        return this.viewInfo
      }
      return null
    },

    viewObjectNameP () {
      if (this.viewObjectP) {return this.viewObjectP}
      return null
    },  
    viewPardavimaiName () {
      if (this.viewPardavimai) {return this.viewPardavimai}
      return null
    },
    viewPardavimaiLTName () {
      if (this.viewPardavimaiLT) {return this.viewPardavimaiLT}
      return null
    },
    viewPardavimaiLVName () {
      if (this.viewPardavimaiLV) {return this.viewPardavimaiLV}
      return null
    },
    labelPardavimaiName () {
      if (this.labelPardavimai) {return this.labelPardavimai
}
      return null
    },
  },
  created () {
    this.getData()
  },
  methods: {
      print() {
      // Pass the element id here
      this.perkelimai = false;
      this.mobile_card = false;
      this.$htmlToPaper('printMe');
    },
   
    kainos_keisti(){
      this.kainos = !this.kainos;
    },
    change_gam(){
      this.gam = !this.gam
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_pirk(){
      this.pirk = !this.pirk
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_lt(){
      this.rodyti_lt = !this.rodyti_lt
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_lv(){
      this.rodyti_lv = !this.rodyti_lv
     this.ieskoti = this.paieska
      this.paieska_post()
    },
    change_ee(){
      this.rodyti_ee = !this.rodyti_ee
      this.ieskoti = this.paieska
      this.paieska_post()
    },
    keisti_grupe(){
      if(!this.ieskoti){
      this.ieskoti = this.paieska;
      }
      this.paieska_post();
    },
    switch_post(){
      //this.rikiuotic = !this.rikiuoti;
      if(this.ieskoti == ""){
        this.ieskoti = this.paieska;
      }
        axios
          .post(`/prekes/store`, {
            ieskoti: this.ieskoti,
            lt: this.rodyti_lt,
            lv: this.rodyti_lv,
            ee: this.rodyti_ee,
            rikiuoti: this.rikiuoti,
            gam: this.gam,
            pirk: this.pirk,
            paieska_big: this.paieska_big,
            grupe: this.grupe,
            visi: this.visi
            })
          .then(response => {
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
    paieska_post(){
        axios
          .post(`/prekes/store`, {
            ieskoti: this.ieskoti,
            lt: this.rodyti_lt,
            lv: this.rodyti_lv,
            ee: this.rodyti_ee,
            rikiuoti: "0",
            gam: this.gam,
            pirk: this.pirk,
            paieska_big: this.paieska_big,
            grupe: this.grupe,
            visi: this.visi
            })
          .then(response => {
            console.log(response.data.data)
            //this.rikiuoti = false;
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
      .get('/prekes')
      .then(response => {
        this.isLoading = false
        this.sarasas = response.data.sarasas;
        this.paieska = response.data.paieska;
        this.viso = response.data.viso;
        this.atsargos = response.data.atsargos;

        this.rikiuoti = response.data.rikiuoti ? false : true;
        this.grupes = response.data.grupes;
        this.grupes_lv = response.data.grupes_lv;
        this.grupe = response.data.grupe;

        this.gam = response.data.gam ? true : false
        this.pirk = response.data.pirk ? true : false

        this.paieska_big = response.data.paieska_big? true : false

        this.rodyti_lt = response.data.salis.LT ? true : false
        this.rodyti_lv = response.data.salis.LV ? true : false
        this.rodyti_ee = response.data.salis.EE ? true : false
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

    viewModal_pardavimai (viewObjectP, viewPardavimai, viewPardavimaiLT, viewPardavimaiLV) {
      //console.log(viewPardavimai);
      let pardavimai = [];
      let pardavimaiLT = [];
      let pardavimaiLV = [];

      let label = []
      let  i;

      let sk = viewPardavimai.length
      for (i = 0; i < sk; i++) {
        pardavimai.push(viewPardavimai[i]['kiekis'])
        label.push(viewPardavimai[i]['data'])
        
      }
      let skLT = viewPardavimaiLT.length
      for (i = 0; i < skLT; i++) {
        pardavimaiLT.push(viewPardavimaiLT[i]['kiekis'])
      }
      let skLV = viewPardavimaiLV.length
      for (i = 0; i < skLV; i++) {
        pardavimaiLV.push(viewPardavimaiLV[i]['kiekis'])
      }

      this.viewObjectP = viewObjectP
      this.viewPardavimai = pardavimai
      this.viewPardavimaiLT = pardavimaiLT
      this.viewPardavimaiLV = pardavimaiLV
      this.labelPardavimai = label
      this.isModalViewP = true
      //this.$emit('update');
    },

    viewConfirm_pardavimai () {
      this.isModalViewP = false
    },
    viewCancel_pardavimai () {
      this.isModalViewP = false
    },

    //Edit modal
    viewModal (viewObject, viewInfo) {
      this.viewObject = viewObject
      this.viewInfo = viewInfo
      this.isModalView = true
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
