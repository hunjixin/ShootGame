import Control from './Control.js'
import ViewCoord from '../coord/ViewCoord.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'

class GameStage extends Control {
  constructor (gameWorld, stageConfig) {
    super(stageConfig)
    this.gameWorld = gameWorld
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
  GameObjectToView (point) {
    return {
      x: this.XGameObjectToView(point.x),
      y: this.YGameObjectToView(point.y)
    }
  }
  XGameObjectToView (x) {
    return  x-this.gameWorldOffset.x
  }
  YGameObjectToView (y) {
    return y -this.gameWorldOffset.y
  }
  ViewToGameWorld (point) {
    return {
      x: this.XViewToGameWorld(point.x),
      y: this.YViewToGameWorld(point.y)
    }
  }
  XViewToGameWorld (x) {
    return x + this.gameWorldOffset.x
  }
  YViewToGameWorld (y) {
    return y + this.gameWorldOffset.y
  }
  destroy () {}
}

export default GameStage
module.exports = GameStage
