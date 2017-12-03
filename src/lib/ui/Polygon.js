import Point from './Point.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class Polygon {
  constructor (points) {
    this.points = points
  }
  stroke (ctx,color) {
    ctx.save()

    this.drawShape(ctx)
    if(color){
        ctx.strokeStyle = color 
    }
    ctx.stroke()
    ctx.restore()
  }
  fill(ctx,color){
    ctx.save()

    this.drawShape(ctx)
    if(color){
        ctx.fillStyle = color 
    }
    ctx.fill()

    ctx.restore()
  }
  drawShape (ctx) {
    ctx.beginPath()
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i]
      var nextPoints = this.points[i + 1]
      if (nextPoints) {
      //  ctx.moveTo(point.x, point.y)
        ctx.lineTo(nextPoints.x, nextPoints.y)
      }else {
       // ctx.moveTo(point.x, point.y)
        ctx.lineTo(this.points[0].x, this.points[0].y)
        break
      }
    }
    ctx.closePath()
  }
}


module.exports = Polygon
