import {ShapeVisitor,Rect,Circle,Point} from '../shape'

class StageAbsTransfor extends ShapeVisitor {
    constructor (...args) {
      super(...args)
    }
    visitRect (shape) {
       return new Rect(
            (shape.x - this.option.stage.gameWorldOffset.x) * this.option.stage.gameWorldOffset.scaleX + this.option.stage.shape.x,
            (shape.y - this.option.stage.gameWorldOffset.y) * this.option.stage.gameWorldOffset.scaleY + this.option.stage.shape.y,
            shape.width,
            shape.height)
    }
    visitCircle (shape) {
       return  new Circle(new Point(
            (shape.x - this.option.stage.gameWorldOffset.x) * this.option.stage.gameWorldOffset.scaleX + this.option.stage.shape.x,
            (shape.y - this.option.stage.gameWorldOffset.y) * this.option.stage.gameWorldOffset.scaleY + this.option.stage.shape.y,
         ), shape.radius)
    }
  }
  
  module.exports = StageAbsTransfor