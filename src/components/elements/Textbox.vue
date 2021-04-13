<template>
  <div>
    <div v-if="!islist" class="caption ml-3 mb-1">{{ template.name }}</div>
    <div>
      <input
        class="config-form ml-2"
        type="text"
        :placeholder="template.name"
        :value="data"
        @input="$emit('update:data', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'textbox',
  props: {
    template: Object,
    data: [String, Number],
    islist: Boolean,
  },
}
</script>

<style scoped></style>
