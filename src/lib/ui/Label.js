import BaseButton from './BaseButton.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Label extends BaseButton {
  constructor(option) {
    super(option)
    this.text = option.text
    this.borderSize = 0
  }
}

module.exports = Label