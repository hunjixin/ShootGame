import util from '../lib/common/util.js'
import resource from '../lib/common/resource.js'
import context from '../lib/common/context.js'
import BasePlain from './BasePlain.js'

/**
 * Boss
 */
class Boss extends BasePlain {
  constructor() {
    super(true)
    this.type = 'boss'
    this.fixed.y = true

    this.width = this.viewContext.screenWidth * 0.6
    this.height = this.width * 0.6
    this.position.x =  this.viewContext.screenWidth * 0.5
    this.position.y = 0
    this.speedY = 0
    this.icon = resource.enes[1]
    this.Hp = 200 + 200 * Math.random()
    

    this.collisionArea = [{
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }]

    this.setShotInterVal(util.randInt(10, 20))

    
 
    this.shotSpeedFactor = 0.1
    var factor = 5 * Math.random()
    this.setXPath(
      (x) => {
        return factor * (Math.cos(this._moveTick / 15))
      }
    )

    this.shotType = {
      type: 'umShot',
      num: 4
    }
    this.shotFactory = function () {
      return this.shotor.CreateShot(this)
    }
  }
}

export default Boss
module.exports = Boss