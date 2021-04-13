import CommonFileSetting from './CommonFileSetting'
import CustomFileSetting from './CustomFileSetting'
import DerivedFileSetting from './DerivedFileSetting'
import SynthesizeFileSetting from './SynthesizeFileSetting'
import CustomDataSet from './CustomDataSet'

import ClearOutField from './ClearOutField'
import ConvertPIIField from './ConvertPIIField'
import ConvertToAmountField from './ConvertToAmountField'
import ConvertToDateField from './ConvertToDateField'
import ConvertToDateTimeField from './ConvertToDateTimeField'
import ConvertToTimeField from './ConvertToTimeField'
import DataField from './DataField'
import DerivedFieldMap from './DerivedFieldMap'
import FileIndicator from './FileIndicator'
import MaskField from './MaskField'
import MatchPattern from './MatchPattern'
import MerchantPattern from './MerchantPattern'
import MergeField from './MergeField'
import MoneyCodeConversion from './MoneyCodeConversion'
import MoneyCodeConvertField from './MoneyCodeConvertField'
import PostProcessRecordSetting from './PostProcessRecordSetting'
import RemoveCardNumber from './RemoveCardNumber'
import RemoveField from './RemoveField'
import SensitiveField from './SensitiveField'
import YearFromDate from './YearFromDate'
import ZipTractMap from './ZipTractMap'
import PartialField from './PartialField'
import HashField from './HashField'
import SrcField from './SrcField'
import SynthesizeField from './SynthesizeField'
import SICCode from './SICCode'
import SICCodeRange from './SICCodeRange'
import MerchantInfo from './MerchantInfo'

const classes = {
  CommonFileSetting,
  FileIndicator,
  DerivedFileSetting,
  DerivedFieldMap,
  DataField,
  SensitiveField,
  CustomFileSetting,
  ClearOutField,
  MoneyCodeConvertField,
  SynthesizeFileSetting,
  MaskField,
  YearFromDate,
  ZipTractMap,
  RemoveCardNumber,
  ConvertToAmountField,
  ConvertToDateField,
  ConvertToTimeField,
  ConvertToDateTimeField,
  ConvertPIIField,
  MergeField,
  CustomDataSet,
  MatchPattern,
  MerchantPattern,
  MoneyCodeConversion,
  PartialField,
  PostProcessRecordSetting,
  RemoveField,
  HashField,
  SrcField,
  SICCode,
  SICCodeRange,
  SynthesizeField,
  MerchantInfo,
}

class ProxyClasses {
  constructor(obj, data) {
    return {
      data: new classes[obj](data),
      template: classes[obj].template,
    }
  }
}

export default ProxyClasses
