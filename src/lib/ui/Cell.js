import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Rect from './shape/Rect.js'
class Cell extends Control {
  constructor (option) {
    super(option)
    this.isCheck = option.isCheck
    this.borderSize = 1
  }
  addControl (childControl) {
    if (! childControl.shape || !childControl.shape.width || childControl.shape.width > this.width) {
      childControl.shape.width = this.shape.width
      childControl.shape.x = this.shape.x
    }else {
      var span = this.shape.width - childControl.shape.width
      childControl.shape.x = this.shape.x + span / 2
    }
    if (!childControl.shape || !childControl.shape.height || childControl.height > this.shape.height) {
      childControl.shape.height = this.shape.height
      childControl.shape.y = this.shape.y
    }else {
      var span = this.shape.height - childControl.shape.height
      childControl.shape.y = this.shape.y + span / 2
    }
    super.addChild(childControl)
  }
}

module.exports = Cell
