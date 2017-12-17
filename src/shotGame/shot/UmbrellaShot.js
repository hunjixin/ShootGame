import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
import Rect from '../../lib/ui/shape/Rect.js'
/**
 * 子弹
 */
class UmbrellaShot extends GameObject {
  constructor(gameWorld,num) {
    super()
    this.gameWorld=gameWorld
    this.num=num
  }
  createShots(plain,num){
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var split
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy)
    if (2 * this.num - 1 < 15)
      split = 2 * this.num - 1
    else
      split = 15
    var rotate = Math.PI / (split + 1)
    var shots = []
    for (var i = 1; i <= split; i++) {
      var shot = new Shot()
      shot.belong = plain.Oid
      shot.hp = 1
      shot.icon = resource.shot
      shot.gameWorld=plain.gameWorld
      shot.shape=new Rect(
        plain.shape.x + plain.shape.width / 2 - shot.shape.width / 2,
        plain.shape.y + plain.shape.height - 15,
        5,
        15
      )
      shot.speedY = sp * Math.sin(rotate * i)
      shot.speedX = sp * Math.cos(rotate * i)
      shots.push(shot)
    }
    return shots 
  }
}

export default UmbrellaShot
module.exports = UmbrellaShot