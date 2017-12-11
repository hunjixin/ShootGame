import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'

class StageManager {
  constructor (gameWorld, stageConfig) {
    this.gameWorld 
    this.currentStageIndex = 0
    this.stage
    this.invokor = {}
    this.stageConfig = stageConfig
  }
  /**
   * 判断关卡是否超时   单位s
   */
  isStageTimeOut () {
    if (this.stage) {
      return this.stage.isStageTimeOut()
    }
  }
  canGoNextStage () {
    var isBossEsixt = this.gameWorld.enemies.indexOf(this.gameWorld.boss)
    return -1 === isBossEsixt && this.gameWorld.isStageTimeOut() && this.gameWorld.hasCreateBoss == true
  }
  init () {
    this.invoke('next', this.currentStageIndex)
  }
  next () {
    this.currentStageIndex++
    if (this.stageConfig.length > this.currentStageIndex) {
      this.invoke('next', this.currentStageIndex)
    }
  }
  reset () {
    this.currentStageIndex = 0
    this.invoke('next', this.currentStageIndex)
  }
  register (name, callback) {
    if (callback instanceof Function) {
      if (this.invokor[name]) {
        this.invokor[name].push(callback)
      }else {
        this.invokor[name] = [callback]
      }
    }
  }
  invoke (name, stageIndex) {
    var callbacks = this.invokor[name]
    if (callbacks) {
      var that = this
      callbacks.forEach(callback => {
        callback.call(null, Object.assign({stageIndex: stageIndex}, that.stageConfig[stageIndex]))
      })
    }
  }
}

export default StageManager
module.exports = StageManager
