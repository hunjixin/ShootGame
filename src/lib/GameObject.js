import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'
import EObject from './EObject.js'
class GameObject extends EObject {
  constructor (option) {
    super(option)
    this.on('click', function (params) {
      // option.cancel()
    })
  }
  placeAtWorld (positionOrX, y) {
    if (arguments.length == 2) {
      this.position.x = positionOrX
      this.position.y = y
    }else {
      this.position = positionOrX
    }
  }

}

module.exports = GameObject
