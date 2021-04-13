export default class BaseClass {
  constructor(data) {
    Object.assign(
      this,
      {
        _name: '',
        _canHaveDefaults: false,
        _desc: '',
        _canUpload: true,
        _hasChanges: false,
      },
      data
    )
  }

  sectionName() {
    return this._name
  }

  sectionDesc() {
    return this._description
  }

  canHaveDefaults() {
    return this._canHaveDefaults
  }

  canUpload() {
    return this._canUpload
  }

  hasChanges() {
    return this._hasChanges
  }
}

BaseClass.prototype.getProperties = function() {
  return Object.keys(this).filter((p) => !p.startsWith('_'))
}
