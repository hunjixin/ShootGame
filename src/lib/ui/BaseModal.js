import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class BaseModal extends Control {
  constructor(option) {
    option.backgroundColor = 'white'
    super(option)
    this.hide()

    this.on('keyUp',params => {
      if (params.keyCode == 27) {
        this.close()
      }
    })
  }
  open() {
    context.UiObjectManager.addView(this)
    this.show()
  }
  close() {
    context.UiObjectManager.removeView(this)
  }
}

module.exports = BaseModal