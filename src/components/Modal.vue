<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="title primary color white--text">{{ modal.title }}</v-card-title>
        <v-card-text class="pb-0">
          <component :is="activeModal" :show.sync="show"></component>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="grey" right flat @click="show = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  components: {
    AddConfig: () => import('@/components/modals/AddConfig'),
    RenameConfig: () => import('@/components/modals/RenameConfig'),
    AddFile: () => import('@/components/modals/AddFile'),
    RenameFile: () => import('@/components/modals/RenameFile'),
    Upload: () => import('@/components/modals/Upload'),
    ChangePassword: () => import('@/components/modals/ChangePassword'),
    ForgotPassword: () => import('@/components/modals/ForgotPassword'),
  },
  data() {
    return {
      show: false,
      modal: {
        content: '',
        title: '',
      },
    }
  },
  computed: {
    activeModal() {
      return this.modal.content
    },
  },
  created: function() {
    this.$store.watch(
      (s) => s.modal.show,
      () => {
        const store = this.$store
        if (store.state.modal.show) {
          this.show = true
          this.modal = Object.assign(this.modal, store.state.modal)
          store.commit('modal/hide', { show: false })
        }
      }
    )
  },
}
</script>
