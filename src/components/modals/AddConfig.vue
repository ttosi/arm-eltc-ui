<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Add a new configuration
        <div class="caption">
          This will create a new configuration to which you be able to add files to.
        </div>
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="Configuration Name"
          v-model="configname"
          @keyup.enter="create"
        />
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn small depressed class="mr-0" color="secondary font-weight-light" @click="create">
          Create Configuration
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
import { fileService as file } from '@/services'

export default {
  name: 'add-config',
  components: {},
  props: {},
  data() {
    return {
      configname: '',
      errorMessage: '',
      processing: false,
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      setActive: 'configuration/setActive',
      addFile: 'configuration/addFile',
    }),
    async create() {
      if (!this.configname) {
        this.errorMessage = 'Configration name is required'
        return
      }

      this.processing = true
      config.create(this.configname).then((res) => {
        const id = res.Id
        this.$router.push({ name: 'configuration', params: { id } })
        this.configname = ''
        this.processing = false
        this.$emit('update:show', false)
      })
    },
  },
}
</script>
