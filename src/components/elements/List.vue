<template>
  <div class="mb-1 pa-3 list-border">
    <div class="body-2 font-weight-regular">
      {{ parentTemplate.name }}
      <span class="caption">({{ data.length }})</span>
    </div>
    <div>
      <v-btn
        small
        class="mr-0"
        color="secondary font-weight-light"
        depressed
        @click="add(parentTemplate.dataType, data)"
      >
        Add New
        {{ parentTemplate.name.substring(0, parentTemplate.name.length - 1) }}
      </v-btn>
      <v-tooltip top open-delay="750" color="secondary">
        <template v-slot:activator="{ on }">
          <v-btn icon class="mr-0" v-on="on" @click="upload(childTemplate, parentTemplate, data)">
            <v-icon class="" color="secondary">file_upload</v-icon>
          </v-btn>
        </template>
        <span>Upload Fields</span>
      </v-tooltip>
      <v-tooltip top open-delay="750" color="secondary">
        <template v-slot:activator="{ on }">
          <v-btn icon class="ml-0" v-on="on" @click="removeAll(data)">
            <v-icon class="" color="secondary">delete_sweep</v-icon>
          </v-btn>
        </template>
        <span>Delete All Fields</span>
      </v-tooltip>
    </div>
    <template v-if="data">
      <table v-if="data.length > 0" class="mt-2">
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td v-for="(template, index) in childTemplate" :key="index">
            <div class="caption ml-3 mb-0">
              {{ template.name }}
            </div>
          </td>
        </tr>
        <tr v-for="(row, index) in data" :key="index">
          <td valign="top">
            <v-btn icon @click="remove(index)" class="ma-0 pa-0">
              <v-icon class="ma-0 pa-0" color="secondary">delete</v-icon>
            </v-btn>
          </td>
          <td class="caption pt-2" valign="top" style="width: 15px; text-align: right;">
            {{ index + 1 }}
          </td>
          <td valign="top" style="width: 300px;" v-for="(template, index) in childTemplate" :key="index" class="px-1">
            <textbox
              v-if="template.dataType === 'string'"
              class="mr-2 pa-0"
              :islist="true"
              :template="template"
              :data.sync="row[template.prop]"
            >
            </textbox>
            <integer
              v-if="template.dataType === 'integer'"
              :islist="true"
              :template="template"
              :data.sync="row[template.prop]"
              :mask="'##############'"
            >
            </integer>
            <select-list
              v-if="template.dataType === 'select'"
              :islist="true"
              :template="template"
              :data.sync="row[template.prop]"
            >
            </select-list>
            <v-checkbox
              v-if="template.dataType === 'bool'"
              :islist="true"
              color="secondary"
              class="trim-checkbox"
              :template="template"
              :data.sync="row[template.prop]"
              v-model="row[template.prop]"
            >
            </v-checkbox>
            <div v-if="template.type === 'object'"></div>
            <config-object
              v-if="template.type === 'object'"
              :parentTemplate="template"
              :childTemplate="getChildTemplate(template.dataType)"
              :data.sync="row[template.prop]"
            >
            </config-object>
            <list
              v-if="template.type === 'list'"
              :parentTemplate="template"
              :childTemplate="getChildTemplate(template.dataType)"
              :data="row[template.prop]"
            >
            </list>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { ProxyClasses, ChildClasses } from '@/classes'

export default {
  name: 'list',
  components: {
    Textbox: () => import('@/components/elements/Textbox'),
    Integer: () => import('@/components/elements/Integer'),
    Boolean: () => import('@/components/elements/Boolean'),
    SelectList: () => import('@/components/elements/SelectList'),
    ConfigObject: () => import('@/components/elements/ConfigObject'),
  },
  props: {
    parentTemplate: Object,
    childTemplate: Array,
    data: Array,
  },
  methods: {
    getChildTemplate(prop) {
      return ChildClasses[prop].template
    },
    getObject(prop) {
      return new ProxyClasses(prop).data
    },
    add(dataType, data) {
      let prop = new ProxyClasses(dataType).data
      if (prop.hasOwnProperty('DerivedFieldMap')) {
        prop.DerivedFieldMap = new ProxyClasses('DerivedFieldMap').data
      }
      this.data.push(prop)
    },
    remove(index) {
      this.data.splice(index, 1)
    },
    removeAll(data) {
      data.splice(0, data.length)
    },
    upload(child, parent, fields) {
      this.$store.commit('modal/show', {
        content: 'upload',
        title: `Upload ${parent.name}`,
        data: {
          type: parent.dataType,
          fields: fields,
          props: child.map((p) => {
            return p.prop
          }),
        },
      })
    },
  },
}
</script>

<style scoped>
.list-border {
  border: 1px solid #bbb;
  border-radius: 6px;
}
.trim-checkbox {
  margin: 6px 0px 0px 13px;
  padding: 0px 0px 0px 0px;
}
</style>
