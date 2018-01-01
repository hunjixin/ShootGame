import util from './common/util.js'
import context from './common/context.js'
import {CornerRect,Rect} from './shape'
import lodash from 'lodash'
import Drawer from './Drawer'
/**
 * 基类
 */
class EObject {
  constructor (option) {
    this.isDisplay = true // is show
    this.Oid = ++context.currentOid // id
    this.backgroundColor // background color
    this.icon // background image
    this.name = '' // name
    this.shape = new Rect(0, 0, 0, 0) // shape
    this.speedY = 5 // Y speed
    this.speedX = 0 // X speed
    this.opacity = 1 // opacity
    this.fixed = {
      x: false,
      y: false
    }

    this.zIndex = 0 // layer index
    this.borderColor = 'black' // border color
    this.borderSize = 1 // border size
    // property above can be override
    lodash.merge(this, option)
    this.children = [] // child element
    // property below can't be override
    if (option && option.parent) {
      this.changeParent(option.parent)
    }
    if (option && option.children && option.children instanceof Array) {
      for (var i = 0; i < option.children.length; i++) {
        this.addChild(option.children[i])
      }
    }
    this._xpath // x  function
    this._ypath // x  function 
    this._moveTick = 0 // tick
  }
  move () {
    this.moveY()
    this.moveX()
  }
  moveX () {
    if (this.fixed.x) return
    if (this._xpath && this._xpath instanceof Function) {
      this.shape.x += this._xpath()
    } else {
      this.shape.x += this.speedX
    }
  }
  moveY () {
    if (this.fixed.y) return
    if (this._ypath && this._ypath instanceof Function) {
      this.shape.y += this._ypath()
    } else {
      this.shape.y += this.speedY
    }
  }
  setXPath (xpath) {
    this._xpath = xpath
  }
  setYPath (ypath) {
    this._xpath = ypath
  }

  update () {
    this.move()
    this._moveTick++
  }

  show () {
    this.isDisplay = true
    this.children.forEach((control) => {
      control.show()
    })
  }
  hide () {
    this.isDisplay = false
    this.children.forEach((control) => {
      control.hide()
    })
  }

  render (drawContext, shape) {
    if (!this.isDisplay) return
    if (!this.opacity) return
    drawContext.save()
    var drawer = new Drawer(drawContext)
    // pre set
    // opacity
    drawContext.globalAlpha = this.opacity
    if (this.rotate) {
      drawContext.translate(shape.x + shape.width / 2, shape.y + shape.height / 2)
      drawContext.rotate(this.rotate)
      drawContext.translate(-shape.x - shape.width / 2, -shape.y - shape.height / 2)
    }    // rotate


  //  var radis = Math.floor(Math.min(shape.width, shape.height) * 0.02)
   
    if (this.backgroundColor) {
      drawer.fillRect(shape,this.backgroundColor)
    }

    if (this.borderColor && this.borderSize > 0) {
      drawer.strokeRect(shape,this.borderColor)
    }

    if (this.icon) {
      drawer.drawImage(shape,this.icon)
    }

    if (context.setting.isDebug.value) {
      drawer.fillDebug(shape)
    }

    if (this.children) {
      this.children.forEach((control) => {
        control.render(drawContext)
      })
    }

    drawContext.restore()
  }

  drawText (drawContext, shape) {
    if (!this.text) return
    drawContext.save()

    drawContext.font = shape.height * 0.6 + 'px Arial'
    var offsetToButton = shape.height * 0.2
    var requireWidth = drawContext.measureText(this.text)
    var leftOffset = (shape.width - requireWidth.width) / 2
    drawContext.fillText(this.text, shape.x + (leftOffset >= 0 ? leftOffset : 0), shape.y + shape.height - offsetToButton, shape.width)
    drawContext.restore()
  }

  on (viewContext, eventName, fff) {
    if (!fff || !eventName) return
    var func = (obj, eventInfo) => {
      if (fff) fff.call(this, eventInfo)
    }
    if (!this[eventName]) {
      this[eventName] = []
    }
    viewContext.losEvent.attachEvent(this, eventName, this[eventName])
    this[eventName].push(func)
  }

  off (viewContext, callack) {
    viewContext.losEvent.deAttchEvent(this, eventName, callack)
  }

  getEvent (viewContext, eventName) {
    return viewContext.losEvent[eventName]
  }
  isCollide (eobject) {
    return util.isCoincide(this.shape, eobject.shape)
  }
  addChild (child) {}

  changeParent (parent) {}

  cancelControl (childControl) {}

  destroy () {}
}

module.exports = EObject
