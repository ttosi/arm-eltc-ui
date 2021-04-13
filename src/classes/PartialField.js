import BaseClass from './BaseClass'
import Template from './Template'

export default class PartialField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        NoOfChars: 0,
        StartPos: 0,
        DerivedFieldMap: {},
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('MinLineLength', 'Min Line Length', 'single', 'integer'),
      Template.create('MaxLineLength', 'Max Line Length', 'single', 'integer'),
      Template.create('DerivedFieldMap', 'Field Map', 'object', 'DerivedFieldMap'),
    ]
  }
}
