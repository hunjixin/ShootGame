import util from '../lib/common/util.js'
import resource from '../lib/common/resource.js'
import context from '../lib/common/context.js'
import BasePlain from './BasePlain.js'

/**
 * @param {*玩家} isShot 
 */
class Player extends BasePlain {
  constructor(option) {
    super(option)
    this.fixed.y = true
    this.enableShot = true
    this.speedY = -1
  }
  shotFactory  () {
    return this.shotor.CreateShot(this)
  }
  reset () {
    this.hp = 3
    this.shotType = {
      type: 'umShot',
      num: 5
    }
    this.setShotInterVal(5)
  }
}

export default Player
module.exports = Player