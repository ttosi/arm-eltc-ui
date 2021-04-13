import BaseClass from './BaseClass'
import Template from './Template'

export default class MatchPattern extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Pattern: '',
      },
      data
    )
  }

  static get template() {
    return [Template.create('Pattern', 'Pattern', 'single', 'string')]
  }
}
