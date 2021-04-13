import BaseClass from './BaseClass'
import Template from './Template'

export default class SrcField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Field: '',
      },
      data
    )
  }

  static get template() {
    return [Template.create('Field', 'Field', 'single', 'string')]
  }
}
