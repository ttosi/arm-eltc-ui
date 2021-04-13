<template>
  <div class="mr-3">
    <v-checkbox
      color="secondary"
      :label="template.name"
      :value="data"
      @change="$emit('update:data', $event)"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: 'boolean',
  props: {
    data: Boolean,
    template: Object,
  },
  methods: {},
}
</script>
