<template>
  <div>
    <section class="section is-main-section">
      <modal-trash-box :is-active="isModalActive" :trash-subject="trashObjectName" @confirm="trashConfirm" @cancel="trashCancel"/>
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field label="Parduotuvė:" horizontal>
            <b-select  placeholder="Pasirinkite" expanded>
                <option v-for='(idx, id) in lt' :key='idx' :value="id">{{ idx }}</option>
            </b-select>
        </b-field>
        <hr>
        <b-button size="is-medium" type="is-dark">IŠSAUGOTI</b-button>
        <vue-excel-xlsx class = "button is-dark is-medium" :data="barlist" :columns="columns" :filename="filename" :sheetname="sheetname">
            ATSISŪSTI
        </vue-excel-xlsx>
      </card-component>
      <card-component title="Barkodai" icon="account-multiple">
       <b-field horizontal label="Paskutinis barkodas:">
            <b-input name="barcode" v-model="old_barcode" expanded></b-input>
            <b-input name="kiekis" v-model="kiekis" @keyup.native.space="manual_add()" expanded></b-input>
             <p class="control">
                <b-button label="OK" @click.prevent="manual_add()" type="is-info" expanded/>
            </p>
        </b-field>
      <hr>
      <b-table
          bordered
          :narrowed="true"
          :data="barlist">
            <b-table-column v-slot="props" label="Nr.">
              {{props.index + 1}}
            </b-table-column>
            <b-table-column label="Barkodas" field="kodas" v-slot="props">
                  {{props.row.kodas}}
            </b-table-column>
            <b-table-column class="has-text-right" label="Kiekis" v-slot="props"  field="kiekis">
                  {{  props.row.kiekis }}
            </b-table-column>
            <b-table-column label="..." v-slot="props">
                   <b-button @click.prevent="trashModal(props.row.kodas, props.index)" type="is-danger" icon-right="delete" />
            </b-table-column>
          <section class="section" slot="empty">
            <div class="content has-text-centered">
              <template>
                <p>
                  <b-icon icon="emoticon-sad" size="is-large"/>
                </p>
                <p>Duomenų nerasta &hellip;</p>
              </template>
            </div>
          </section>
          <template slot="footer">
                <th class="has-text-right">VISO:</th>
                <th> </th>
                <th class="has-text-left">{{ viso }}</th>
            </template>
          </b-table>
      </card-component>
    </section>
  </div>

</template>

<style  scoped>
    
</style>

<script>
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'
import ModalTrashBox from '@/components/ModalTrashBox'

export default {
  name: "Barcode",
  components: {CardToolbar, CardComponent, ModalTrashBox},
  data () {
    return {
      filename: 'failas',
      sheetname: 'pirmas lapas',
      lt: [
        "MINS", "TELS", "MADA", "MARI", "NORF", "BIGA", "BABI", "UKME", "MANT", "VISA", 
        "KEDA","AREN", "MAXI", "PANE", "MAZE", "TAIK", "SAUL", "TAUB"
      ],
      barcode: '',
      old_barcode: '',
      kiekis: 0,
			barlist: [],
      interval: 0,
      columns : [
        {label: "Barkodas", field: "kodas"},
        {label: "Kiekis", field: "kiekis"},
      ],
      isModalActive: false,
      trashObject: null,
      trashObjectId: null,
    }
  },
  computed: {
    viso: function(){
      let total = [];
      Object.entries(this.barlist).forEach(([key, val]) => {
          total.push(val.kiekis) // the value of the current key.
      });
      return total.reduce(function(total, num){ return total + num }, 0);
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject
      }
      return null
    },
  },
  mounted() {
    window.addEventListener("keydown", event => {
      if (this.interval)
        clearInterval(this.interval);

      if (event.code == 'Enter') {
        if (this.barcode)
        this.old_barcode = this.barcode;
        this.kiekis = 1;
          var index = this.barlist.findIndex(object => {
            return object.kodas === this.barcode;
          });
          if(index == -1){
            this.barlist.push({'kodas': this.barcode, 'kiekis': parseInt(this.kiekis)});
            }else{
            this.barlist[index].kiekis += 1;
            }
          this.barcode = '';
          return;
      }

      if (event.key != 'Shift'){
          this.barcode += event.key;
          this.interval = setInterval(() => this.barcode = '', 20);
      }
    });
  },

  methods: {
    manual_add(){
      console.log('RANKINIS');
      if (this.old_barcode && this.kiekis > 0)
          var index = this.barlist.findIndex(object => {
            return object.kodas === this.old_barcode;
          });
          if(index == -1){
            this.barlist.push({'kodas': this.old_barcode, 'kiekis': parseInt(this.kiekis)});
            }else{
            this.barlist[index].kiekis += parseInt(this.kiekis);
            }
          this.kiekis = 1;
        return;
    },
    delete_barcode(){
      var newas = [];
      var x = 0;
      for (let i = 0; i < this.barlist.length; i++) {
        if(i !== this.trashObjectId){
          newas[x] = this.barlist[i];
          x++;
          console.log(this.barlist[i]);
        }
      } 
      this.barlist = newas;
      console.log("Istrinta");
    },

    trashModal (trashObject, trashObjectId) {
      this.trashObject = trashObject
      this.trashObjectId = trashObjectId
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.delete_barcode();
    },
    trashCancel () {
      this.isModalActive = false
    },
  }
}
</script>
