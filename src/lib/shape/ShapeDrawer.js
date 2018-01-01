

import ShapeVisitor from './ShapeVisitor'

class ShapeDrawer extends ShapeVisitor {
    constructor (context,option) {
      super(option)
      this.context=context
    }
    lineRect (x, y, width, height, radius) {
      this.context.beginPath()
      this.context.moveTo(x, y + radius)
      this.context.lineTo(x, y + height - radius)
      this.context.quadraticCurveTo(x, y + height, x + radius, y + height)
      this.context.lineTo(x + width - radius, y + height)
      this.context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      this.context.lineTo(x + width, y + radius)
      this.context.quadraticCurveTo(x + width, y, x + width - radius, y)
      this.context.lineTo(x + radius, y)
      this.context.quadraticCurveTo(x, y, x, y + radius)
      this.context.closePath()
    }
    lineCircle(x,y,radius){
        this.context.beginPath()
        this.context.arc(x,y,radius,0,2*Math.PI)
        this.context.closePath()
    }
  }
  
  module.exports = ShapeDrawer