import WorldCoord from './coord/WorldCoord.js'
import TimeLine from './TimeLine.js'
import util from './common/util.js'
class GameWorldCore {

  constructor (option) {
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
      var area = {x: stage.gameWorldOffset.x,y: stage.gameWorldOffset.y,width: stage.width,height: stage.height}
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
    return util.isChonghe(area, {x: gameObject.position.x,y: gameObject.position.y,width: gameObject.width,height: gameObject.height})
  }
  stop () {
    this.timeLine.stop()
    this.isRunning = 2
  }
  restart () {
    this.timeLine.start()
    this.isRunning = 1
  }
  start () {
    this.timeLine.start()
    this.isRunning = 1
  }
  destroy () {}
  reset () {
    this.timeLine.reset()
    this.isRunning = 0
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
    this.shots.length = 0
    this.enemies.length = 0
    this.bullets.length = 0
    this.spoils.length = 0
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
