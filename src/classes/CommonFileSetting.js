import BaseClass from './BaseClass'
import Template from './Template'

export default class CommonFileSetting extends BaseClass {
  constructor(data) {
    super({
      _name: 'Common Settings',
      _canHaveDefaults: true,
      _description: `File names, data and sensitive fields,
      batch size, field delimiters, hash fields, dest location, split
      file, header and footer rows to skip, dest DB, dest DB table, 
      and more.`,
    })

    Object.assign(
      this,
      {
        MinLineLength: 0,
        MaxLineLength: 0,
        MinFieldCount: 0,
        HeaderRowsToSkip: 0,
        FooterRowsToSkip: 0,
        InputFieldDelimeter: '',
        OutputFieldDelimeter: '',
        DestinationLocation: '',
        DestinationHost: '',
        DestinationDB: '',
        DestinationDBTable: '',
        ShipCloudDestination: '',
        WriteBehavior: 1,
        KmsKeyName: '',
        BatchSize: 0,
        LinesPerFile: 0,
        Warehouse: '',
        Schema: '',
        SplitFile: false,
        HashSensitiveFields: true,
        ReplaceNullToEmptyString: false,
        FileIndicators: [],
        DataFields: [],
        SensitiveFields: [],
      },
      data
    )
  }

  static get template() {
    return [
      Template.create('MinLineLength', 'Min Line Length', 'single', 'integer'),
      Template.create('MaxLineLength', 'Max Line Length', 'single', 'integer'),
      Template.create('MinFieldCount', 'Min Field Count', 'single', 'integer'),
      Template.create('HeaderRowsToSkip', 'Header Rows To Skip', 'single', 'integer'),
      Template.create('FooterRowsToSkip', 'Footer Rows To Skip', 'single', 'integer'),
      Template.create('InputFieldDelimeter', 'Input Delimeter', 'single', 'string'),
      Template.create('OutputFieldDelimeter', 'Output Delimeter', 'single', 'string'),
      Template.create('DestinationLocation', 'Destination Location', 'single', 'string'),
      Template.create('DestinationHost', 'Destination Host', 'single', 'string'),
      Template.create('DestinationDB', 'Destination Database', 'single', 'string'),
      Template.create('DestinationDBTable', 'Destination Database Table', 'single', 'string'),
      Template.create('ShipCloudDestination', 'Cloud Ship Destination', 'single', 'string'),
      Template.create('WriteBehavior', 'Write Behavior', 'single', 'select', ['WriteTruncate', 'WriteAppend']),
      Template.create('KmsKeyName', 'KMS Key Name', 'single', 'string'),
      Template.create('BatchSize', 'Batch Size', 'single', 'integer'),
      Template.create('LinesPerFile', 'Lines Per File', 'single', 'integer'),
      Template.create('Warehouse', 'Snowflake Warehouse', 'single', 'string'),
      Template.create('Schema', 'Snowflake Schema', 'single', 'string'),
      Template.create('SplitFile', 'Split File', 'single', 'bool'),
      Template.create('HashSensitiveFields', 'Hash Sensitive Fields', 'single', 'bool'),
      Template.create('ReplaceNullToEmptyString', 'Replace Null To Empty String', 'single', 'bool'),
      Template.create('FileIndicators', 'File Indicators', 'list', 'FileIndicator'),
      Template.create('SensitiveFields', 'Sensitive Fields', 'list', 'SensitiveField'),
      Template.create('DataFields', 'Data Fields', 'list', 'DataField'),
    ]
  }
}
