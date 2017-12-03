import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Cell extends Control {
  constructor (option) {
    super(option)
    this.isCheck = option.isCheck
    this.borderSize = 1
  }
  addControl (childControl) {
    if (!childControl.width || childControl.width > this.width)
      childControl.width = this.width
    else {
      var span = this.width - childControl.width
      childControl.position.x = this.position.x + span / 2
    }
    if (!childControl.height || childControl.height > this.height)
      childControl.height = this.height
    else {
      var span = this.height - childControl.height
      childControl.position.y = this.position.y + span / 2
    }
    super.addChild(childControl)
  }
}

module.exports = Cell
