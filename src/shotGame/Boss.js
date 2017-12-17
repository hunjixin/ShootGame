import util from '../lib/common/util.js'
import resource from '../lib/common/resource.js'
import context from '../lib/common/context.js'
import BasePlain from './BasePlain.js'

/**
 * Boss
 */
class Boss extends BasePlain {
  constructor(option) {
    super(option,true)
    this.enableShot=true
    this.type = 'boss'
    this.fixed.y = true
    this.shotSpeedFactor = 0.1
  }
  shotFactory () {
    return this.shotor.CreateShot(this)
  }
}

export default Boss
module.exports = Boss