<template>
  <div>
    <section class="section is-main-section">
      <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
        <div class="columns">
          <div class="column">
            <file-picker-post-mini 
              @file-updated="file_info_bankas" 
              post-subject="/terminal/store_terminalas" 
              label="Swedbank" 
              v-model="file_bankas"/>
            <file-picker-post-mini 
            @file-updated="file_info_bankas2"
            post-subject="/terminal/store_terminalas" 
            label="Luminor" 
            v-model="file_bankas2"/>
            <p class="control">
               <b-button size="is-medium" type="is-dark" @click="suformuoti()">SUFORMUOTI</b-button>
            </p>
          </div>
          <div class="column">
            <file-picker-post-mini 
              @file-updated="file_info_pardavimai" 
              post-subject="/terminal/store_terminalas" 
              label="Pardavimų CSV" 
              v-model="file_pardavimai"/> 
              <p class="is-size-7">
                Mišrus atsiskaitymas CSV: Ataskaitos -> atsiskaitymų ataskaitos -> atsiskaitymų operacijos
              </p>
              <p class="control">
                <b-button size="is-medium" type="is-dark" @click="suformuoti()">SUDENGTI</b-button>
              </p>
          </div>
        </div>
      </card-component>
      <card-component title="Bankiniai terminalai" icon="account-multiple">
        <div id="printMe">
          <div class="columns">
            <!-- SWEDBANK -->
            <div class="column">
              <div class="has-text-centered is-size-3">SWEDBANK</div>
              <b-table
                bordered
                :narrowed="true"
                :data="swedbank"
                :opened-detailed="defaultOpenedDetails"
                detailed
                detail-key="data"
                @details-open="(row) => $buefy.toast.open(`Expanded ${row.data}`)"
                :show-detail-icon="showDetailIcon"
                :row-class="onRowClass2"
                sort-icon="arrow-up"
                default-sort-direction="asc"
                default-sort="data">
                <b-table-column label="DATA" field="data" sortable v-slot="props">
                      {{ props.row.data }}
                </b-table-column>
                <b-table-column class="has-text-right" label="SUMA"  field="suma" v-slot="props">
                      {{ props.row.suma.toFixed(2) }} 
                </b-table-column>
                <b-table-column class="has-text-right" label="DINETA"  field="dineta" v-slot="props">
                    {{ props.row.dineta.toFixed(2) }}
                    <div class="is-size-7 has-text-weight-bold" v-if='"misrus" in props.row'>
                        - {{ props.row.misrus.suma }} €
                      </div>
               </b-table-column>
                <b-table-column class="has-text-right" label="KOM."  field="komisiniai" v-slot="props">
                      {{ props.row.komisiniai.toFixed(2) }}
                </b-table-column>
                <b-table-column class="has-text-right" label="PAJAMOS"  field="pajamos" v-slot="props">
                      {{ props.row.pajamos.toFixed(2) }}
                </b-table-column>
                <b-table-column label="GAUTA" field="gauta" sortable v-slot="props">
                    {{ props.row.gauta }}
              </b-table-column>
              <template #detail="props">
                <div :style="{'border': '1px solid'}">
                  <b-table
                    :data="props.row.pard"
                    default-sort-direction="asc"
                    default-sort="parduotuve">
                      <b-table-column field="parduotuve" label="Parduotuvė" sortable v-slot="props">
                        {{ props.row.parduotuve }}
                      </b-table-column>
                      <b-table-column field="suma" label="Suma" sortable v-slot="props">
                        {{ props.row.suma }}
                      </b-table-column>
                      <b-table-column field="komisiniai" label="Komisiniai" sortable v-slot="props">
                        {{ props.row.komisiniai }}
                      </b-table-column>
                      <b-table-column field="pajamos" label="Pajamos" sortable v-slot="props">
                        {{ props.row.pajamos.toFixed(2) }}
                      </b-table-column>
                  </b-table>
                </div>
              </template>
              <template #footer>
                <th> </th>
                <th>Pinigai:<br>Pajamos:</th>
                <th>{{ swed_viso['pinigai']['suma'].toFixed(2) }}<br>{{ swed_viso['pajamos']['suma'].toFixed(2) }}</th>
                <th>{{ swed_viso['pinigai']['dineta'].toFixed(2) }}<br>{{ swed_viso['pajamos']['dineta'].toFixed(2) }}  
                  <div class="is-size-7 has-text-weight-bold">- {{ apy_suma.toFixed(2) }} €</div>
                </th>
                <th>{{ swed_viso['pinigai']['komisiniai'].toFixed(2) }}<br>{{ swed_viso['pajamos']['komisiniai'].toFixed(2) }}</th>
                <th>{{ swed_viso['pinigai']['pajamos'].toFixed(2) }}<br>{{ swed_viso['pajamos']['pajamos'].toFixed(2) }}</th>
              </template>
            </b-table>
          </div>
          <!-- LUMINOR -->
          <div class="column">
            <div class="has-text-centered is-size-3">LUMINOR</div>
            <b-table
              bordered
              :narrowed="true"
              :data="luminor"
              :opened-detailed="defaultOpenedDetails2"
              detailed
              detail-key="data"
              @details-open="(row) => $buefy.toast.open(`Expanded ${row.data}`)"
              :show-detail-icon="showDetailIcon"
              sort-icon="arrow-up"
              :row-class="onRowClass"
              default-sort-direction="asc"
              default-sort="data">
              <b-table-column label="DATA" field="data" sortable v-slot="props">
                {{ props.row.data }}
              </b-table-column>
              <b-table-column class="has-text-right" label="SUMA"  field="suma" v-slot="props">
                {{ props.row.suma.toFixed(2) }}
              </b-table-column>
              <b-table-column class="has-text-right" label="DINETA"  field="dineta" v-slot="props">
                {{ props.row.dineta.toFixed(2) }}
                <div class="is-size-7 has-text-weight-bold" v-if='"misrus" in props.row'>
                     - {{ props.row.misrus.suma }} €
                </div>
              </b-table-column>
              <b-table-column class="has-text-right" label="KOM."  field="komisiniai" v-slot="props">
                {{ props.row.komisiniai.toFixed(2) }}
              </b-table-column>
              <b-table-column class="has-text-right" label="PAJAMOS"  field="pajamos" v-slot="props">
                {{ props.row.pajamos.toFixed(2) }}
              </b-table-column>
              <b-table-column label="GAUTA" field="gauta" sortable v-slot="props">
                {{ props.row.gauta }}
              </b-table-column>
              <template #detail="props">
                <div :style="{'border': '1px solid'}">
                  <b-table
                    :data="props.row.pard"
                    default-sort-direction="asc"
                    default-sort="parduotuve">
                      <b-table-column field="parduotuve" label="Parduotuvė" sortable v-slot="props">
                        {{ props.row.parduotuve }}
                      </b-table-column>
                      <b-table-column field="suma" label="Suma" sortable v-slot="props">
                        {{ props.row.suma.toFixed(2) }}
                      </b-table-column>
                  </b-table>
                </div>
              </template>
              <template #footer>
                <th> </th>
                <th>Pinigai:<br>Pajamos:</th>
                <th>{{ lumi_viso['pinigai']['suma'].toFixed(2) }}<br>{{ lumi_viso['pajamos']['suma'].toFixed(2) }}</th>
                <th>{{ lumi_viso['pinigai']['dineta'].toFixed(2) }}<br>{{ lumi_viso['pajamos']['dineta'].toFixed(2) }}
                  <div class="is-size-7 has-text-weight-bold">- {{ apy_suma2.toFixed(2) }} €</div>
                </th>
                <th>{{ lumi_viso['pinigai']['komisiniai'].toFixed(2) }}<br>{{ lumi_viso['pajamos']['komisiniai'].toFixed(2) }}</th>
                <th>{{ lumi_viso['pinigai']['pajamos'].toFixed(2) }}<br>{{ lumi_viso['pajamos']['pajamos'].toFixed(2) }}</th>
              </template>
              </b-table>
            </div>
          </div>
        </div>
        <hr>
        <div class="buttons">
          <b-button size="is-medium" icon-left="printer" type="is-dark" @click="print('printMe')">SPAUSDINTI</b-button>
          <b-button tag="a" type="is-dark" size="is-medium"
            href="terminal/save_xlsx" target="_blank">
            ATSISIŲSTI
          </b-button>
        </div>
      </card-component>
    </section>
  </div>

</template>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

import FilePickerPostMini from '@/components/FilePickerPostMini'

export default {
  name: "Terminal",
  components: {CardToolbar, CardComponent, FilePickerPostMini },
  data () {
    return {
      defaultOpenedDetails: [1],
      defaultOpenedDetails2: [1],
      showDetailIcon: true,
      isLoading: false,
      isFullPage: true,
      color: [
        'is-one2', 'is-two2', 'is-three2'
      ],
      eilute: 0,
      file_bankas: null,
      failas_bankas: "",
      file_bankas2: null,
      failas_bankas2: "",
      file_pardavimai: null,
      failas_pardavimai: "",
      swedbank: [],
      luminor: [],
      swed_viso: {
        "pinigai": {
          "suma": 0, "komisiniai": 0, "pajamos": 0,  "dineta": 0
        },
        "pajamos": { "suma": 0, "komisiniai": 0, "pajamos": 0, "dineta": 0 
        }
      },
      lumi_viso: {
        "pinigai": {
          "suma": 0, "komisiniai": 0, "pajamos": 0, "dineta": 0
        },
        "pajamos": { 
          "suma": 0, "komisiniai": 0, "pajamos": 0, "dineta": 0 
        }
      },
      store: [],
    }
  },
  computed: {
    apy_suma: function(){
      let total = [];
        Object.entries(this.swedbank).forEach(([key, val]) => {
          if("misrus" in val){
            total.push(val.misrus.suma) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
    apy_suma2: function(){
      let total = [];
        Object.entries(this.luminor).forEach(([key, val]) => {
          if("misrus" in val){
            total.push(val.misrus.suma) // the value of the current key.
          }
        });
      return total.reduce(function(total, num){ return total + num }, 0);

    },
  },
  created () {
    this.getData();
  },
  methods: {
    onRowClass2: function (row, index) {
      if(row.suma.toFixed(2) == row.dineta.toFixed(2)){
        return this.color[0];
      }else{
        if("misrus" in row){
          if((row.misrus['suma'] + row.suma).toFixed(2) == row.dineta.toFixed(2)){
            return this.color[1];
          }
        }else{
            return this.color[2];
          }
      }
    },
    onRowClass: function (row, index) {
      if(row.suma.toFixed(2) == row.dineta.toFixed(2)){
        return this.color[0];
      }else{
        if("misrus" in row){
          if((row.misrus['suma'] + row.suma).toFixed(2) == row.dineta.toFixed(2)){
            return this.color[1];
          }
        }else{
            return this.color[2];
          }
      }
    },
    file_info_bankas (value) {
      this.failas_bankas = value.name;
  },
  file_info_bankas2 (value) {
      this.failas_bankas2 = value.name;
  },
  file_info_pardavimai (value) {
      this.failas_pardavimai = value.name;
  },
  print(print) {
    this.mobile_card = false;
    this.isvezta = false;
    this.$htmlToPaper(print);
  },
  getData () {
      this.isLoading = true
      this.axios
      .get('/terminal')
      .then(response => {
        this.isLoading = false
        this.swedbank = response.data.swedbank; 
        this.luminor = response.data.luminor; 
        this.swed_viso = response.data.swed_viso;
        this.lumi_viso = response.data.lumi_viso;
        this.store = response.data.store;         
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

    suformuoti(){
    axios
      .post(`/terminal/store`, {
        file_bankas: this.failas_bankas,
        file_bankas2: this.failas_bankas2,
        file_pardavimai: this.failas_pardavimai,
        })
      .then(response => {
        console.log(response.data.data)
        this.getData()
        this.$buefy.toast.open({
          message: "Duomenys atnaujinti!",
          type: 'is-info',
          //queue: false
        })
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
