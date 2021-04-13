import BaseClass from './BaseClass'
import Template from './Template'

export default class MaskField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        MaskChar: '',
        StartPos: 0,
        NoOfCharsToMask: 0,
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('MaskChar', 'Mask Character', 'single', 'string'),
      Template.create('StartPos', 'Start Position', 'single', 'integer'),
      Template.create('Number of Character to Mask', 'NoOfCharsToMask', 'single', 'integer'),
    ]
  }
}
