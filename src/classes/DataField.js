import BaseClass from './BaseClass'
import Template from './Template'

export default class DataField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        Length: 0,
        FieldPos: 0,
        Trim: true
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('Length', 'Length', 'single', 'integer'),
      Template.create('FieldPos', 'Field Position', 'single', 'integer'),
      Template.create('Trim', 'Trim', 'single', 'bool'),
    ]
  }
}
