import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Polygon from '../shape/Polygon.js'
import Point from '../shape/Point.js'
class CheckBox extends Control {
  constructor (option) {
    if (!option.event) option.event = {}
    super(option)
    this.on('click',()=>{
      this.isCheck = !this.isCheck
      if(this.onChange){
        this.onChange(this.isCheck)
      }
    })
    this.isCheck = option.isCheck
    this.borderSize = 1
  }
  render (drawContext) {
    this.points = []
    this.points.push(new Point(this.shape.x, this.shape.y + this.shape.height * 1 / 3))
    this.points.push(new Point(this.shape.x + this.shape.width / 3, this.shape.y + this.shape.height))
    this.points.push(new Point(this.shape.x + this.shape.width, this.shape.y))
    this.points.push(new Point(this.shape.x + this.shape.width / 3, this.shape.y + this.shape.height * 2 / 3))
    var tickShape = new Polygon(this.points)
    super.render(drawContext)
    if (this.isCheck) {
      tickShape.fill(drawContext, 'black')
    }
  }
}

module.exports = CheckBox
