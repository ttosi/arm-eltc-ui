<template>
  <v-app style="overflow: hidden !important">
    <site-header v-if="isAuthenticated" />
    <sidebar v-if="isAuthenticated" />
    <v-content class="">
      <modal />
      <router-view />
    </v-content>
    <site-footer v-if="isAuthenticated" />
    <notification />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { Login, Home, Wizard, Configuration } from '@/views'
import { Header, Sidebar, Footer, Notification, Modal } from '@/components'
import { userService as user } from '@/services'

export default {
  name: 'App',
  components: {
    Login,
    'site-header': Header,
    Sidebar,
    Home,
    Wizard,
    Configuration,
    'site-footer': Footer,
    Notification,
    Modal,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'authentication/isAuthenticated',
    }),
  },
}
</script>
