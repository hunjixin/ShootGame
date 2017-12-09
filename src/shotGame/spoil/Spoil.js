import GameObject from '../../lib/GameObject.js'

class Spoil extends GameObject {
  constructor(obj, type) {
    super({})
    this.speedY = 3
    this.isDie = false
    this.spoiltype = type
    this.width = 25
    this.height = 25
    this.collisionArea = [{
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }]
    this.position.x = obj.position.x
    this.position.y = obj.position.y
  }
  Effect(targetPlayer) {}
  update() {
    super.update()
  }
}

export default Spoil
module.exports = Spoil