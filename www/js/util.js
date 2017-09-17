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
      var rect = {
        x: plain.position.x,
        y: plain.position.y,
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
    sceneYTransform: function (y,option,headOffset) {
      return (y - headOffset) / (option.ctxHeight - headOffset) * option.ctxHeight
    },
    isAndroid: function () {
      var u = navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    },

  }

  define(function () {
    //Do setup work here
    return Util;
});
