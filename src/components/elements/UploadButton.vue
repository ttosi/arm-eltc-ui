<template>
  <div class="btn btn-primary jbtn-file">
    {{ title }}
    <input type="file" v-on:change="fileSelected" onclick="this.value = null" />
  </div>
</template>

<script>
export default {
  name: 'upload-button',
  props: {
    callback: Function,
    title: String,
  },
  methods: {
    fileSelected(e) {
      if (this.callback) {
        if (e.target.files[0]) {
          this.callback(e.target.files[0])
        } else {
          this.callback(null)
        }
      }
    },
  },
}
</script>

<style scoped>
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #395e86;
  padding: 4px;
  width: 180px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  border-radius: 1px;
  font-size: 13px;
}

.jbtn-file input[type='file'] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>
