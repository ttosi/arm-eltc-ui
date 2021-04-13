export default class Template {
  static create(prop, name, type, dataType, options) {
    if (!prop || !name || !type || !dataType) {
      throw Error(`All template properties are required.`)
    }

    if (dataType === 'select' && !Array.isArray(options)) {
      throw Error('If data type is set to array, options list must be included as an array')
    }

    return {
      prop: prop,
      name: name,
      type: type,
      dataType: dataType,
      options: options || [],
    }
  }
}
