<template>
  <div style="height: 100%; padding-bottom: 3px">
    <table ref="fileMenu" width="100%" style="height: 100%;">
      <tr>
        <td class="file-style">
          <div>
            <v-card tile flat color="white">
              <v-card-text class="px-0 py-0" style="border-bottom: 1px solid #bbb;">
                <input type="text" class="filter-text" v-model="filterText" placeholder="Filter Files" />
                <v-btn v-if="filterText.length > 0" @click="filterText = ''" flat icon color="secondary" class="ma-0 pa-0">
                  <v-icon small>close</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
            <v-card tile flat color="lightgray" style="overflow-y: scroll;" :height="fileMenu">
              <template v-for="(file, i) in filteredFiles">
                <div :key="i" @click="select(file)" class="file-button" :class="{ selected: activefile.Id === file.Id }">
                  <div v-if="parseInt(file.FriendlyName.length) > 25">
                    <v-tooltip right open-delay="500" color="secondary">
                      <template v-slot:activator="{ on }">
                        <v-card-text class="px-2 py-1 caption text-no-wrap text-uppercase" v-on="on">
                          {{ file.FriendlyName }}
                        </v-card-text>
                      </template>
                      <span>{{ file.FriendlyName }}</span>
                    </v-tooltip>
                  </div>
                  <div v-else>
                    <v-card-text class="px-2 py-1 caption text-uppercase">
                      {{ file.FriendlyName }}
                    </v-card-text>
                  </div>
                </div>
              </template>
            </v-card>
          </div>
        </td>
        <td style="vertical-align: top;">
          <v-container v-if="filteredFiles.length > 0" class="ma-1 pa-0">
            <v-layout row class="mx-3 mt-0">
              <v-flex xs6>
                <v-btn small flat class="secondary px-2 mr-3 font-weight-light" @click="add">
                  <v-icon left dark small class="mr-1">insert_drive_file</v-icon>
                  Add
                </v-btn>
                <span class="body-2 text-uppercase">
                  <v-icon small class="mr-1" @click="rename">edit</v-icon>
                  {{ activefile.FriendlyName }}
                </span>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6 text-xs-right>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="save">
                  <v-icon left dark small class="mr-2">save</v-icon>
                  Save
                </v-btn>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="loadDefaults(activefile.FileSetting['CommonFileSetting'])">
                  <v-icon left dark small class="mr-2">keyboard_arrow_up</v-icon>
                  Load Defaults
                </v-btn>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="saveDefaults(activefile.FileSetting['CommonFileSetting'])">
                  <v-icon left dark small class="mr-2">keyboard_arrow_down</v-icon>
                  Save As Defaults
                </v-btn>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="remove">
                  <v-icon left dark small class="mr-2">delete</v-icon>
                  Delete
                </v-btn>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="download">
                  <v-icon left dark small class="mr-2">arrow_downward</v-icon>
                  Download
                </v-btn>
                <v-btn small depressed class="secondary px-2 font-weight-light" @click="upload">
                  <v-icon left dark small class="mr-2">arrow_upward</v-icon>
                  Upload
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row class="px-3">
              <v-flex xs12 v-if="files.length > 0">
                <v-card flat color="lightgray" class="pa-1">
                  <v-expansion-panel>
                    <v-expansion-panel-content v-for="(section, i) in activefile.FileSetting" :key="i">
                      <template v-slot:header>
                        <div class="left">
                          <span class="font-weight-medium">{{ section.name }} - </span>
                          <span class="caption">{{ section.desc }}</span>
                        </div>
                      </template>
                      <v-card class="pa-0 pl-1" color="lightgray">
                        <v-card-text style="max-height: 463px; overflow-y: auto">
                          <v-container fluid class="pa-0">
                            <v-layout wrap class="mb-3">
                              <v-flex xs2 class="ma-2" v-for="(template, i) in columnElements(section.template)" :key="i">
                                <textbox v-if="template.dataType === 'string'" class="mr-2" :template="template" :data.sync="section[template.prop]">
                                </textbox>
                                <integer v-if="template.dataType === 'integer'" :template="template" :data.sync="section[template.prop]" :mask="'##############'">
                                </integer>
                                <select-list v-if="template.dataType === 'select'" :template="template" :data.sync="section[template.prop]">
                                </select-list>
                              </v-flex>
                            </v-layout>
                            <v-layout v-for="(template, i) in rowElements(section.template)" :key="i">
                              <v-flex xs12 class="mt-2">
                                <v-checkbox v-if="template.dataType === 'bool'" color="secondary" class="ma-0 pa-0 ml-4 checkbox-label" :label="template.name" v-model="section[template.prop]">
                                </v-checkbox>
                                <div v-if="template.type === 'list'"></div>
                                <list v-if="template.type === 'list'" :parentTemplate="template" :childTemplate="getChildTemplate(template.dataType)" :data.sync="section[template.prop]">
                                </list>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else>
            <v-layout row>
              <v-flex xs5 class="pt-4">
                <v-btn small flat class="secondary px-2 font-weight-light" @click="add">
                  <v-icon left dark small class="mr-2">insert_drive_file</v-icon>
                  Add
                </v-btn>
                <v-btn small flat class="secondary px-2 font-weight-light" @click="upload">
                  <v-icon left dark small class="mr-2">arrow_upward</v-icon>
                  Upload
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-alert class="text-xs-center my-3" :value="true" color="secondary" outline>
                  No configuration files found. Add or upload a new configuration file.
                </v-alert>
              </v-flex>
              <v-flex xs5>
              </v-flex>
            </v-layout>
          </v-container>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { configService as config, fileService as file } from '@/services'
import { ProxyClasses, RootClasses, ChildClasses } from '@/classes'
import { List, Textbox, Integer, Boolean, SelectList, SelectAuto } from '@/components'

export default {
  components: { List, Textbox, Integer, Boolean, SelectList, SelectAuto },
  data() {
    return {
      files: [],
      configId: '',
      filterText: '',
      fileMenu: 0,
      initialLoad: true,
      hasChanges: false,
    }
  },
  computed: {
    activefile() {
      this.initialLoad = true
      this.hasChanges = false
      return this.getActiveFile
    },
    filteredFiles() {
      return this.files.filter((f) => {
        return f.FriendlyName.toLowerCase().includes(this.filterText.toLowerCase())
      })
    },
    ...mapGetters({
      getActiveFile: 'configuration/getActiveFile',
      getFiles: 'configuration/getFiles',
      configDetails: 'configuration/getDetails',
    }),
  },
  methods: {
    async select(selectedFile) {
      if (this.confirmChanges()) {
        this.setActive(await file.load({ Id: selectedFile.Id }))
      }
    },
    add() {
      if (this.configDetails.isLocked) {
        this.showNotification({
          message: 'This configuration is locked and cannot be modified',
          color: 'warning',
        })
        return
      }

      if (this.confirmChanges()) {
        this.$store.commit('modal/show', {
          content: 'add-file',
          title: 'Add File',
        })
      }
    },
    rename() {
      this.$store.commit('modal/show', {
        content: 'rename-file',
        title: 'Rename File',
        data: {
          activeFile: this.activefile,
          listFile: this.files.find((f) => f.Id === this.activefile.Id),
        },
      })
    },
    confirmChanges() {
      if (!this.hasChanges) {
        return true
      }
      return confirm('There are unsaved changes. Continue?')
    },
    async save() {
      if (this.configDetails.isLocked) {
        this.showNotification({
          message: 'This configuration is locked and cannot be modified',
          color: 'warning',
        })
        return
      }

      if (!this.hasChanges) {
        this.showNotification({
          message: 'All your base are belong to us',
          color: 'info',
        })
        return
      }

      const respone = await file.save(this.activefile)
      this.hasChanges = false
      this.showNotification({
        message: `${this.activefile.FriendlyName} successfully saved`,
        color: 'success',
      })
      this.selected = []
    },
    async download() {
      config.downloadSingle(this.configId)
    },
    async upload() {
      if (this.configDetails.isLocked) {
        this.showNotification({
          message: 'This configuration is locked and cannot be modified',
          color: 'warning',
        })
        return
      }

      var input = document.createElement('input')
      input.type = 'file'

      input.onchange = (e) => {
        var file = e.target.files[0]

        this.showNotification({
          message: 'Uploading file, please wait...',
          color: 'info',
          timeout: 0, // Don't dismiss the notification, keep it up until the
          // file successfully uploads or errors out, at which time
          // those notifications will override this one.
        })

        config
          .upload(this.configId, file)
          .then((res, rej) => {
            this.showNotification({
              message: 'Successfully uploaded the file, refreshing page in a few seconds...',
              color: 'success',
            })
            new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
              this.$router.go()
            })
          })
          .catch((err) => {
            this.showNotification({
              message: `Failed to upload file with error '${err}'`,
              color: 'error',
            })
          })
      }

      input.click()
    },
    async remove(index) {
      if (this.configDetails.isLocked) {
        this.showNotification({
          message: 'This configuration is locked and cannot be modified',
          color: 'warning',
        })
        return
      }

      if (!confirm(`Are you sure you want to delete this file?`)) {
        return
      }

      const deleteFile = this.files.find((f) => f.Id === this.activefile.Id)
      file.delete(deleteFile.Id).then(() => {
        this.files.splice(this.files.indexOf(deleteFile), 1)
        if (this.files.length === 0 || this.filteredFiles.length === 0) {
          return
        }

        const fileId = this.filteredFiles.length > 0 ? this.filteredFiles[0].Id : {}
        file.load({ Id: fileId }).then((res) => {
          this.setActive(res)
        })
      })
    },
    async saveDefaults(section) {
      config.saveDefaults(this.configId, section).then(() => {
        this.showNotification({
          message: `${section.name} defaults successfully saved`,
          color: 'success',
        })
      })
    },
    async loadDefaults(section) {
      config
        .loadDefaults(this.configId, section)
        .then(() => {
          this.showNotification({
            message: `${section.name} defaults sucessfully loaded`,
            color: 'success',
          })
        })
        .catch((err) => {
          this.showNotification({
            message: `No defaults found for ${section.name}`,
            color: 'warning',
          })
        })
    },
    getChildTemplate(prop) {
      return ChildClasses[prop].template
    },
    columnElements(template) {
      return template.filter((e) => e.dataType === 'string' || e.dataType === 'integer' || e.dataType === 'select')
    },
    rowElements(template) {
      return template.filter((e) => e.dataType === 'bool' || e.type === 'list')
    },
    ...mapMutations({
      showNotification: 'notification/show',
      setActive: 'configuration/setActive',
      setFiles: 'configuration/setFiles',
    }),
  },
  watch: {
    activefile: {
      handler() {
        if (this.initialLoad) {
          this.initialLoad = false
          return
        }

        this.hasChanges = true
        if (this.configDetails.isLocked) {
          this.showNotification({
            message: 'This configuration is locked and cannot be modified',
            color: 'warning',
          })
        }
      },
      deep: true,
    },
  },
  async created() {
    this.configId = this.$route.params['id']
    this.setFiles(await file.list(this.configId))
    this.files = this.getFiles

    if (this.files.length > 0) {
      this.setActive(await file.load({ Id: this.files[0].Id }))
    }
  },
  mounted() {
    this.fileMenu = this.$refs.fileMenu.clientHeight - 46
  },
}
</script>

<style scoped>
.filter-text {
  height: 40px;
  width: 80%;
  padding: 15px;
  outline: none;
}

.file-style {
  width: 200px;
  vertical-align: top;
  border-right: 1px solid #bbb;
}

.checkbox-label >>> label {
  font-size: 13px;
  color: #666;
}

.file-button {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
}

.file-button:hover {
  background-color: #395e86;
  color: #fff;
}

.selected {
  background-color: #beccdc;
  color: #000;
}
</style>
