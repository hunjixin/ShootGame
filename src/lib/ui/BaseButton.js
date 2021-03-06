import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class BaseButton extends Control {
  constructor(option) {
    super(option)
    this.text = option.text
  }
  render(drawContext) {
    super.render(drawContext)
    this.drawText(drawContext,this.shape)
  }
}

module.exports = BaseButton