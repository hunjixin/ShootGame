var Util = {
  isChonghe: function (rect1, rect2) {
    if (Util.inArea({x: rect1.x,y: rect1.y}, rect2)) return true
    if (Util.inArea({x: rect1.x + rect1.width,y: rect1.y}, rect2)) return true
    if (Util.inArea({x: rect1.x,y: rect1.y + rect1.height}, rect2)) return true
    if (Util.inArea({x: rect1.x + rect1,y: rect1 + rect1.height.y}, rect2)) return true

    if (Util.inArea({x: rect2.x,y: rect2.y}, rect1)) return true
    if (Util.inArea({x: rect2.x + rect2.width,y: rect2.y}, rect1)) return true
    if (Util.inArea({x: rect2.x,y: rect2.y + rect2.height}, rect1)) return true
    if (Util.inArea({x: rect2.x + rect2,y: rect2 + rect2.height.y}, rect1)) return true

    return false
  },
  inArea: function (position, rect) {
    if (position.x >= rect.x && position.x <= rect.x + rect.width) {
      if (position.y >= rect.y && position.y <= rect.y + rect.height) {
        return true
      }
    }
    return false
  },
  isEffect: function (plain, action , eventInfo) {
    var pos = {x: eventInfo.position.x,y: eventInfo.position.y}
    var absolutePosition = plain.getPositionAbsolute?plain.getPositionAbsolute():plain.position
    var rect = {
      x: absolutePosition.x,
      y: absolutePosition.y,
      width: plain.width,
      height: plain.height
    }
    return Util.inArea(pos, rect)
  },
  removeArr: function (arr, val) {
    var index = arr.indexOf(val)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  sceneYTransform: function (y, option, headOffset) {
    return (y - headOffset) / (option.ctxHeight - headOffset) * option.ctxHeight
  },
  isAndroid: function () {
    if ( (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return true
    }else {
      return false
    }
  },
  randInt: function (min, max) {
    if (min > max) return max
    return parseInt(Math.random() * (max - min)) + min
  },
  drawEobject: function (context, eobj, rotateValue) {
    context.drawImage(eobj.icon,
      eobj.position.x , eobj.position.y,
      eobj.width, eobj.height)
  }
}

define(function () {
  // Do setup work here
  return Util
})
