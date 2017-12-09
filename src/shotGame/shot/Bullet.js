import GameObject from '../../lib/GameObject.js'

class Bullet extends GameObject {
  constructor(option) {
    super(option)
    this.collisionArea = [{
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }]
  }
}

export default Bullet
module.exports = Bullet