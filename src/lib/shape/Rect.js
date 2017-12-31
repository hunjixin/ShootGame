import Point from './Point.js'
class Rect {
    constructor(x, y,width,height) {
      this.x = x
      this.y = y
      this.width=width
      this.height=height
    }
    getCenter(){
      return new Point(
        (this.x+this.width)/2,
        (this.y+this.height)/2
      )
    }
    getPosition(){
      return new Point(this.x,this.y)
    }   
    getArea(){
      return this
   }
  }
  
  
  module.exports = Rect