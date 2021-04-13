export const uploadService = {
  send(file, fields) {
    return new Promise((resolve, reject) => {
      const self = this
      const reader = new FileReader()

      reader.onload = function() {
        const file = reader.result.split('\r\n')
        const headers = file.shift().split(',')

        if (!self.validate(headers, fields)) {
          reject('File does not contain required fields')
        }

        const rows = self.format(headers, file)
        resolve(rows)
      }

      reader.readAsText(file)
    })
  },
  validate(headers, fields) {
    if (!fields && !headers) {
      return false
    }
    if (headers.length !== fields.length) {
      return false
    }

    for (const field of fields) {
      if (!headers.includes(field)) {
        return false
      }
    }

    return true
  },
  format(headers, rows) {
    const formattedRows = []
    for (const row of rows) {
      if (!row) continue
      const cells = row.split(',')

      let obj = {}
      let index = 0
      for (const header of headers) {
        obj[header] = cells[index]
        index++
      }
      formattedRows.push(obj)
    }
    return formattedRows
  },
}
