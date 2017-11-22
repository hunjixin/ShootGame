import util from '../util.js'
import lodash from 'lodash'
import context from '../context.js'
/**
 * 基类
 */
class EObject {
  constructor (option) {
    this.isDisplay = true
    this.Oid = ++context.currentOid // id
    this.backgroundColor;
    this.icon // 图片
    this.name = ''
    this.width = 0 // 宽度
    this.height = 0 // 高度
    this.speedY = 5 // Y速度
    this.speedX = 0 // X速度
    this.fixed = {x: false,y: false}
    this.position = {x: 0,y: 0} // 位置
    this.collisionArea = []
    this.children = []
    this.zIndex = 0
    lodash.merge(this, option)
    this._xpath
    this._ypath
    this.moveTick = 0
  }
  move () {
    this.moveY()
    this.moveX()
  }
  moveX () {
    if (this.fixed.x) return
    if (this._xpath && this._xpath instanceof Function) {
      this.position.x += this._xpath()
    }else {
      this.position.x += this.speedX
    }
  }
  moveY () {
    if (this.fixed.y) return
    if (this._ypath && this._ypath instanceof Function) {
      this.position.y += this._ypath()
    }else {
      this.position.y += this.speedY
    }
  }
  getAbsoluteCollisionArea () {
    return lodash.map(this.collisionArea, (area)=>  {
      return {
        x: this.position.x + area.x,
        y: this.position.y + area.y,
        width: area.width,
        height: area.height
      }
    })
  }
  setXPath (xpath) {
    this._xpath = xpath
  }
  setYPath (ypath) {
    this._xpath = ypath
  }

  update () {
    this.move()
    this.moveTick++
  }

  show () {
    this.isDisplay = true
  }
  hide () {
    this.isDisplay = false
  }
  render (drawContext) {
    if(this.backgroundColor)  {
      drawContext.save()
      drawContext.fillStyle = this.backgroundColor;
      drawContext.fillRect( this.position.x , this.position.y,this.width, this.height);
      drawContext.restore()
    }
  
    if (!this.isDisplay) return
    if(this.icon){
      drawContext.drawImage(this.icon,
        this.position.x , this.position.y,
        this.width, this.height)
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
  }
  on (evnetName, callback) {
    context.myevent.eventRelative.attachEvent(this, evnetName, (obj, eventInfo)=>  {
      if (callback)  callback.call(this, eventInfo)
    })
  }
}

module.exports = EObject
