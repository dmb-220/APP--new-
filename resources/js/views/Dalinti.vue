<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        <b-field  label="Prekių sąrašas CSV:" horizontal>
          <file-picker-dalinti @file-updated="file_info" v-model="file"/>
        </b-field>
          <b-field  label=" " horizontal>
        <p class="control">
          <button class="button is-sark" @click="suformuoti">Suformuoti</button>
        </p>
        </b-field>
      </card-component>
      <card-component title="Prekių dalinimas" icon="account-multiple">
      <b-tabs type="is-toggle">
        <b-tab-item label="Prekių sarašas" icon="view-list"></b-tab-item>
        <b-tab-item label="Informacija" icon="view-dashboard"></b-tab-item>
        <b-tab-item label="Excel failas" icon="download"></b-tab-item>
      </b-tabs>
      </card-component>
    </section>
  </div>

</template>


<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

import FilePickerDalinti from '@/components/FilePickerDalinti'

export default {
  name: "Prekiu dalijimas",
  components: {CardToolbar, CardComponent, FilePickerDalinti },
  data () {
    return {
      checkboxPosition: 'left',
      checkedRows: [],
      showDetailIcon: false,
      isLoading: false,

      file: null,
      failas: "",
      no_input: false,
      dalinti: [],
    }
  },
  computed: {
  },
  created () {
    this.getData();
  },
  methods: {
    file_info (value) {
      this.failas = value.name;
    },

suformuoti(){
    axios
      .post(`/dalinti/store`, {
        file: this.failas,
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
      .get('/dalinti')
      .then(response => {
        this.isLoading = false
        this.dalinti = response.data.dalinti;    
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
