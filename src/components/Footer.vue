<template>
  <v-footer class="pa-3" flat dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed color="primary">
    <v-spacer></v-spacer>
    <div class="font-weight-light space-letters caption">
      ARM Insight - Copyright &copy; {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<script>
export default {
  components: {},
}
</script>
