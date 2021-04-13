import BaseClass from './BaseClass'
import Template from './Template'

export default class CustomDataSet extends BaseClass {
  constructor(data) {
    super({
      _name: 'Custom Data Set',
      _description: `Money code conversions, zip censor tract
      mappings, merchant patterns, payment agent patterns`,
    })
    Object.assign(
      this,
      {
        MoneyCodeConversions: [],
        MerchantPatterns: [],
        PaymentAgentPatterns: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('MoneyCodeConversions', 'Money Code Conversions', 'list', 'MoneyCodeConversion'),
      Template.create('MerchantPatterns', 'Merchant Patterns', 'list', 'MerchantPattern'),
      Template.create('PaymentAgentPatterns', 'Payment Agent Patterns', 'list', 'MerchantPattern'),
    ]
  }
}
