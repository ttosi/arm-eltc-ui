import BaseClass from './BaseClass'
import Template from './Template'

export default class MoneyCodeConvertField extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
        DecimalPlace: 0,
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Name', 'Field Name', 'single', 'string'),
      Template.create('DecimalPlace', 'Decimal Places', 'single', 'integer'),
    ]
  }
}
