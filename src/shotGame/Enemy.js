import BasePlain from './BasePlain.js'
/**
 * 敌军
 * @param {*是否发射} isShot 
 */
class Enemy extends BasePlain {
  constructor(option,isShot) {
    super(option)
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
module.exports = Enemy