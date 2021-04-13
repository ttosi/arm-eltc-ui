<template>
  <div>
    <div v-if="!processing" class="mt-3">
      <div class="subtitle-1 font-weight-medium mb-3 ml-3">
        Change Password
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="Current Password"
          v-model="current"
        />
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="New Password"
          v-model="password1"
        />
      </div>
      <div class="mb-3">
        <input
          class="config-form ml-2"
          style="width: 300px"
          type="text"
          autofocus
          placeholder="Confirm New Password"
          v-model="password2"
          @keyup.enter="change"
        />
      </div>
      <v-alert outline class="my-3" color="error" icon="warning" :value="true" v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
      <div class="ml-2">
        <v-btn small depressed class="mr-0" color="secondary font-weight-light" @click="change">
          Change Password
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
  name: 'change-password',
  components: {},
  props: {},
  data() {
    return {
      current: '',
      password1: '',
      password2: '',
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
    change() {},
  },
}
</script>
