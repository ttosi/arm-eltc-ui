import BaseClass from './BaseClass'
import Template from './Template'

export default class ConvertToDateField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        Format: '',
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('Format', 'Date Format', 'single', 'string'),
    ]
  }
}
