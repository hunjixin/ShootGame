import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
class Input extends Control {
    constructor (option) {
      super(option)
      this.text=option.text
    }
    render(drawContext){
      super.render(drawContext)
      if(!this.text)return
      drawContext.save()
      drawContext.font=this.height+"px Arial";
      drawContext.fillText(this.text,this.position.x,this.position.y);
      drawContext.restore()
    }
  }

  module.exports = Input