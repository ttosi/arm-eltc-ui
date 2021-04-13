import BaseClass from './BaseClass'
import Template from './Template'

export default class MerchantInfo extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        MerchantDesc: '',
        SICCode: '',
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('MerchantDesc', 'Merchant Description', 'single', 'string'),
      Template.create('SICCode', 'SIC Code', 'single', 'string'),
    ]
  }
}
