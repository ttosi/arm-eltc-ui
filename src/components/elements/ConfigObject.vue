<template>
  <div class="mb-2 pa-1 list-border">
    <table border="0">
      <tr>
        <td v-for="(template, index) in childTemplate" :key="index">
          <div class="caption ml-4 mb-1" v-if="template.type !== 'list'">
            {{ template.name }}
          </div>
        </td>
      </tr>
      <tr>
        <td valign="top" v-for="(template, index) in childTemplate" :key="index" class="px-1">
          <textbox
            v-if="template.dataType === 'string'"
            class="mr-3"
            :islist="true"
            :template="template"
            :data.sync="data[template.prop]"
          >
          </textbox>
          <integer
            v-if="template.dataType === 'integer'"
            :islist="true"
            :template="template"
            :data.sync="data[template.prop]"
            :mask="'##############'"
          >
          </integer>
          <select-list
            v-if="template.dataType === 'select'"
            :islist="true"
            :template="template"
            :data.sync="data[template.prop]"
          >
          </select-list>
          <config-object
            v-if="template.type === 'object'"
            :islist="true"
            :childTemplate="getChildTemplate(template.dataType)"
            :parentTemplate="template"
          >
          </config-object>
          <div v-if="template.type === 'list'"></div>
          <list
            v-if="template.type === 'list'"
            :parentTemplate="template"
            :childTemplate="getChildTemplate(template.dataType)"
            :data="data[template.prop]"
          >
          </list>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ProxyClasses, ChildClasses } from '@/classes'

export default {
  name: 'config-object',
  components: {
    Textbox: () => import('@/components/elements/Textbox'),
    Integer: () => import('@/components/elements/Integer'),
    Boolean: () => import('@/components/elements/Boolean'),
    SelectList: () => import('@/components/elements/SelectList'),
    List: () => import('@/components/elements/List'),
  },
  props: {
    childTemplate: Array,
    parentTemplate: Object,
    data: Object,
  },
  methods: {
    getChildTemplate(prop) {
      return ChildClasses[prop].template
    },
  },
  mounted() {
    // this.$nextTick(function () {
    //   // this.$emit('update:data', new ProxyClasses(this.parentTemplate.prop).data)
    // })
  },
}
</script>

<style scoped>
.list-border {
  border: 1px solid #bbb;
  border-radius: 6px;
}
</style>
