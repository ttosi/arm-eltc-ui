<template>
  <div class="ma-3 ml-4">
    <v-layout row class="mb-2">
      <v-flex xs6>
        <v-btn small depressed color="primary" @click="newConfig" class="ml-0 mt-4">
          Add New Configuration
        </v-btn>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <v-btn
          small
          depressed
          class="secondary font-weight-light mt-4"
          :disabled="selected.length === 0"
          @click="download"
        >
          <v-icon left dark small class="mr-2">save_alt</v-icon>
          Combine and Download
        </v-btn>
      </v-flex>
    </v-layout>
    <v-data-table class="elevation-1" hide-actions :headers="headers" :items="configurations" :pagination.sync="pagination">
      <template v-slot:items="props">
        <tr @click="action('edit', props.item)" class="pointer">
          <td style="display: none">{{ props.item.Id }}</td>
          <td class="pr-0">
            <v-checkbox
              color="primary"
              hide-details
              :id="props.item.Id"
              :value="props.item.Id"
              @click.native.stop
              v-model="selected"
            ></v-checkbox>
          </td>
          <td>ARM Insight</td>
          <td>
            <v-btn @click.stop="action('rename', props.item)" class="mr-0" fab small flat>
              <v-icon color="#999" small>edit</v-icon>
            </v-btn>
            {{ props.item.Name }}
          </td>
          <td>{{ props.item.Author }}</td>
          <td>{{ props.item.Created }}</td>
          <td>{{ props.item.EditedBy }}</td>
          <td>{{ props.item.LastEdited }}</td>
          <td class="layout px-0">
            <v-tooltip left open-delay="750" color="secondary" v-for="command in commands" :key="command.action">
              <template v-slot:activator="{ on }">
                <div v-if="command.action === 'lock'" class="mt-2">
                  <v-icon
                    class="ml-2"
                    v-on="on"
                    :color="command.color"
                    @click.stop="action(command.action, props.item)"
                  >
                    {{ props.item.IsLocked ? 'lock' : 'lock_open' }}
                  </v-icon>
                </div>
                <div v-else class="mt-2">
                  <v-icon
                    class="ml-2"
                    v-on="on"
                    :color="command.color"
                    @click.stop="action(command.action, props.item)"
                  >
                    {{ command.icon }}
                  </v-icon>
                </div>
              </template>
              <span>{{ command.tooltip }}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { configService as config } from '@/services'

export default {
  components: {},
  methods: {
    download() {
      config.downloadCombined(this.selected).then((res) => {
        this.selected = []
      })
    },
    action(command, item) {
      switch (command) {
        case 'rename':
          this.$store.commit('modal/show', {
            content: 'rename-config',
            title: 'Rename Configuration',
            data: {
              item: item,
            },
          })
          break
        case 'edit':
          this.$store.commit('configuration/setConfig', {
            name: item.Name,
            isLocked: item.IsLocked,
          })
          this.$router.push({ name: 'configuration', params: { id: item.Id } })
          break
        case 'download':
          config.downloadSingle(item.Id)
          break
        case 'delete':
          const index = this.configurations.findIndex((c) => c.Id === item.Id)
          const confirmDelete = confirm(`Are you sure you want to delete '${this.configurations[index].Name}'?`)

          if (confirmDelete) {
            config.delete(item.Id).then((res) => {
              this.configurations.splice(index, 1)
              this.selected = []
              this.showNotification({
                message: 'Configuration successfully deleted',
                color: 'success',
              })
            })
          }
          break
        case 'lock':
          item.IsLocked = !item.IsLocked
          config.lock(item.Id, item.IsLocked).then((res) => {
            this.showNotification({
              message: `${item.Name} is ${item.IsLocked ? 'locked' : 'unlocked'}`,
              color: 'success',
            })
          })
          break
      }
    },
    newConfig() {
      this.$store.commit('modal/show', {
        content: 'add-config',
        title: 'Add Configuration',
      })
    },
    ...mapMutations({
      showModal: 'modal/show',
      showNotification: 'notification/show',
      setConfig: 'configuration/setConfig',
    }),
  },
  mounted() {
    config.list().then((data) => {
      this.configurations = data.Configs
    })
  },
  data() {
    return {
      configurations: [],
      selected: [],
      headers: [
        { text: '', align: 'left', sortable: false, value: 'select' },
        { text: 'Organization', align: 'left', value: 'Organization' },
        { text: 'Configuration', align: 'left', value: 'Name' },
        { text: 'Created By', align: 'left', value: 'Author' },
        { text: 'Created', align: 'left', value: 'Created' },
        { text: 'Modified By', align: 'left', value: 'EditedBy' },
        { text: 'Modified', align: 'left', value: 'LastEdited' },
        { text: '', align: 'left', sortable: false, value: 'toolbar' },
      ],
      commands: [
        { action: 'edit', icon: 'edit', color: 'primary', tooltip: 'Edit Configuration' },
        { action: 'download', icon: 'save_alt', color: 'primary', tooltip: 'Download Configuration' },
        { action: 'delete', icon: 'delete', color: 'primary', tooltip: 'Delete Configuration' },
        { action: 'lock', icon: 'lock_open', color: 'primary', tooltip: 'Lock or Unlock Configuration' },
      ],
      pagination: {
        sortBy: 'Name',
        descending: false,
        rowsPerPage: -1
      }
    }
  },
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.v-input--checkbox {
  width: 22px;
}
</style>
