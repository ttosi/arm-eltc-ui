import store from '@/store'

export const networkService = {
  token() {
    return store.state.authentication.token
  },
  apiUrl() {
    return store.state.baseApiUrl
  },
  headers() {
    let headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    if (store.state.authentication.isAuthenticated) headers['Authorization'] = `Bearer ${this.token()}`

    return headers
  },
  get(url) {
    if (!url.startsWith('/')) {
      url = `/${url}`
    }
    return new Promise((resolve, reject) => {
      fetch(`${this.apiUrl()}${url}`, {
        method: 'GET',
        headers: this.headers(),
      })
        .then(this.handleStatusCode)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post(url, body) {
    if (!url.startsWith('/')) {
      url = `/${url}`
    }
    return new Promise((resolve, reject) => {
      fetch(`${this.apiUrl()}${url}`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(body),
      })
        .then(this.handleStatusCode)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  postFile(url, file) {
    if (!url.startsWith('/')) {
      url = `/${url}`
    }

    // Delete the Content-Type header as fetch() generates one automatically 
    // for file uploads with the proper bondary.
    let headers = this.headers()
    delete headers['Content-Type']

    const formData = new FormData()
    formData.append('file', file)

    return new Promise((resolve, reject) => {
      fetch(`${this.apiUrl()}${url}`, {
        method: 'POST',
        headers: headers,
        body: formData
      })
      .then(this.handleStatusCode)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },  
  download(url) {
    window.open(`${this.apiUrl()}${url}`)
  },
  handleStatusCode(res) {
    switch (res.status) {
      case 400:
        throw new Error('Bad Request')
      case 401:
        throw new Error('Unauthorized')
      case 404:
        throw new Error('Endpoint not found (404)')
      default:
        return res
    }
  },
}
