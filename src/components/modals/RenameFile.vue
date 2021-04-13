<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Rename File
        <div class="caption">
          Enter a name for this file.
        </div>
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="File Name"
          v-model="fileName"
          @keyup.enter="rename"
        />
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn small depressed class="mr-0" color="secondary font-weight-light" @click="rename">
          Rename File
        </v-btn>
      </div>
    </div>
    <div v-if="processing" class="ma-4 font-weight-medium">
      <v-progress-circular class="ma-3 my-4" indeterminate :width="3" color="primary"></v-progress-circular>
      Processing ...
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { fileService as file } from '@/services'

export default {
  name: 'rename-file',
  components: {},
  props: {},
  data() {
    return {
      fileName: '',
      errorMessage: '',
      processing: false,
    }
  },
  computed: {
    payload() {
      return this.$store.state['modal']
    },
  },
  methods: {
    rename() {
      if (!this.fileName) {
        this.errorMessage = 'File name is required'
        return
      }

      const data = this.payload.data
      data.listFile.FriendlyName = this.fileName
      data.activeFile.FriendlyName = this.fileName
      this.$emit('update:show', false)
    },
  },
}
</script>
