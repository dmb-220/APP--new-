<template>
  <section class="section is-main-section">
    <!-- NAUJAS IRASAS -->
    <b-modal v-model="ModalActive" @close="onClose">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Naujas įrašas</p>
        </header>
        <section class="modal-card-body">
          <b-notification
            v-show="modal_error"
            type="is-danger"
            @close="onCloseError"
            role="alert">
            {{ modal_error }}
          </b-notification>
          <p class="is-size-5">Parduotuvė: {{ modal_sand }}</p>
          <hr>
          <b-field grouped>
              <b-field label="NUO, (2021-01-01)" :label-position="labelPosition" expanded>
                  <b-input v-model="modal_nuo" icon="calendar-today"></b-input>
              </b-field>
              <b-field label="IKI, (2022-12-31)" :label-position="labelPosition" expanded>
                  <b-input v-model="modal_iki" icon="calendar-today"></b-input>
              </b-field>
          </b-field>
          <b-field label="Suma" :label-position="labelPosition" expanded>
            <b-input v-model="modal_suma" icon="currency-eur"></b-input>
        </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button 
            type="is-dark"
            label="IŠSAUGOTI"
            icon-right="content-save"
            @click="modal_store()" />
        </footer>
      </div>
    </b-modal>
    <!-- REDAGUOTI, ISTRINTI IRASA -->
    <b-modal v-model="ModalActive2" @close="onClose">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Redaguoti įrašą</p>
        </header>
        <section class="modal-card-body">
        <b-table
          bordered
          :data="list[modal_sand]">
            <b-table-column label="Data" v-slot="props">
              <b-field grouped>
                <b-input v-model="props.row.nuo" icon="calendar-today"></b-input>
                <b-input v-model="props.row.iki" icon="calendar-today"></b-input>
              </b-field> 
            </b-table-column>
            <b-table-column label="Suma" v-slot="props"> 
              <b-input v-model="props.row.suma" icon="currency-eur"></b-input>
            </b-table-column>
            <b-table-column width="120px" centered v-slot="props">
              <div class="buttons">
                <b-button icon-right="content-save" @click="modal_edit(props.row)" type="is-info"></b-button> 
                <b-button icon-right="delete" @click="alertDisplay(props.row.id)" type="is-danger"></b-button>
              </div>
            </b-table-column>
        </b-table>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="EditClose" type="is-dark" icon-right="close-box" label="UŽDARYTI"/>
        </footer>
      </div>
    </b-modal>
  <!-- PRADINIS PUSLAPIS -->
  <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
    <card-component title="VALDYMAS" icon="finance">
        <file-picker-post 
          @file-updated="file_info_works" 
          post-subject="/works/store_works" 
          label="Pardavimo sąrašas, CSV" 
          v-model="file_works"/>
          <p class="is-size-7">
            CSV failas gaunamas: Ataskaitos -> Pirkimų / Pardavimų ataskaitos -> Pardavimų sąrašas<br>
            Filtras: data NUO - IKI
          </p>
          <hr>
        <div class="columns">
          <div class="column">
            <b-datepicker
              placeholder="Pasirinkite data NUO"
              icon="calendar-today"
              v-model="nuo"
              editable>
            </b-datepicker>   
          </div>
          <div class="column"> 
            <b-datepicker
              placeholder="Pasirinkite data IKI"
              icon="calendar-today"
              v-model="iki"
              editable>
            </b-datepicker> 
          </div>
        </div>
        <div class="buttons">
          <b-button size="is-medium" icon-left="desktop-classic" type="is-dark" @click="suformuoti">
            SKAIČIUOTI
          </b-button>
        </div>
    </card-component>
    <card-component title="Darbo apskaita" icon="account-multiple">
      <p class="has-text-centered is-size-4 has-text-weight-semibold">
        {{ nuo.toLocaleDateString("en-CA") }} - {{ iki.toLocaleDateString("en-CA") }}
      </p>
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
                </b-table-column>
                <b-table-column label="Grazinimai" field="graza" v-slot="props"> 
                    <div v-if="props.row.graza">{{ props.row.graza.toFixed(2) }} €</div>
                    <div v-else>0 €</div>
                </b-table-column>
            </b-table>
          </b-table-column>
          <b-table-column label="Inv. trukumai" v-slot="props"> 
            <li class="is-size-7" v-for="item in list[props.row.sandelis]">
              {{ item.nuo }} - {{ item.nuo }}: {{ item.suma }} €
            </li>
          </b-table-column>
          <b-table-column width="50px" centered v-slot="props">
            <div class="buttons">
              <b-button size="is-medium" icon-right="calendar-check" type="is-info" @click="add(props.row.sandelis)"></b-button>
              <b-button v-if="props.row.sandelis in list" icon-right="account-edit" size="is-medium" type="is-primary" @click="edit(props.row.sandelis)"></b-button>
              <b-button v-else size="is-medium" icon-right="account-edit" type="is-primary" disabled></b-button>
            </div>
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
import FilePickerPost from '@/components/FilePickerPost'

export default {
  name: 'Works',
  components: { CardComponent, FilePickerPost },
  data () {
    return {
    works: [],
    list: [],
    nuo: new Date(),
    iki: new Date(),
    isLoading: false,
    isFullPage: true,
    labelPosition: 'on-border',
    defaultOpenedDetails: [1],
    showDetailIcon: false,
    isNarrowed: true,
    mobile_card: true,
    ModalActive: false,
    ModalActive2: false,
    modal_sand: '',
    modal_error: '',
    modal_nuo: "",
    modal_iki: "",
    modal_suma: "",
    file_works: null,
    failas_works: "",   
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
    modal_free(){
      this.modal_suma = "";
      this.modal_nuo = "";
      this.modal_iki = "";
    },
    modal_store(){
      //console.log("Issaugota");
      if(!this.modal_suma || !this.modal_nuo || !this.modal_iki){
        this.modal_error = "Užpildykite duomenis!";
      }else{
        this.modal_error = "";
        this.ModalActive = false;
        this.isLoading = true
        axios
          .post(`worksinventory`, {
            modal_suma: this.modal_suma,
            modal_nuo: this.modal_nuo,
            modal_iki: this.modal_iki,
            sandelis: this.modal_sand,
            })
          .then(response => {
            this.isLoading = false;
            this.getDataList();
            this.$buefy.toast.open({
              message: response.data,
              type: 'is-info',
            })
            this.modal_free();
          })
        .catch( err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
          })
        })
      }
    },
    modal_edit(arr){
      console.log(arr['id']);
      this.axios
        .patch(`/worksinventory/${arr['id']}`, arr)
        .then((response) => {
          this.getDataList();
          this.$buefy.toast.open({
            message: response.data,
            type: 'is-info',
          })
        })
        .catch((err) => {
            console.log(err);
        })
    },
    alertDisplay(id) {
      this.$swal({
        title: 'Ar tikrai norite ištrinti',
        //text: 'Ištrynus atstatyti nebeįmanoma',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Taip, ištrinti!',
        cancelButtonText: 'Ne, Palikti!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          if (result.isConfirmed) {
            this.modal_delete(id);
            this.$swal('IŠTRINTA', 'Sėkmingai pašalintas įrašas!', 'success')
          }
        }
      })
    },
    modal_delete(id) {
      this.axios
        .delete(`/worksinventory/${id}`)
        .then((response) => {
            console.log(response.data);
            this.getDataList();
            // -1 nes neatsinaujina sarasas
            if((this.list[this.modal_sand].length - 1) <= 0){
              this.ModalActive2 = false;
              this.modal_sand = "";
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },
    add(sandelis){
      this.ModalActive = true;
      this.modal_sand = sandelis;
    },
    edit(sandelis){
      this.ModalActive2 = true;
      this.modal_sand = sandelis;
    },
    EditClose() {
      this.ModalActive2 = false;
      this.modal_sand = "";
    },
    onClose() {
      this.modal_sand = "";
      this.modal_free();
    },
    onCloseError() {
      this.modal_error = "";
    },
    file_info_works(value) {
      this.failas_works = value.name;
    },
    print() {
      // Pass the element id here
      this.mobile_card = false;
      this.isPaginated = false;
      this.$htmlToPaper('printMe');
    },
    getDataList() {
      this.axios
      .get('/worksinventory')
      .then(response => {
        this.list = response.data.list;
      })
      .catch( err => {
        console.log(err.message);
      })
    },
    getData () {
      this.$buefy.toast.open({
        message: "Įkeliami nauji duomenys!",
        type: 'is-info',
      })
      this.isLoading = true
      this.axios
      .get('/works')
      .then(response => {
        this.getDataList();
        this.isLoading = false
        this.works = response.data.works;
        this.nuo = new Date(Date.parse(response.data.nuo_iki['nuo']));
        this.iki = new Date(Date.parse(response.data.nuo_iki['iki']));
      })
      .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger',
            })
          })
    },
    suformuoti(){
      this.isLoading = true
    axios
      .post(`/works/store`, {
        file_works: this.failas_works,
        nuo: this.nuo,
        iki: this.iki
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
  }
}
</script>
