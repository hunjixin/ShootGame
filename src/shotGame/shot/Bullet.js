import EObject from '../../lib/EObject.js'

class Bullet extends EObject {
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