import EObject from '../EObject.js'
import util from '../../util.js'
import resource from '../../resource.js'
import context from '../../context.js'

class Button extends EObject {
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

  module.exports = Button