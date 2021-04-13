<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Forgot Password
        <div class="caption">
          Enter the email you use to log into this account and a password reset link will be sent to that address.
        </div>
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="Email Address"
          v-model="email"
        />
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn small depressed class="mr-0" color="secondary font-weight-light" @click="reset">
          Reset Password
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
  name: 'forgot-password',
  components: {},
  props: {},
  data() {
    return {
      email: '',
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
    reset() {},
  },
}
</script>
