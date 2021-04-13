import BaseClass from './BaseClass'
import Template from './Template'

export default class ConvertToDateTimeField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        Format: '',
        MaxReplace: '',
        ReplaceIn: '',
        ReplaceOut: '',
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('Format', 'DateTime Format', 'single', 'string'),
      Template.create('MaxReplaceLength', 'Max Replace Length', 'single', 'integer'),
      Template.create('ReplaceIn', 'Replace In', 'single', 'string'),
      Template.create('ReplaceOut', 'Replace Out', 'single', 'string'),
    ]
  }
}
