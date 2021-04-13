<template>
  <v-navigation-drawer
    width="200px"
    hide-overlay
    app
    fixed
    class="gray"
    :mini-variant.sync="mini"
    :clipped="$vuetify.breakpoint.mdAndUp"
  >
    <v-list class="pt-0">
      <v-divider></v-divider>
      <v-list-tile class="my-1" v-for="item in items" :key="item.title" @click.stop="navigate(item.route)">
        <v-list-tile-action>
          <v-btn large icon class="sidebar-btn">
            <v-icon v-if="!item.icon.endsWith('.svg')" color="primary">{{ item.icon }}</v-icon>
            <img v-if="item.icon.endsWith('.svg')" :src="item.icon" class="svg-icon"
          /></v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title color="secondary" class="mt-2">{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', route: '/' },
        // { title: 'Wizard', icon: '/images/magic-wand.svg', route: '/wizard' },
        // { title: 'Users', icon: 'group', route: '/user' },
        // { title: 'Admin', icon: 'settings', route: '/admin' },
      ],
      drawer: true,
      mini: true,
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  methods: {
    navigate(route) {
      this.mini = true
      this.$router.push({ path: route })
    },
  },
}
</script>

<style scoped>
.svg-icon {
  height: 20px;
  width: 20px;
}

.sidebar-btn::before {
  color: transparent;
}
</style>
