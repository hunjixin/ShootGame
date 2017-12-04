import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Bar extends Control {
  constructor(option) {
    super(option)
    this.borderSize = 0
  }
  render(drawContext) {
    super.render(drawContext)
    // hp
    for (var index = 0; index < context.viewManager.view.player.Hp; index++) {
      var width = (resource.hp.width - 15) * index
      drawContext.drawImage(resource.hp, width, 0, 20, context.headOffset)
    }
  }
}
module.exports = Bar