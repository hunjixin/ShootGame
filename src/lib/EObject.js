import util from './common/util.js'
import context from './common/context.js'

import lodash from 'lodash'
/**
 * 基类
 */
class EObject {
  constructor(option) {
    this.isDisplay = true //is show
    this.Oid = ++context.currentOid // id
    this.backgroundColor //background color
    this.icon //background image
    this.name = '' //name
    this.width = 0 // width
    this.height = 0 // height
    this.speedY = 5 // Y speed
    this.speedX = 0 // X speed
    this.fixed = {
      x: false,
      y: false
    } //x,y position constraint
    this.position = {
      x: 0,
      y: 0
    } //position
    this.collisionArea = [] //collision area
    this.zIndex = 0 //layer index
    this.borderColor = "black" //border color
    this.borderSize = 1 //border size
    //property above can be override
    lodash.merge(this, option)
    this.children = [] //child element
    //property below can't be override
    if (option && option.parent) {
      this.changeParent(option.parent)
    }
    if (option && option.children && option.children instanceof Array) {
      for (var i = 0; i < option.children.length; i++) {
        this.addChild(option.children[i])
      }
    }
    this._xpath //x position function
    this._ypath //x position function 
    this._moveTick = 0 //tick

    if (option && option.event) {
      Object.keys(option.event).forEach((actionName) => {
        if (option.event[actionName] instanceof Function) {
          this.on(actionName, option.event[actionName])
        }
      })
    }
  }
  move() {
    this.moveY()
    this.moveX()
  }
  moveX() {
    if (this.fixed.x) return
    if (this._xpath && this._xpath instanceof Function) {
      this.position.x += this._xpath()
    } else {
      this.position.x += this.speedX
    }
  }
  moveY() {
    if (this.fixed.y) return
    if (this._ypath && this._ypath instanceof Function) {
      this.position.y += this._ypath()
    } else {
      this.position.y += this.speedY
    }
  }
  getAbsoluteCollisionArea() {
    return lodash.map(this.collisionArea, (area) => {
      return {
        x: this.position.x + area.x,
        y: this.position.y + area.y,
        width: area.width,
        height: area.height
      }
    })
  }
  setXPath(xpath) {
    this._xpath = xpath
  }
  setYPath(ypath) {
    this._xpath = ypath
  }

  update() {
    this.move()
    this._moveTick++
  }

  show() {
    this.isDisplay = true
    this.children.forEach((control) => {
      control.show()
    })
  }
  hide() {
    this.isDisplay = false
    this.children.forEach((control) => {
      control.hide()
    })
  }
  render(drawContext) {
    if (!this.isDisplay) return
    var radis = Math.floor(Math.min(this.width, this.height) * 0.02)
    if (this.backgroundColor) {
      drawContext.save()

      this.lineRect(drawContext, this.position.x, this.position.y, this.width + 1, this.height + 1, radis)

      drawContext.fillStyle = this.backgroundColor
      drawContext.fill()
      drawContext.restore()
    }

    this.drawBordor(drawContext, radis)
    if (this.icon) {
      this.drawBakcgroundImage(drawContext)
    }

    if (context.setting.isDebug.value) {
      if (this.collisionArea && this.collisionArea.length > 0) {
        var rec = this.getAbsoluteCollisionArea()[0]
        drawContext.beginPath()
        drawContext.moveTo(rec.x, rec.y)
        drawContext.lineTo(rec.x + rec.width, rec.y)

        drawContext.moveTo(rec.x + rec.width, rec.y)
        drawContext.lineTo(rec.x + rec.width, rec.y + rec.height)

        drawContext.moveTo(rec.x + rec.width, rec.y + rec.height)
        drawContext.lineTo(rec.x, rec.y + rec.height)

        drawContext.moveTo(rec.x, rec.y + rec.height)
        drawContext.lineTo(rec.x, rec.y)
        drawContext.strokeStyle = 'blue'
        drawContext.stroke()
      }
    }
    if (this.children) {
      this.children.forEach((control) => {
        control.render(drawContext)
      })
    }
  }
  drawBordor(drawContext, radis) {
    if (this.borderColor && this.borderSize > 0) {
      drawContext.save()
      this.lineRect(drawContext, this.position.x - 1, this.position.y - 1, this.width + 1, this.height + 1, radis)
      drawContext.strokeStyle = this.borderColor
      drawContext.stroke()
      drawContext.restore()
    }
  }
  drawBakcgroundImage(drawContext) {
    if (this.icon) {
      drawContext.drawImage(this.icon,
          this.position.x, this.position.y,
          this.width, this.height),
        0, 0, this.icon.width, this.icon.height
    }
  }
  lineRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.closePath();
  }
  drawText(drawContext) {
    if (!this.text) return
    drawContext.save()

    drawContext.font = this.height * 0.6 + "px Arial";
    var offsetToButton = this.height * 0.2;
    var requireWidth = drawContext.measureText(this.text)
    var leftOffset = (this.width - requireWidth.width) / 2
    drawContext.fillText(this.text, this.position.x + (leftOffset >= 0 ? leftOffset : 0), this.position.y + this.height - offsetToButton, this.width);
    drawContext.restore()
  }
  on(eventName, callback) {
    if (!callback || !eventName) return
    var func = (obj, eventInfo) => {
      if (callback) callback.call(this, eventInfo)
    }
    if (!this[eventName]) {
      this[eventName] = []
      context.losEvent.attachEvent(this, eventName, this[eventName])
    }
    this[eventName].push(func)
  }
  off(eventName, callack) {
    context.losEvent.deAttchEvent(this, eventName, callack)
  }
  getEvent(eventName) {
    return context.losEvent[eventName]
  }
  addChild(child) {
    child.parent = this
    if (!child.zIndex) child.zIndex = this.zIndex + 1
    if (!this.isDisplay) {
      child.hide()
    }
    this.children.push(child)
  }
  changeParent(parent) {
    if (this.zIndex < this.parent.zIndex + 1)
      this.zIndex = this.parent.zIndex + 1
    if (!parent.isDisplay) {
      this.hide()
    }
    this.parent = parent
    this.parent.children.push(this)
  }
  cancelControl(childControl) {
    this.destroy()
    util.removeArr(this.children, childControl)
  }
  destroy() {
    context.losEvent.deAttchEvent(this)
    if (this.children) {
      this.children.forEach(element => {
        element.destroy()
      });
    }
  }
}

module.exports = EObject