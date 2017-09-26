define(['util','context'], function (util,context) {
  /**
   * 基类
   */
  function eShape () {
    this.isDisplay = true
    var that=this
    this.Oid = ++context.currentOid // id
    this.icon // 图片
    this.width = 0 // 宽度
    this.height = 0 // 高度
    this.speedY = 5 // Y速度
    this.speedX = 0 // X速度
    this.fixed={x:false,y:false}
    this.position = {x: 0,y: 0} // 位置
    this.base={}
    this.move =this.base.move= function () {
      that.moveY()
      that.moveX()
    }

    this._xpath
    this._ypath
    this.moveTick = 0
    this.moveX =this.base.moveX= function () {
      if(that.fixed.x) return
      if (that._xpath && that._xpath instanceof Function) {
        that.position.x += that._xpath()
      }else {
        that.position.x += that.speedX 
      } 
    }

    this.moveY = this.base.moveY=function () {
      if(that.fixed.y) return
      if (that._ypath && that._ypath instanceof Function) {
        that.position.y += that._ypath()
      }else {
        that.position.y += that.speedY 
      }
    }

    this.setXPath =this.base.setXPath= function (xpath) {
      that._xpath = xpath
    }
    this.setYPath =this.base.setYPath= function (ypath) {
      that._xpath = ypath
    }

    this.update=this.base.update=function(){
      that.move()
      that.moveTick++
    }

    this.show=this.base.show=function(){
      that.isDisplay=true
    }
    this.hide=this.base.hide=function(){
      that.isDisplay=false
    }

    this.on=function(evnetName,callback)
    {
      var that=this
      context.myevent.eventRelative.attachEvet(this, evnetName, function (obj, eventInfo) {
          if(callback)  callback.call(that,eventInfo)
      })
    }
  }
  return eShape
})
