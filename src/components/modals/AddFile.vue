<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Add a new file to this configuration
        <div class="caption">
          Note: This file name is only used as a friendly name for referencing it later. It's not used in the
          configuration.
        </div>
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-3"
          style="width: 300px"
          autofocus
          type="text"
          placeholder="File Name"
          v-model="filename"
          @keyup.enter="create"
        />
        <!-- <v-checkbox color="secondary" checked class="ml-3 mb-0 add-file"
          label="Autofill with current defaults?"
          v-model="useDefaults"></v-checkbox>
        <v-checkbox color="secondary" class="ml-3 mt-0 add-file"
          label="Use filename magic? (if you're doing CDW, you want this)"
          v-model="useFilename"></v-checkbox> -->
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn depressed class="mr-0" color="secondary font-weight-regular" @click="create">
          Add File
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
  name: 'add-file',
  components: {},
  props: {},
  data() {
    return {
      filename: '',
      errorMessage: '',
      processing: false,
    }
  },
  methods: {
    async create() {
      if (!this.filename) {
        this.errorMessage = 'File name is required'
        return
      }

      this.processing = true
      const newFile = await file.load({
        ConfigId: this.$route.params['id'],
        FriendlyName: this.filename,
      })

      this.setActive(newFile)
      this.addFile({
        Id: newFile.Id,
        FriendlyName: newFile.FriendlyName,
      })

      this.filename = ''
      this.processing = false
      this.$emit('update:show', false)
    },
    ...mapMutations({
      setActive: 'configuration/setActive',
      addFile: 'configuration/addFile',
    }),
  },
}
</script>

<style>
.add-file .v-label {
  font-size: 14px;
  font-weight: 500;
}
</style>
