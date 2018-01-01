import ShapeDrawer from './ShapeDrawer'

class FillDrawer extends ShapeDrawer {
    constructor (...args) {
      super(...args)
    }
    visitRect (shape) {
      this.context.save()
      this.lineRect(shape.x, shape.y, shape.width + 1, shape.height + 1, 0)
      this.context.fillStyle = this.option.color
      this.context.fill()
      this.context.restore()
    }
    visitCircle (shape) {
      this.context.save()
      this.lineCircle(shape.point.x,shape.point.y,shape.radius)
      this.context.fillStyle = this.option.color
      this.context.fill()
      this.context.restore()
    }
  }

  module.exports = FillDrawer