import BaseClass from './BaseClass'
import Template from './Template'

export default class FileIndicator extends BaseClass {
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
    return [Template.create('Name', 'File Name', 'single', 'string')]
  }
}
