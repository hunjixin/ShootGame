import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'
import EObject from './EObject.js'
class GameObject extends EObject {
  constructor (option) {
    super(option)

    if (option && option.event) {
      Object.keys(option.event).forEach((actionName) => {
        if (option.event[actionName] instanceof Function) {
          this.on(this.viewContext,actionName, option.event[actionName])
        }
      })
    }
  }
  placeAtWorld (positionOrX, y) {
    if (arguments.length == 2) {
      this.position = {x: positionOrX,y: y}
    }else {
      this.position = positionOrX
    }
  }

  addChild(child) {}

  changeParent(parent) {}

  cancelControl(childControl) {}

  destroy () {
    if (this.views) {
      this.views.array.forEach(view => {
        view.viewContext.losEvent.deAttchEvent(this)
        if (this.children) {
          this.children.forEach(element => {
            element.destroy(view.viewContext)
          })
        }
      })
    }
  }
  getPositionAbsolute(stage) {
    return {
      x: this.position.x+stage.position.x,
      y: this.position.y+stage.position.y
    }
  }
  getViewArea(){
    if(!this.stage) return false
    return this.stage.GameObjectToView(this.position)
  }
}

module.exports = GameObject
