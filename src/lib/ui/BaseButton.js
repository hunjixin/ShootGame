import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class BaseButton extends Control {
  constructor(option) {
    super(option)
    this.text = option.text
  }
  render(view,drawContext) {
    super.render(view,drawContext)
    this.drawText(drawContext)
  }
}

module.exports = BaseButton