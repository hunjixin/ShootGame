import Control from './Control.js'
import ViewCoord from '../coord/ViewCoord.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'

class GameStage extends Control {
  constructor (gameWorld,stageConfig) {
    super(stageConfig)
    this.gameWorld=gameWorld

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

export default GameStage
module.exports = GameStage
