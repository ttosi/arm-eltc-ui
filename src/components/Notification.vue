<template>
  <v-snackbar v-model="show" :timeout="notification.timeout" :top="notification.top" :color="notification.color">
    {{ notification.message }}
    <v-btn dark flat @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      notification: {
        message: '',
        color: '',
        timeout: undefined,
        top: true,
      },
    }
  },
  components: {},
  created: function() {
    this.$store.watch(
      (s) => s.notification.show,
      () => {
        const store = this.$store
        if (store.state.notification.show) {
          this.show = true
          this.notification = Object.assign(this.notification, store.state.notification)

          store.commit('notification/hide', { show: false })
        }
      }
    )
  },
}
</script>
