import BaseClass from './BaseClass'
import Template from './Template'

export default class SICCodeRange extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        CodeMinRange: 0,
        CodeMaxRange: 0,
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('CodeMinRange', 'Code Min Range', 'single', 'integer'),
      Template.create('CodeMaxRange', 'Code Max Range', 'single', 'integer'),
    ]
  }
}
