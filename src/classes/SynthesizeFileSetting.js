import BaseClass from './BaseClass'
import Template from './Template'

export default class SynthesizeFileSetting extends BaseClass {
  constructor(data) {
    super({
      _name: 'Synthesized Fields Settings',
      _description: `Synthesized fields.`,
    })
    Object.assign(
      this,
      {
        SynthesizeFields: [],
      },
      data
    )
  }

  static get template() {
    return [Template.create('SynthesizeFields', 'Field Names', 'list', 'SynthesizeField')]
  }
}
