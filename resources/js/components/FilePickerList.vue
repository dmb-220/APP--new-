<template>
<b-field :label="label" :message="fieldFileMessage" :type="fieldFileType">
    <b-upload v-model="file" @input="upload" drag-drop expanded> 
      <section class="section">      
        <div class="content has-text-centered">
          <p>
            <b-icon :icon="uploadButtonIcon" size="is-large"></b-icon>
          </p>
          <p v-if="uploadButtonText">{{ uploadButtonText }}</p>
        </div>  
      </section>     
    </b-upload>
    <div v-if="fileName" class="control">
      <span :title="fileName">{{ fileName }} </span>
    </div>
  </b-field>
</template>

<script>
import each from 'lodash/each'

export default {
  name: 'FilePickerList',
  props: {
    label: {
      type: String,
      default: 'Saskaitos failo įkėlimas',
    },
    message: {
      type: String,
      default: null,
    },
    currentFile: {
      default: null
    }
  },
  data () {
    return {
      errors: {},
      file: null,
      uploadPercent: 0,
      isUploadSuccess: false,
    }
  },
  computed: {
    fieldFileMessage() {
      if (this.errors.file) {
        return this.errors.file[0]
      }

      if (this.isUploadSuccess) {
        return 'Failas įkeltas sėkmingai'
      }

      if (this.uploadPercent) {
        return `Įkeliama ${this.uploadPercent}%`
      }

      return this.message
    },
    uploadButtonText() {
      return (this.fileName) ? 'Rinktis sekantį failą' : 'Pasirinkite failą'
    },
    uploadButtonIcon() {
      return (this.fileName) ? 'cloud-sync' : 'cloud-upload'
    },
    fieldFileType() {
      return (this.errors.file) ? 'is-danger' : null
    },
    fileName () {
      if (this.file) {
        return this.file.name
      }

      if (this.currentFile) {
        return this.currentFile
      }

      return null
    }
  },
  methods: {
    upload (file) {
      this.errors = {}
      let formData = new FormData()
      formData.append('file', this.file)
      this.isUploadSuccess = false
      //console.log(JSON.stringify(formData));

      axios
        .post('/export/store_akcija', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: this.progressEvent
        })
        .then(r => {
          this.isUploadSuccess = true

          // Display success data & then drop it after a little while
          // setTimeout(() => {
          //   this.file = null
          //   this.isUploadSuccess = false
          //   this.uploadPercent = 0
          // }, 1500)
          //console.log(JSON.stringify(r.data.upload))
          this.$emit('file-updated', r.data.data)
          this.$emit('file-id-updated', r.data.data.id)
        })
        .catch(err => {
          this.file = null
          this.uploadPercent = 0

          if (err.response.data.errors) {
            this.errors = err.response.data.errors
          } else {
            this.errors = {
              _all: ['Upload error']
            }
          }
          each(this.errors, err => {
            this.$buefy.toast.open({
              message: err[0],
              type: 'is-danger',
              queue: false,
            })
          })
        })
    },
    dropFile () {
      this.file = null
      this.isUploadSuccess = false
      this.uploadPercent = 0

      this.$emit('file-updated', null)
      this.$emit('file-id-updated', null)
    },
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    }
  }
}
</script>
