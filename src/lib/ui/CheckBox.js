import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class CheckBox extends Control {
  constructor (option) {
    if(!option.event) option.event={}
    option.event.click = function () {
      this.isCheck = !this.isCheck
    }
    super(option)
    this.isCheck = option.isCheck
    this.borderSize = 1
  }
  render (drawContext) {
    super.render(drawContext)
    if (this.isCheck) {
      drawContext.beginPath()
      drawContext.moveTo(this.position.x, this.position.y+this.height/2)
      drawContext.lineTo(this.position.x +this.width/ 3 , this.position.y + this.height)

      drawContext.moveTo(this.position.x +this.width/ 3 , this.position.y + this.height)
      drawContext.lineTo(this.position.x + this.width, this.position.y)
      drawContext.strokeStyle = 'black'
      drawContext.stroke()
    }
  }
}


module.exports = CheckBox
