import Control from './Control.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'
import GameObject from '../GameObject.js'

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
  /**
   * 相对于游戏坐标 无需进行缩放
   * @param {*} stage 
   */
  getPositiveShape(item){
    if(item instanceof GameObject){
      return new Rect(
        item.shape.x-this.gameWorldOffset.x,
        item.shape.y-this.gameWorldOffset.y,
        item.shape.width,
        item.shape.height)
    }else{
      return item.shape
    }

  }
  destroy () {}
}

export default GameStage
module.exports = GameStage
