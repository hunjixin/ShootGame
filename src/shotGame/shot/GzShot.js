import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
import Rect from '../../lib/ui/shape/Rect.js'
/**
 * 子弹
 */
class GzShot extends GameObject {
  constructor (gameWorld) {
    super()
    this.gameWorld = gameWorld
  }
  createShots (plain) {
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy) * Math.sign(spy)
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.hp = 100000000
    shot.gameWorld = plain.gameWorld
    shot.icon = resource.gz
    var area = this.gameWorld.constraintAreas[0]
    shot.shape = new Rect(
      plain.shape.x + plain.shape.width / 2 -  100 / 2,
      0,
      100,
      area.height
    )
    shot.speedY = 0
    shot.speedX = 0
    var shotCount = 100
    var tm
    // 1秒后威力减弱
    setTimeout(() => {
      var span = shot.shape.width / 5
      tm = setInterval(() => {
        if (this.gameWorld.isRunning == 1) {
          shot.shape.width = shot.shape.width - span
          shot.shape.x = shot.shape.x + span / 2
        }
      }, 100)
    }, 1000)
    // 1.5秒后消失
    setTimeout(() => {
      shot.shape.y = area.height
      shot.isDie = true
      clearTimeout(tm)
    }, 1500)
    return [shot]
  }
}

export default GzShot
module.exports = GzShot
