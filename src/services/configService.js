import { networkService as network } from '@/services'

export const configService = {
  list() {
    return new Promise((resolve) => {
      network.get('/configs').then((data) => {
        resolve(data)
      })
    })
  },
  create(name) {
    return new Promise((resolve) => {
      network.post(`/configs/addconfig`, { Name: name }).then((res) => {
        resolve(res)
      })
    })
  },
  delete(id) {
    return new Promise((resolve) => {
      network.post(`/configs/${id}/delete`).then((res) => {
        resolve(res)
      })
    })
  },
  rename(id, name) {
    return new Promise((resolve) => {
      network.post(`/configs/${id}`, { Name: name }).then((res) => {
        resolve(res)
      })
    })
  },
  lock(id, isLocked) {
    return new Promise((resolve) => {
      network.post(`/configs/${id}`, { IsLocked: isLocked }).then((res) => {
        resolve(res)
      })
    })
  },
  downloadCombined(ids) {
    return new Promise((resolve) => {
      this.download(`/Configs/download?ConfigIds=${ids.join('&ConfigIds=')}`).then(() => {
        resolve(true)
      })
    })
  },
  downloadSingle(id) {
    return new Promise((resolve) => {
      this.download(`/configs/${id}/download`).then(() => {
        resolve(true)
      })
    })
  },
  download(url) {
    return new Promise((resolve) => {
      network.get(url).then((res) => {
        const data = []
        data.push(JSON.stringify(res.FileContent, null, "\t"))
        const file = window.URL.createObjectURL(new Blob(data, { type: 'application/octet-stream' }))
        const link = document.createElement('a')
        link.href = file
        link.download = res.FileName
        link.click()
        link.remove()
        resolve(true)
      })
    })
  },
  saveDefaults(id, section) {
    return new Promise((resolve) => {
      const values = {}
      section.template
        .filter((d) => d.type === 'single')
        .map((p) => {
          return (values[p.prop] = section[p.prop])
        })

      localStorage.setItem(`${id}-${section.type}`, JSON.stringify(values))
      resolve(true)
    })
  },
  loadDefaults(id, section) {
    return new Promise((resolve, reject) => {
      const values = localStorage.getItem(`${id}-${section.type}`)
      if (!values) {
        reject(false)
        return
      }
      Object.assign(section, JSON.parse(values))
      resolve(true)
    })
  },
  upload(id, file) {
    return new Promise((resolve, reject) => {
      network.postFile(`/configs/${id}/upload`, file).then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },
}
