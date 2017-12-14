import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
/**
 * 子弹
 */
class CommonShot extends GameObject {
  constructor() {
    super()
  }
  createShots(plain){
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy)
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.Hp = 1
    shot.width = 8
    shot.height = 24
    shot.speedY = sp
    shot.gameWorld=plain.gameWorld
    shot.icon = resource.shot
    shot.position.x = plain.position.x + plain.width / 2 - shot.width / 2
    shot.collisionArea = [{
      x: 0,
      y: 0,
      width: shot.width,
      height: shot.height
    }]

    return [shot]
  }
}

export default CommonShot
module.exports = CommonShot