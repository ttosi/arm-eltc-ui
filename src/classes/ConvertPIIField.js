import BaseClass from './BaseClass'
import Template from './Template'

export default class ConvertPIIField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        Type: '',
        Format: '',
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('Type', 'Type', 'single', 'string'),
      Template.create('Format', 'Format', 'single', 'string'),
    ]
  }
}
