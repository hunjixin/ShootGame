import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
import Rect from '../../lib/shape/Rect.js'

/**
 * 子弹
 */
class EnemyShot extends GameObject {
  constructor(gameWorld) {
    super()
    this.gameWorld=gameWorld
  }
  createShots(plain){
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.hp = 1
    shot.icon = resource.eshot
    shot.gameWorld=plain.gameWorld
    shot.speedY = (Math.abs(plain.speedY) + 8) * Math.sign(plain.speedY)

    shot.shape=new Rect(
      plain.shape.x + plain.shape.width / 2 - shot.shape.width / 2,
      plain.shape.y + plain.shape.height - 15,
      5,
      15
    )
    return [shot]
  }
}

export default EnemyShot
module.exports = EnemyShot