import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'

/**
 * 子弹
 */
class GzShot extends GameObject {
  constructor() {
    super()
  }
  createShots(plain){
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy) * Math.sign(spy)
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.Hp = 100000000
    shot.width = 100
    shot.gameWorld=plain.gameWorld
    shot.height = context.stageManager.stage.height
    shot.icon = resource.gz
    shot.position.x = plain.position.x + plain.width / 2 - shot.width / 2
    shot.position.y = 0
    shot.collisionArea = [{
      x: 0,
      y: 0,
      width: shot.width,
      height: shot.height
    }]
    shot.speedY = 0
    shot.speedX = 0
    var shotCount = 100
    var tm
    // 1秒后威力减弱
    setTimeout(function () {
      var span = shot.width / 5
      tm = setInterval(function () {
        if (context.isRunning == 1) {
          shot.width = shot.width - span
          shot.position.x = shot.position.x + span / 2
        }
      }, 100)
    }, 1000)
    // 1.5秒后消失
    setTimeout(function () {
      shot.position.y = context.stageManager.stage.height
      shot.isDie = true
      clearTimeout(tm)
    }, 1500)
    return [shot]
  }
}

export default GzShot
module.exports = GzShot