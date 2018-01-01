import {ShapeVisitor,Rect,Circle,Point} from '../shape'

class StagePosTransfor extends ShapeVisitor {
    constructor (...args) {
      super(...args)
    }
    visitRect (shape) {
            return new Rect(
              shape.x - this.option.stage.gameWorldOffset.x,
              shape.y - this.option.stage.gameWorldOffset.y,
              shape.width,
              shape.height)
    }

    visitCircle (shape) {
        return  new Circle(new Point(
          shape.point.x - this.option.stage.gameWorldOffset.x,
          shape.point.y - this.option.stage.gameWorldOffset.y,
         ), shape.radius)
    }
  }
  
  module.exports = StagePosTransfor