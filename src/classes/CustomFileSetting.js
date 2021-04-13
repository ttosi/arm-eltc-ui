import BaseClass from './BaseClass'
import Template from './Template'

export default class CustomFileSetting extends BaseClass {
  constructor(data) {
    super({
      _name: 'Custom Field Settings',
      _description: `Clear out, money code convert, mask,
      year from date, zip tract map, remove card number, convert to amount,
      convert to date, convert to time, convert to datetime, and convert
      PII fields.`,
    })
    Object.assign(
      this,
      {
        ClearOutFields: [],
        MoneyCodeConvertFields: [],
        MaskFields: [],
        YearFromDatesFields: [],
        ZipTractMapsFields: [],
        RemoveCardNumbersFields: [],
        ConvertToAmountFields: [],
        ConvertToDateFields: [],
        ConvertToTimeFields: [],
        ConvertToDateTimeFields: [],
        ConvertPIIFields: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('ClearOutFields', 'Clear Out Fields', 'list', 'ClearOutField'),
      Template.create('MoneyCodeConvertFields', 'Money Code Convert Fields', 'list', 'MoneyCodeConvertField'),
      Template.create('MaskFields', 'Mask Fields', 'list', 'MaskField'),
      Template.create('YearFromDatesFields', 'Year From Date Fields', 'list', 'YearFromDate'),
      Template.create('ZipTractMapsFields', 'Zip Tract Map Fields', 'list', 'ZipTractMap'),
      Template.create('RemoveCardNumbersFields', 'Remove Card Number Fields', 'list', 'RemoveCardNumber'),
      Template.create('ConvertToAmountFields', 'Convert To Amount Fields', 'list', 'ConvertToAmountField'),
      Template.create('ConvertToDateFields', 'Convert To Date Fields', 'list', 'ConvertToDateField'),
      Template.create('ConvertToTimeFields', 'Convert To Time Fields', 'list', 'ConvertToTimeField'),
      Template.create('ConvertToDateTimeFields', 'Convert To DateTime Fields', 'list', 'ConvertToDateTimeField'),
      Template.create('ConvertPIIFields', 'Convert PII Fields', 'list', 'ConvertPIIField'),
    ]
  }
}
