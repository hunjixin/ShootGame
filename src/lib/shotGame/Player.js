import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import BasePlain from './BasePlain.js'

/**
 * @param {*玩家} isShot 
 */
class Player extends BasePlain {
  constructor(view) {
    super(true)
    this.view = view
    this.fixed.y = true
    this.icon = resource.plainImg
    this.width = 30
    this.height = 24
    this.AllHp = 12
    this.Hp = this.AllHp
    this.position.x = (this.view.width - this.width) / 2
    this.position.y = (this.view.height - this.height)
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
      this.position.x = (this.view.width - this.width) / 2
      this.position.y = (this.view.height - this.height)
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