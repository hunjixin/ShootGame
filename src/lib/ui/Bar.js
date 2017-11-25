import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Bar extends Control {
    constructor (option) {
      super(option)
      this.rightButton = option.rightButton
      this.render = function (drawContext) {
        if (!this.isDisplay) return
        drawContext.drawImage(this.icon, this.position.x , this.position.y, this.width, this.height)
        // hp
        for (var index = 0;index < context.stageManager.stage.player.Hp;index++) {
          var width = (resource.hp.width - 15) * index
          drawContext.drawImage(resource.hp, width, 0, 20, context.headOffset)
        }
        // rightbutton
        this.rightButton.render(drawContext)
      }
      this.registerControl(this.rightButton)
    }
  
  }
  module.exports = Bar