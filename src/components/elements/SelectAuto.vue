<template>
  <div class="">
    <div v-if="!islist" class="caption ml-3 mb-1">{{ template.name }}</div>
    <div>
      <v-autocomplete outline class="select-list ml-2" v-model="model" :items="fields"> </v-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-auto',
  props: {
    template: Object,
    // fields: Array,
    data: [String, Number],
    islist: Boolean,
  },
  data() {
    return {
      fields: ['one', 'two', 'three', 'four'],
      model: null,
    }
  },
}
</script>

<style>
.select-list .v-input__control {
  height: 36px !important;
  background-color: #fff;
  border-radius: 3px !important;
}

.select-list .v-input__slot {
  border: 1px solid #ccc !important;
  min-height: 36px !important;
}

.select-list .v-select__slot > input {
  color: #777 !important;
  font-size: 15px !important;
}

.select-list .v-input__icon > i {
  color: white !important;
}
</style>
