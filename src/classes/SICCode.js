import BaseClass from './BaseClass'
import Template from './Template'

export default class SICCode extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Code: '',
      },
      data
    )
  }

  static get template() {
    return [Template.create('Code', 'Code', 'single', 'string')]
  }
}
