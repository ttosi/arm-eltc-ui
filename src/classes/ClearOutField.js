import BaseClass from './BaseClass'
import Template from './Template'

export default class ClearOutField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
      },
      data
    )
  }

  static get template() {
    return [Template.create('Name', 'Field Name', 'single', 'string')]
  }
}
