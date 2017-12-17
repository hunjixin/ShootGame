import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
/**
 * 子弹
 */
class CommonShot extends GameObject {
  constructor(gameWorld) {
    super()
    this.gameWorld=gameWorld
  }
  createShots(plain){
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy)
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.hp = 1
    shot.speedY = sp
    shot.gameWorld=plain.gameWorld
    shot.icon = resource.shot

    shot.shape=new Rect(
      plain.shape.x + plain.shape.width / 2 - shot.shape.width / 2,
      plain.shape.y + plain.shape.height - 15,
      8,
      24
    )
    return [shot]
  }
}

export default CommonShot
module.exports = CommonShot