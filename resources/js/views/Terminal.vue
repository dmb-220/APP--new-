<template>
  <div>
    <section class="section is-main-section">
      <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="VALDYMAS" icon="account-multiple">
        <div class="columns">
          <div class="column">
             <b-field  label="Swedbank:" horizontal>
              <file-picker-terminalas @file-updated="file_info_bankas" v-model="file_bankas"/>
            </b-field>
            <b-field  label="Luminor:" horizontal> 
              <file-picker-terminalas @file-updated="file_info_bankas2" v-model="file_bankas2"/>
            </b-field>
              <b-field  label=" " horizontal>
            <p class="control">
              <button class="button is-sark" @click="suformuoti">Suformuoti</button>
            </p>
            </b-field>
          </div>
          <div class="column">
            <b-field  label="Pardavimai:" horizontal>
              <file-picker-terminalas @file-updated="file_info_pardavimai" v-model="file_pardavimai"/>
            </b-field>  
            <b-field  label=" " horizontal>
              <p class="control">
                <button class="button is-dark" @click="suformuoti">Sudengti</button>
              </p>
            </b-field>
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
                <b-table-column class="has-text-right" label="DINETA"  field="data" v-slot="props">
                    {{ props.row.dineta.toFixed(2) }}
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
                <th>{{ swed_viso['pinigai']['dineta'].toFixed(2) }}<br>{{ swed_viso['pajamos']['dineta'].toFixed(2) }}</th>
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
              <b-table-column class="has-text-right" label="DINETA"  field="data" v-slot="props">
                    {{ props.row.dineta.toFixed(2) }}
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
                <th>{{ lumi_viso['pinigai']['dineta'].toFixed(2) }}<br>{{ lumi_viso['pajamos']['dineta'].toFixed(2) }}</th>
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

import FilePickerTerminalas from '@/components/FilePickerTerminalas'

export default {
  name: "Terminal",
  components: {CardToolbar, CardComponent, FilePickerTerminalas },
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
      file_bankas: null,
      failas_bankas: "",
      file_bankas2: null,
      failas_bankas2: "",
      file_pardavimai: null,
      failas_pardavimai: "",
      swedbank: [],
      luminor: [],
      swed_viso: [],
      lumi_viso: [],
      store: [],
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    onRowClass: function (row, index) {
      if(row.suma.toFixed(2) == row.dineta.toFixed(2)){
        return this.color[0];
      }else{
        return this.color[2];
      }
    },
    onRowClass2: function (row, index) {
      if(row.suma.toFixed(2) == row.dineta.toFixed(2)){
        return this.color[0];
      }else{
        return this.color[2];
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
