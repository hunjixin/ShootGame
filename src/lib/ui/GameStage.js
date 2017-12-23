import Control from './Control.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'

class GameStage extends Control {
  constructor (stageConfig, gameWorld) {
    super(stageConfig)
    this.gameWorld = gameWorld
    this.gameWorldOffset=stageConfig.gameWorldOffset
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

  render (drawContext) {
    super.render(drawContext)
  }

  
  
  destroy () {}
}

export default GameStage
module.exports = GameStage
