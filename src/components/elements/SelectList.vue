<template>
  <div class="">
    <div v-if="!islist" class="caption ml-3 mb-1">{{ template.name }}</div>
    <div>
      <select
        class="config-form ml-1"
        style="height: 37px; color: #666"
        @change="$emit('update:data', template.options[$event.target.selectedIndex - 1])"
      >
        <option value="0">Select {{ template.name }}...</option>
        <option v-for="val in template.options" :selected="val === data" :key="val" :value="val">
          {{ val }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-list',
  props: {
    template: Object,
    data: [String, Number],
    islist: Boolean,
  },
}
</script>
