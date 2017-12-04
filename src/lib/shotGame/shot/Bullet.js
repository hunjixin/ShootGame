import EObject from '../../EObject.js'
import util from '../../common/util.js'
import resource from '../../common/resource.js'
import context from '../../common/context.js'

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