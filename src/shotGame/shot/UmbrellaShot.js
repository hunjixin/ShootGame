import GameObject from '../../lib/GameObject.js'
import resource from '../../lib/common/resource.js'
import Shot from './Shot.js'

/**
 * 子弹
 */
class UmbrellaShot extends GameObject {
  constructor() {
    super()
  }
  createShots(plain,num){
    var spy = plain.speedY === 0 ? 1 : plain.speedY
    var split
    var sp = 10 * plain.shotSpeedFactor * Math.sign(spy) * Math.abs(spy)
    if (2 * num - 1 < 15)
      split = 2 * num - 1
    else
      split = 15
    var rotate = Math.PI / (split + 1)
    var shots = []
    for (var i = 1; i <= split; i++) {
      var shot = new Shot()
      shot.belong = plain.Oid
      shot.Hp = 1
      shot.width = 5
      shot.height = 15
      shot.icon = resource.shot
      shot.gameWorld=plain.gameWorld
      shot.position.x = plain.position.x + plain.width / 2 - shot.width / 2
      shot.position.y = plain.position.y + plain.height - 15
      shot.collisionArea = [{
        x: 0,
        y: 0,
        width: shot.width,
        height: shot.height
      }]
      shot.speedY = sp * Math.sin(rotate * i)
      shot.speedX = sp * Math.cos(rotate * i)
      shots.push(shot)
    }
    return shots 
  }
}

export default UmbrellaShot
module.exports = UmbrellaShot