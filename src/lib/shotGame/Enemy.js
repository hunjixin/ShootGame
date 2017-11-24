
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import BasePlain from  './BasePlain.js'
/**
 * 敌军
 * @param {*是否发射} isShot 
 */
class Enemy extends BasePlain {
    constructor (isShot) {
      super()
      this.type = 'common'
      this.speedX = 0
      this.shotSpeedFactor = 0.6
      this.shotType = {
        type: 'enemyShot',
        num: 1
      }
      this.shotFactory = function () {
        return this.shotor.CreateShot(this)
      }
    }
  }
  
  export default Enemy
  module.exports =Enemy