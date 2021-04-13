import BaseClass from './BaseClass'
import Template from './Template'

export default class PostProcessRecordSetting extends BaseClass {
  constructor(data) {
    super({
      _name: 'Post Process Record Settings',
      _description: `Remove fields`,
    })
    Object.assign(
      this,
      {
        RemoveFields: [],
      },
      data
    )
  }

  static get template() {
    return [Template.create('RemoveFields', 'Remove Fields', 'list', 'SrcField')]
  }
}
