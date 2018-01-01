import Control from './Control.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'
import GameObject from '../GameObject.js'
import Rect from '../shape/Rect.js'
import StageAbsTransfor from './StageAbsTransfor'
import StagePosTransfor from './StagePosTransfor'
class GameStage extends Control {

  constructor (stageConfig, gameWorld) {
    super(stageConfig)
    this.gameWorld = gameWorld
    this.gameWorldOffset = stageConfig.gameWorldOffset
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

  /**
   * 相对于游戏坐标 无需进行缩放
   * @param {*} stage 
   */
  getPositiveShape (item) {
    if (item instanceof GameObject) {
      return new StagePosTransfor({stage:this}).visitShape(item.shape)
    }else {
      return item.shape
    }
  }

  getAbsoluteShape (item) {
    if (item instanceof GameObject) {
      return new StageAbsTransfor({stage:this}).visitShape(item.shape).getArea()
    }else {
      return item.shape
    }
  }
  destroy () {}
}

export default GameStage
module.exports = GameStage
