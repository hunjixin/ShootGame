import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'
import Rect from '../../lib/shape/Rect.js'
import Point from '../../lib/shape/Point.js'
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
    var center=new Point(plain.shape.x + plain.shape.width / 2 ,plain.shape.y + plain.shape.height / 2 )
    var radis=plain.shape.width / 2
    for (var i = 1; i <= split; i++) {
      var shot = new Shot()
      shot.belong = plain.Oid
      shot.hp = 1
      shot.icon = resource.shot
      shot.gameWorld=plain.gameWorld
      shot.shape=new Rect(
        center.x-radis* Math.cos(rotate * i),
        center.y - radis* Math.sin(rotate * i),
        5,
        15
      )
      shot.center=center
      shot.rotate=rotate * i- Math.PI /2
      shot.speedY = sp * Math.sin(rotate * i)
      shot.speedX = sp * Math.cos(rotate * i)
      shots.push(shot)
    }
    return shots 
  }
}

export default UmbrellaShot
module.exports = UmbrellaShot