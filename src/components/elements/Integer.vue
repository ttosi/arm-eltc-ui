<template>
  <div :class="{ 'ml-2': !islist }">
    <div v-if="!islist" class="caption ml-2 mb-1">{{ template.name }}</div>
    <div>
      <the-mask
        type="text"
        class="config-form"
        :placeholder="template.name"
        :mask="mask"
        :masked="true"
        :value="data"
        @click.native="focus($event)"
        @input="$emit('update:data', $event)"
      ></the-mask>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  name: 'integer',
  components: { TheMask },
  props: {
    mask: [String, Array],
    template: Object,
    data: [Number, String],
    islist: Boolean,
  },
  methods: {
    focus(e) {
      e.currentTarget.select()
    },
  },
}
</script>

<style scoped></style>
