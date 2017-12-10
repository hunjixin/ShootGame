import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Bar extends Control {
  constructor(option) {
    super(option)
    this.borderSize = 0
    this.gameWorld=option.gameWorld
  }
  render(view,drawContext) {
    super.render(view,drawContext)
    //hp
    for (var index = 0; index < this.gameWorld.player.Hp; index++) {
      var width = (resource.hp.width - 15) * index
      drawContext.drawImage(resource.hp, width, 0, 20, this.height)
    }
  }
}
module.exports = Bar