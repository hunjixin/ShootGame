import util from '../lib/common/util.js'
import resource from '../lib/common/resource.js'
import context from '../lib/common/context.js'
import BasePlain from './BasePlain.js'

/**
 * @param {*玩家} isShot 
 */
class Player extends BasePlain {
  constructor(option) {
    super(true)
    this.fixed.y = true
    this.icon = resource.plainImg
    this.width = 30
    this.height = 24
    this.AllHp = 12
    this.Hp = this.AllHp
    this.position =option.position
    this.collisionArea = [{
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }]
    this.enableShot = true
    this.speedY = -1
    this.shotType = {
      type: 'umShot',
      num: 5
    }
    this.shotFactory = function () {
      return this.shotor.CreateShot(this)
    }
    this.reset = function () {
      this.Hp = 3
      this.shotType = {
        type: 'umShot',
        num: 5
      }
      this.setShotInterVal(5)
    }
  }
}

export default Player
module.exports = Player