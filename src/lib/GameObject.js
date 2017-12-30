import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'
import EObject from './EObject.js'
import Rect from './shape/Rect.js'
class GameObject extends EObject {
  constructor (option) {
    super(option)
    this.borderSize=0
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
      this.shape.x=positionOrX,
      this.shape.y=y
    }else {
      this.shape.x=positionOrX.x,
      this.shape.y=positionOrX.y
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

  
  render(drawContext,shape){
    super.render(drawContext,this.getPositiveShape(stage))
  }
}

module.exports = GameObject
