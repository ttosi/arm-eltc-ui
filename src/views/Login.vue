<template>
  <v-container fill-height>
    <v-layout justify-center row wrap align-center>
      <v-card class="justify-center px-3">
        <v-card-title primary-title>
          <div class="font-weight-regular mb-0 pr-2">
            <h3 class="headline h3--primary">ETL Configurator</h3>
          </div>
          <div class="text-xs-right">
            <img class="pt-2" src="/images/arm-logo.png" width="60%" />
          </div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-flex sm12>
              <v-text-field label="Email Address" outline v-model="username"></v-text-field>
            </v-flex>
          </div>
          <div>
            <v-flex sm12>
              <v-text-field outline label="Password" :type="'password'" v-model="password" @keyup.enter="login" />
            </v-flex>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn large color="primary" class="white--text" :loading="loading" @click="login">Login</v-btn>
          <!-- <v-btn flat small color="grey">Forgot Password?</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { authService as auth } from '@/services'
import { configService as config } from '@/services'

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    login() {
      this.$router.push({ path: '/' })
      // this.loading = true
      // auth
      //   .login(this.username, this.password)
      //   .then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      //   .catch(() => {
      //     this.showNotification({
      //       message: 'Username or password is invalid',
      //       color: 'error',
      //     })
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    ...mapMutations({
      showNotification: 'notification/show',
    }),
  },
  mounted() {},
}
</script>
