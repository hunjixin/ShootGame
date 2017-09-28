define(function (require, exports, module) {
  var util = require('util')
  var context = require('context')
  var lodash = require('lodash')
  /**
   * 基类
   */
  function eShape (option) {
    this.isDisplay = true
    var that = this
    this.Oid = ++context.currentOid // id
    this.icon // 图片
    this.name = ''
    this.width = 0 // 宽度
    this.height = 0 // 高度
    this.speedY = 5 // Y速度
    this.speedX = 0 // X速度
    this.fixed = {x: false,y: false}
    this.position = {x: 0,y: 0} // 位置
    this.collisionArea = []
    this.base = {}
    this.move = this.base.move = function () {
      that.moveY()
      that.moveX()
    }
    lodash.merge(this, option)
    this._xpath
    this._ypath
    this.moveTick = 0
    this.moveX = this.base.moveX = function () {
      if (that.fixed.x) return
      if (that._xpath && that._xpath instanceof Function) {
        that.position.x += that._xpath()
      }else {
        that.position.x += that.speedX
      }
    }
    this.moveY = this.base.moveY = function () {
      if (that.fixed.y) return
      if (that._ypath && that._ypath instanceof Function) {
        that.position.y += that._ypath()
      }else {
        that.position.y += that.speedY
      }
    }
    this.getAbsoluteCollisionArea = function () {
      var that = this
      return lodash.map(this.collisionArea, function (area) {
        return {
          x: that.position.x + area.x,
          y: that.position.y + area.y,
          width: area.width,
          height: area.height
        }
      })
    }
    this.setXPath = this.base.setXPath = function (xpath) {
      that._xpath = xpath
    }
    this.setYPath = this.base.setYPath = function (ypath) {
      that._xpath = ypath
    }

    this.update = this.base.update = function () {
      that.move()
      that.moveTick++
    }

    this.show = this.base.show = function () {
      that.isDisplay = true
    }
    this.hide = this.base.hide = function () {
      that.isDisplay = false
    }
    this.render = function (drawContext) {
      if (!this.isDisplay) return
      drawContext.drawImage(this.icon,
        this.position.x , this.position.y,
        this.width, this.height)
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
          drawContext.stroke()
        }
      }
    }
    this.on = function (evnetName, callback) {
      var that = this
      context.myevent.eventRelative.attachEvent(this, evnetName, function (obj, eventInfo) {
        if (callback)  callback.call(that, eventInfo)
      })
    }
  }

  return eShape
})
