var util = {
  // 两个四边型是否重叠
  isChonghe: function (rect1, rect2) {
    if (util.inArea({
        x: rect1.x,
        y: rect1.y
      }, rect2)) return true
    if (util.inArea({
        x: rect1.x + rect1.width,
        y: rect1.y
      }, rect2)) return true
    if (util.inArea({
        x: rect1.x,
        y: rect1.y + rect1.height
      }, rect2)) return true
    if (util.inArea({
        x: rect1.x + rect1,
        y: rect1 + rect1.height.y
      }, rect2)) return true

    if (util.inArea({
        x: rect2.x,
        y: rect2.y
      }, rect1)) return true
    if (util.inArea({
        x: rect2.x + rect2.width,
        y: rect2.y
      }, rect1)) return true
    if (util.inArea({
        x: rect2.x,
        y: rect2.y + rect2.height
      }, rect1)) return true
    if (util.inArea({
        x: rect2.x + rect2,
        y: rect2 + rect2.height.y
      }, rect1)) return true

    return false
  },
  isRecAndTrigOverlap: function (rect, trig) {},
  // 两个三角行是否重叠
  isAngleOverlap: function (area1, area2) {
    // 是否交点
    /* for (var i = 0;i < 2;i++) {
       var line1 = [ area1[i], area1[i + 1]]
       for (var j = 0;j < 3;j++) {
         var line2 = [area2[j], area2[(j + 1) == 3 ? 0 : (j + 1)]]
         if (util.segmentsIntr(line1, line2)) {
           return true
         }
       }
     }*/
    // 是否包含
    for (var i = 0; i < 3; i++) {
      if (util.pointInTriangle(area2, area1[i])) {
        return true
      }
    }

    for (var i = 0; i < 3; i++) {
      if (util.pointInTriangle(area1, area2[i])) {
        return true
      }
    }

    return false
  },
  // 直线是否相交
  segmentsIntr: function (line1, line2) {
    var a = line1[0]
    var b = line2[1]

    var c = line2[0]
    var d = line3[1]
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交  
    var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y)
    if (denominator == 0) {
      return false
    }

    // 线段所在直线的交点坐标 (x , y)      
    var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) +
      (b.y - a.y) * (d.x - c.x) * a.x -
      (d.y - c.y) * (b.x - a.x) * c.x) / denominator
    var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) +
      (b.x - a.x) * (d.y - c.y) * a.y -
      (d.x - c.x) * (b.y - a.y) * c.y) / denominator

    /** 2 判断交点是否在两条线段上 **/
    if (
      // 交点在线段1上  
      (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0
      // 且交点也在线段2上  
      &&
      (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0
    ) {

      // 返回交点p  
      return {
        x: x,
        y: y
      }
    }
    // 否则不相交  
    return false
  },
  // 点是否再三角形内
  pointInTriangle: function (triangle, point1) {
    x0 = triangle[0].x
    y0 = triangle[0].y
    x1 = triangle[1].x
    y1 = triangle[1].y
    x2 = triangle[2].x
    y2 = triangle[2].y

    x3 = point1.x
    y3 = point1.y

    var divisor = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)
    var a = ((y2 - y3) * (x0 - x3) + (x3 - x2) * (y0 - y3)) / divisor
    var b = ((y3 - y1) * (x0 - x3) + (x1 - x3) * (y0 - y3)) / divisor
    var c = 1 - a - b

    return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1
  },
  // 点是否再四变形内
  inArea: function (position, rect) {
    if (position.x >= rect.x && position.x <= rect.x + rect.width) {
      if (position.y >= rect.y && position.y <= rect.y + rect.height) {
        return true
      }
    }
    return false
  },
  isEffect: function (stage,plain, action, eventInfo) {
    var pos = {
      x: eventInfo.position.x,
      y: eventInfo.position.y
    }
    var absolutePosition = plain.getPositionAbsolute ? plain.getPositionAbsolute(stage) : plain.position
    var rect = {
      x: absolutePosition.x,
      y: absolutePosition.y,
      width: plain.width,
      height: plain.height
    }
    return util.inArea(pos, rect)
  },
  removeArr: function (arr, val) {
    var index = arr.indexOf(val)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },

  isAndroid: function () {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return true
    } else {
      return false
    }
  },
  isElectron: function () {
    if ((navigator.userAgent.match(/(Electron)/i))) {
      return true
    } else {
      return false
    }
  },
  randInt: function (min, max) {
    if (min > max) return max
    return parseInt(Math.random() * (max - min)) + min
  },
  delayCall:function(func,time,...args){
      setTimeout(() => {
        func.apply(null,args)
      }, time);
  }
}

// Do setup work here
export default util