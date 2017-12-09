import Control from './Control.js'
import ViewCoord from '../coord/ViewCoord.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'

class BaseView extends Control {
  constructor (gameWorld,viewConfig) {
    super(viewConfig)
    this.gameWorld=gameWorld
    // this.coord = viewConfig.coord
    this.position.x = 0
    this.position.y = context.headOffset
    this.width = context.option.ctxWidth
    this.height = context.option.ctxHeight - context.headOffset
    this.icon = viewConfig.icon
  }

  stop () {
    this.gameWorld.stop()
  }

  restart () {
    this.gameWorld.restart()
  }

  start () {
    this.gameWorld.start()
  }

  reset () {
    this.gameWorld.reset()
  }

  isStageTimeOut () {
    return this.gameWorld.isStageTimeOut()
  }

  render (view,drawContext) {
    super.render(view,drawContext)
  }

  destroy () {}
}

export default BaseView
module.exports = BaseView
