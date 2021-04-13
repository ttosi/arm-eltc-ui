import BaseClass from './BaseClass'
import Template from './Template'

export default class DerivedFileSetting extends BaseClass {
  constructor(data) {
    super({
      _name: 'Derived Field Settings',
      _description: `Partial value, merchant tag, payment agent,
      hash, year from date, and merge fields.`,
    })
    Object.assign(
      this,
      {
        PartialValueFields: [],
        MerchantTagFields: [],
        PaymentAgentTagFields: [],
        HashFields: [],
        YearFromDateFields: [],
        MergeFields: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('PartialValueFields', 'Partial Value Fields', 'list', 'PartialField'),
      Template.create('MerchantTagFields', 'Merchant Tag Fields', 'list', 'DerivedFieldMap'),
      Template.create('PaymentAgentTagFields', 'Payment Agent Tag Fields', 'list', 'DerivedFieldMap'),
      Template.create('HashFields', 'Hash Fields', 'list', 'HashField'),
      Template.create('YearFromDateFields', 'Year From Date Fields', 'list', 'DerivedFieldMap'),
      Template.create('MergeFields', 'Merge Fields', 'list', 'MergeField'),
    ]
  }
}
