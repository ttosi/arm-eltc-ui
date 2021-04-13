import BaseClass from './BaseClass'
import Template from './Template'

export default class HashField extends BaseClass {
  constructor(data) {
    super({
      canUpload: false,
    })
    Object.assign(
      this,
      {
        Type: '',
        Format: '',
        DerivedFieldMap: {},
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Type', 'Type', 'single', 'string'),
      Template.create('Format', 'Format', 'single', 'string'),
      Template.create('DerivedFieldMap', 'Field Map', 'object', 'DerivedFieldMap'),
    ]
  }
}
