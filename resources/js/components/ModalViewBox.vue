<template>
  <modal-box :is-active.sync="isActive" @confirm="confirm" @cancel="cancel" confirm-type="is-success" confirm-label="Uždaryti">
    <div>{{viewSubject}}</div>
      <hr>
      <b-table
        focusable
        bordered
        hoverable
        :narrowed="true"
        :data="viewInfo"
        sort-icon="arrow-up">
          <b-table-column  label="DATA"  field="data" sortable v-slot="props">
                {{ props.row.data }}
          </b-table-column>
          <b-table-column label="Perkelta"  field="perkelta" sortable v-slot="props">
                {{ props.row.perkelta }}
          </b-table-column>
          <b-table-column label="Sandeliai"  field="sandeliai_i" v-slot="props">
                 <small v-for="idx in props.row.sandeliai_i" :key="idx">
                {{ idx }}, 
                </small>
          </b-table-column>
      </b-table>
  </modal-box>
</template>

<script>
import ModalBox from "./ModalBox";

export default {
  name: "ModalEditBox",
  components: {ModalBox},
  data(){
    return{
    }
  },
  props:{
    isActive: {
      type: Boolean,
      default: false
    },
    viewSubject: {
      type: String,
      default: []
    },
    viewInfo: {
      type: Array,
      default: null
    }
  },
  computed: {
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

