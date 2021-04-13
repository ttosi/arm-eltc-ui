import BaseClass from './BaseClass'
import Template from './Template'

export default class SynthesizeField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        Type: '',
        MinRange: 0,
        MaxRange: 0,
        MinDeviation: 0,
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('Type', 'Type', 'single', 'string'),
      Template.create('MinRange', 'Min Range', 'single', 'string'),
      Template.create('MaxRange', 'Max Range', 'single', 'string'),
      Template.create('MinDeviation', 'Minimum Deviation', 'single', 'string'),
    ]
  }
}
