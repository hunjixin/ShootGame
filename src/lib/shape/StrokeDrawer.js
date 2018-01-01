import ShapeDrawer from './ShapeDrawer'

class StrokeDrawer extends ShapeDrawer {
    constructor (...args) {
      super(...args)
    }
    visitRect (shape) {
      this.context.save()
      this.lineRect(shape.x - 1, shape.y - 1, shape.width + 1, shape.height + 1, 0)
      this.context.strokeStyle = this.option.color
      this.context.stroke()
      this.context.restore()
    }
    visitCircle (shape) {
      this.context.save()
      this.context.lineCircle(shape.point.x,shape.point.y,shape.radius)
      this.context.strokeStyle = this.option.color
      this.context.stroke()
      this.context.restore()
    }
  }

  module.exports = StrokeDrawer