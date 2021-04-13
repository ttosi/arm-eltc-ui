<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Rename Configuration
        <div class="caption">
          Enter the name for this configuration.
        </div>
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="Configuration Name"
          v-model="configName"
          @keyup.enter="rename"
        />
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn small depressed class="mr-0" color="secondary font-weight-light" @click="rename">
          Rename Configuration
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
import { configService as config } from '@/services'

export default {
  name: 'rename-config',
  components: {},
  props: {},
  data() {
    return {
      configName: '',
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
      if (!this.configName) {
        this.errorMessage = 'Configration name is required'
        return
      }

      this.processing = true
      const configuration = this.payload.data.item
      config.rename(configuration.Id, this.configName).then((res) => {
        configuration.Name = this.configName
        this.$emit('update:show', false)
        this.processing = false
      })
    },
  },
}
</script>
