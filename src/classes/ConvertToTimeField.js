import BaseClass from './BaseClass'
import Template from './Template'

export default class ConvertToTimeField extends BaseClass {
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
      Template.create('Format', 'Time Format', 'single', 'string'),
    ]
  }
}
