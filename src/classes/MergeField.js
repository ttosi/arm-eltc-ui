import BaseClass from './BaseClass'
import Template from './Template'

export default class MergeField extends BaseClass {
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
      Template.create('Type', 'File Type', 'single', 'string'), // ['DATETTIME', 'DATE', 'NUMBER', 'STRING']),
      Template.create('Format', 'File Format', 'single', 'string'),
      Template.create('DerivedFieldMap', 'Field Map', 'object', 'DerivedFieldMap'),
    ]
  }
}
