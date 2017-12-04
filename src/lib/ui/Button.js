import BaseButton from './BaseButton.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
class Button extends BaseButton {
  constructor(option) {
    super(option)
    this.text = option.text
  }
}

module.exports = Button