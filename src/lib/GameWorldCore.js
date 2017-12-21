import WorldCoord from './coord/WorldCoord.js'
import TimeLine from './TimeLine.js'
import util from './common/util.js'
import MessageEmitter from './MessageEmitter.js'
class GameWorldCore {

  constructor (option) {
    this.messageEmitter=new MessageEmitter()
    this.constraintAreas = option.constraintAreas
    this.worldCoord = new WorldCoord()
    this.timeLine = new TimeLine()
    this.stageTime = 10
    this.isRunning = 2 // 三种状态 1 预备/2 进行 /3 结束
    this.objectStageMap ={}
    this.stages = []
    this.worldStore=[]
  }
  checkStage () {
    this.stages.forEach(stage => {
      var area = {x: stage.gameWorldOffset.x,y: stage.gameWorldOffset.y,width: stage.shape.width,height: stage.shape.height}
      this.worldStore.forEach(plain=>{
         if(checkArea(area,plain)){
           if(this.objectStageMap[plain.Oid])
           {
             if(!this.objectStageMap[plain.Oid].indexOf(stage))
                this.objectStageMap[plain.Oid].push(stage)
           }else{
              this.objectStageMap[plain.Oid]=[stage]
           }
         }
      })
    })
  }
  
  checkArea (area, gameObject) {
    return util.isCoincide(area, {x: gameObject.shape.x,y: gameObject.shape.y,width: gameObject.shape.width,height: gameObject.shape.height})
  }
  stop () {
    this.timeLine.stop()
    this.isRunning = 2
    this.messageEmitter.emit("stop")
  }
  restart () {
    this.timeLine.start()
    this.isRunning = 1
    this.reset() 
    this.messageEmitter.emit("restart")
  }
  start () {
    this.timeLine.start()
    this.isRunning = 1
    this.messageEmitter.emit("start")
  }
  destroy () {
    this.messageEmitter.emit("destroy")
  }
  reset () {
    this.timeLine.reset()
    this.isRunning = 0
    this.messageEmitter.emit("reset")
  }

  isStageTimeOut () {
    return this.timeLine.getRunningTime() / 1000 > this.stageTime
  }
  /**
   * 对象移动
   */
  objectMove () {}

  /**
   * 对象清理
   */
  clearObject (constraintArea) {
    this.objectStageMap={}
  }

  /**
   * 游戏世界和ui世界的接口
   * @param {*ui view} view 
   */
  drawScene (view) {
    var canvas = document.createElement('canvas')
    return canvas
  }

  /**
   * 销毁
   */
  destroy () {}
  /**
   * 重置
   */
  reset () {
    this.timeLine.reset()
    this.isRunning = 0
    this.messageEmitter.emit("reset")
  }

  /**
   * 世界更新
   */
  update () {}

  /**
   * 检测碰撞
   */
  checkCollection () {}
}

export default GameWorldCore
module.exports = GameWorldCore
