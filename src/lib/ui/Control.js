import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import EObject from '../EObject.js'

class Control extends EObject {

  constructor (option) {
    super(option)
    if (option.viewContext) {
      this.viewContext = option.viewContext
    }

    if (option && option.event) {
      Object.keys(option.event).forEach((actionName) => {
        if (option.event[actionName] instanceof Function) {
          this.on(actionName, option.event[actionName])
        }
      })
    }
  }
  on (eventName, callback) {
    super.on(this.viewContext, eventName, callback)
  }
  off (callack) {
    super.off(this.viewContext, callack)
  }
  addChild (child) {
    child.parent = this
    child.viewContext = this.viewContext
    if (child.zIndex<=this.zIndex) child.zIndex = this.zIndex + 1
    if (!this.isDisplay) {
      child.hide()
    }
    child.viewContext = this.viewContext
    this.children.push(child)
    this.children.sort((a, b) => a.zIndex - b.zIndex)
  }

  changeParent (parent) {
    if (this.zIndex < this.parent.zIndex + 1)
      this.zIndex = this.parent.zIndex + 1
    if (!parent.isDisplay) {
      this.hide()
    }
    this.viewContext = parent.viewContext
    this.parent = parent
    this.parent.addChild(this)
  }
  cancelControl (childControl) {
    this.destroy()
    util.removeArr(this.children, childControl)
  }
  getViewArea () {
    return this.shape
  }

  destroy () {
    this.viewContext.losEvent.deAttchEvent(this)
    if (this.children) {
      this.children.forEach(element => {
        element.destroy(this.viewContext)
      })
    }
  }
  render(drawContext){
    super.render(drawContext,this.shape)
  }
}

module.exports = Control
