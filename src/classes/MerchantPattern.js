import BaseClass from './BaseClass'
import Template from './Template'

export default class ZipTractMap extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Merchant: '',
        Rank: 0,
        MerchantPatterns: [],
        SICCodes: [],
        SICCodeRanges: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('Merchant', 'Merchant', 'single', 'string'),
      Template.create('Rank', 'Rank', 'single', 'integer'),
      Template.create('MerchantPatterns', 'Patterns', 'list', 'MerchantPattern'),
      Template.create('SICCodes', 'SIC Codes', 'list', 'SICCode'),
      Template.create('SICCodeRanges', 'SIC Code Ranges', 'list', 'SICCodeRange'),
    ]
  }
}
