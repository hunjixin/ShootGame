import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Polygon from './shape/Polygon.js'
import Point from './shape/Point.js'
class CheckBox extends Control {
  constructor(option) {
    if (!option.event) option.event = {}
    option.event.click = function () {
      this.isCheck = !this.isCheck
    }
    super(option)
    this.isCheck = option.isCheck
    this.borderSize = 1

  }
  render(drawContext) {
    this.points = []
    this.points.push(new Point(this.position.x, this.position.y + this.height * 1 / 3))
    this.points.push(new Point(this.position.x + this.width / 3, this.position.y + this.height))
    this.points.push(new Point(this.position.x + this.width, this.position.y))
    this.points.push(new Point(this.position.x + this.width / 3, this.position.y + this.height * 2 / 3))
    var tickShape = new Polygon(this.points)
    super.render(drawContext)
    if (this.isCheck) {
      tickShape.fill(drawContext, 'black')
    }
  }
}


module.exports = CheckBox