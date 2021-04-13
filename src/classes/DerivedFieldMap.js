import BaseClass from './BaseClass'
import Template from './Template'

export default class DerivedFieldMap extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        TargetField: '',
        SourceFields: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('TargetField', 'Target Field', 'single', 'string'),
      Template.create('SourceFields', 'Source Fields', 'list', 'SrcField'),
    ]
  }
}
