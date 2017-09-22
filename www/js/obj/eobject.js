define(['util'], function (util) {
  /**
   * 基类
   */
  function EObject () {
    this.isDisplay = true
    this.Oid = -1 // id
    this.icon // 图片
    this.width = 0 // 宽度
    this.height = 0 // 高度
    this.speedY = 5 // Y速度
    this.speedX = 0 // X速度
    this.position = {x: 0,y: 0} // 位置

    this.move = function () {
      this.moveY()
      this.moveX()
    }

    this._xpath
    this._ypath
    this.moveTick = 0
    this.moveX = function () {
      if (this._xpath && this._xpath instanceof Function) {
          this.position.x += this._xpath()
      }else {
        this.position.x += this.speedX 
      } 
    }

    this.moveY = function () {
      if (this._ypath && this._ypath instanceof Function) {
               this.position.y += this._ypath()
      }else {
        this.position.y += this.speedY 
      }
    }

    this.setXPath = function (xpath) {
      this._xpath = xpath
    }
    this.setYPath = function (ypath) {
      this._xpath = ypath
    }

    this.update=function(){
      this.move()
      this.moveTick++
    }

    this.show=function(){
      this.isDisplay=true
    }
    this.hide=function(){
      this.isDisplay=false
    }
  }
  return EObject
})
