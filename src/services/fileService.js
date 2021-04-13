import { ProxyClasses, RootClasses } from '@/classes'
import { networkService as network } from '@/services'

export const fileService = {
  list(configId) {
    return new Promise((resolve) => {
      network.get(`/configs/${configId}`).then((config) => {
        resolve(config.FileSettings)
      })
    })
  },
  load(data) {
    return new Promise((resolve) => {
      if (data.Id) {
        network.get(`/configs/files/${data.Id}`).then((res) => {
          const fileSetting = {}
          for (const prop in RootClasses) {
            fileSetting[prop] = new ProxyClasses(prop).data

            if (res.FileSetting[prop]) {
              fileSetting[prop] = new ProxyClasses(prop, JSON.parse(JSON.stringify(res.FileSetting[prop]))).data
            }

            fileSetting[prop]['type'] = prop
            fileSetting[prop]['template'] = RootClasses[prop].template
            fileSetting[prop]['name'] = fileSetting[prop].sectionName()
            fileSetting[prop]['desc'] = fileSetting[prop].sectionDesc()
          }

          resolve({
            Id: res.Id,
            FriendlyName: res.FriendlyName,
            FileSetting: fileSetting,
          })
        })
        return
      }

      // create a new file
      let file = this.create(data.FriendlyName)
      let dataFile = JSON.parse(JSON.stringify(file))

      network.post(`/configs/${data.ConfigId}/addFile`, dataFile).then((res) => {
        file['Id'] = res.Id
        file['FriendlyName'] = res.FriendlyName
        resolve(file)
      })
    })
  },
  save(file) {
    return new Promise((resolve) => {
      const dataFile = JSON.parse(JSON.stringify(file))
      network.post(`/configs/files/${file.Id}`, dataFile).then((res) => {
        resolve(true)
      })
    })
  },
  create(friendlyName) {
    const file = {}
    const FileSetting = {}
    for (const rootClass in RootClasses) {
      FileSetting[rootClass] = new ProxyClasses(rootClass).data
      FileSetting[rootClass]['type'] = rootClass
      FileSetting[rootClass]['template'] = RootClasses[rootClass].template
      FileSetting[rootClass]['name'] = FileSetting[rootClass].sectionName()
      FileSetting[rootClass]['desc'] = FileSetting[rootClass].sectionDesc()
    }

    file['FriendlyName'] = friendlyName
    file['FileSetting'] = FileSetting
    return file
  },
  rename(id, name) {
    return new Promise((resolve) => {
      network.post(`/Configs/files/${id}`, { FriendlyName: name }).then((res) => {
        resolve(res)
      })
    })
  },
  delete(id) {
    return new Promise((resolve) => {
      network.post(`configs/files/${id}/delete`).then((res) => {
        resolve(res)
      })
    })
  },
}
