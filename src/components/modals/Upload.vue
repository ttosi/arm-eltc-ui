<template>
  <div>
    <div class="mb-4">
      <div class="mb-2">
        Upload a <b>csv</b> file that contains the required fields listed below. A header row must be included that
        matches these fields and in the order shown.
      </div>
      <div class="subtitle-1 font-weight-bold mb-2">Required Fields:</div>
      <ol>
        <li v-for="(prop, index) in payload.data.props" :key="index">
          {{ prop }}
        </li>
      </ol>
    </div>
    <v-alert class="my-3" :value="true" color="warning " icon="priority_high" outline>
      Warning: All existing fields in this section will be overwritten.
    </v-alert>
    <v-alert v-if="errorMessage" class="my-3" :value="true" color="error " icon="warning" outline>
      {{ errorMessage }}
    </v-alert>
    <div class="ml-3">
      <upload-button title="Select File to Process" :callback="upload"></upload-button>
    </div>
  </div>
</template>

<script>
import { uploadService as upload } from '@/services'
import { ProxyClasses } from '@/classes'
import { UploadButton } from '@/components'

export default {
  name: 'upload',
  components: {
    UploadButton,
  },
  data() {
    return {
      error: '',
    }
  },
  computed: {
    payload() {
      return this.$store.state['modal']
    },
    errorMessage() {
      return this.error
    },
  },
  methods: {
    upload(file) {
      this.error = ''
      const payload = this.payload.data

      return upload
        .send(file, payload.props)
        .then((file) => {
          payload.fields.splice(0, payload.fields.length)
          for (const field of file) {
            new ProxyClasses(payload.type, field)
            payload.fields.push(field)
          }
          this.$emit('update:show', false)
        })
        .catch((err) => {
          this.error = err
        })
    },
  },
}
</script>
