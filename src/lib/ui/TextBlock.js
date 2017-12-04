import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class TextBlock extends Control {
  constructor(option) {
    super(option)
    this.textArray = []
    this.setText = function (texts) {
      if (!texts) return
      this.clear()
      this.append(texts)
    }
    this.clear = function (texts) {
      this.textArray.length = 0
    }
    this.append = function (texts) {
      if (!texts) return
      if (texts instanceof Array) {
        [].push.apply(this.textArray, texts)
      } else {
        this.textArray.push(texts.toString())
      }
    }
    this.render = function (drawContext) {
      for (var index = 0; index < this.textArray.length; index++) {
        drawContext.strokeText(this.textArray[index], this.position.x + 10, 10 * (index + 1) + this.position.y)
      }
    }
  }
}


module.exports = TextBlock