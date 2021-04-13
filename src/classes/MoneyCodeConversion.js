import BaseClass from './BaseClass'
import Template from './Template'

export default class MoneyCodeConversion extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Code: '',
        CodeValue: '',
        Sign: '',
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Code', 'Code', 'single', 'string'),
      Template.create('CodeValue', 'Code Value', 'single', 'string'),
      Template.create('Sign', 'Sign', 'single', 'string'),
    ]
  }
}
