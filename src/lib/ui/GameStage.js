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
  GameObjectToView (position) {
    return {
      x: this.XGameObjectToView(position.x),
      y: this.YGameObjectToView(position.y)
    }
  }
  XGameObjectToView (x) {
    return  x-this.gameWorldOffset.x// + this.position.x
  }
  YGameObjectToView (y) {
    return y -this.gameWorldOffset.y//+ this.position.y
  }
  ViewToGameWorld (position) {
    return {
      x: this.XViewToGameWorld(position.x),
      y: this.YViewToGameWorld(position.y)
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
