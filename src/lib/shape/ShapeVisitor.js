import Circle from './Circle.js'
import CornerRect from './CornerRect.js'
import Point from './Point.js'
import Polygon from './Polygon.js'
import Rect from './Rect.js'

class ShapeVisitor {
  constructor (option) {
    this.option = option
  }
  visitShape (shape) {
    if (shape instanceof Circle) {
      return this.visitCircle(shape)
    }
    else if (shape instanceof Rect) {
      return this.visitRect(shape)
    }else {
    }
  }
  visitRect (shape) {}
  visitCircle (shape) {}
}

module.exports = ShapeVisitor
