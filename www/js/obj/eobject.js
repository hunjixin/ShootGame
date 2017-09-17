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
  }
    return EObject
  })
  