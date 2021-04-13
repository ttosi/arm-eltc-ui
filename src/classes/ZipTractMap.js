import Template from './Template'
import BaseClass from './BaseClass'

export default class ZipTractMap extends BaseClass {
  constructor(data) {
    super()
    Object.assign(
      this,
      {
        Name: '',
      },
      data
    )
  }

  static get template() {
    return [Template.create('Name', 'Field Name', 'single', 'string')]
  }
}
