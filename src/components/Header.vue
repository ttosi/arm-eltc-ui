<template>
  <v-toolbar flat dark app fixed color="primary" :clipped-left="$vuetify.breakpoint.mdAndUp">
    <v-toolbar-title class="white--text">
      <span class="header">ARM Insight </span>
      <span class="header-accent">REFINERY CONFIGURATOR</span>
    </v-toolbar-title>
    <div v-if="routeName === 'configuration'" class="mt-1 header" style="font-size: 16pt; margin-left: 87px">
      {{ config.name }}
      <v-icon v-if="config.isLocked" class="ml-2" small style="margin-bottom: 6px;">lock</v-icon>
    </div>
    <v-spacer></v-spacer>
    <div @click="logout" class="font-weight-light pointer">{{ user.Email }}</div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-toolbar-side-icon v-on="on"></v-toolbar-side-icon>
      </template>
      <v-list dense>
        <!-- <v-list-tile @click="resetpassword">
          <v-list-tile-title>
            <v-icon small class="mr-2" style="margin-bottom: 2px;">lock</v-icon>
            Change Password
          </v-list-tile-title>
        </v-list-tile> -->
        <v-list-tile @click="logout">
          <v-list-tile-title>
            <v-icon small class="mr-2" style="margin-bottom: 2px;">exit_to_app</v-icon>
            Sign Out
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { authService as auth } from '@/services'

export default {
  components: {},
  data() {
    return {
      routeName: '',
      isLocked: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      config: 'configuration/getDetails',
    }),
  },
  methods: {
    resetpassword() {
      this.$store.commit('modal/show', {
        content: 'change-password',
        title: 'Change Password',
      })
    },
    logout() {
      auth.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
  },
  watch: {
    $route() {
      this.routeName = this.$route.name
    },
  },
}
</script>

<style scoped>
.header {
  font-family: 'Open Sans Condensed';
  font-size: 18pt;
}

.header-accent {
  font-family: 'Open Sans Condensed';
  font-size: 10pt;
  color: #00dddb;
}
</style>
