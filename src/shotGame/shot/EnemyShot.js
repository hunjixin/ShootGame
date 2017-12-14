import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'

/**
 * 子弹
 */
class EnemyShot extends GameObject {
  constructor() {
    super()
  }
  createShots(plain){
    var shot = new Shot()
    shot.belong = plain.Oid
    shot.Hp = 1
    shot.width = 5
    shot.height = 15
    shot.icon = resource.eshot
    shot.gameWorld=plain.gameWorld
    shot.speedY = (Math.abs(plain.speedY) + 8) * Math.sign(plain.speedY)
    shot.position.x = plain.position.x + plain.width / 2 - shot.width / 2
    shot.position.y = plain.position.y + plain.height - 15
    shot.collisionArea = [{
      x: 0,
      y: 0,
      width: shot.width,
      height: shot.height
    }]
    return [shot]
  }
}

export default EnemyShot
module.exports = EnemyShot