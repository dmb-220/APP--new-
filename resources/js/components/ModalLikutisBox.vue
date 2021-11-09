<template>
  <modal-box :is-active.sync="isActive" @confirm="confirm" @cancel="cancel" confirm-type="is-success" confirm-label="Atnaujinti">
      <file-picker-LT @file-updated="file_info_LT" v-model="file_LT"/>
  </modal-box>
</template>

<script>
import ModalBox from "./ModalBox";
import FilePickerLT from './FilePickerLT'

export default {
  name: "ModalLikutisBox",
  components: {ModalBox, FilePickerLT },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      file_LT: null,
      failas_LT: '',
    }
  },
  methods: {
    file_info_LT (value) {
      this.failas_LT = value.name;
    },

    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      let arr = [];
      arr['LT'] = this.failas_LT;

      this.$emit('confirm', arr)
    }
  }
}
</script>

