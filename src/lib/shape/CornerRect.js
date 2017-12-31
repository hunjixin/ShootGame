class CornerRect {
    constructor(x, y,width,height,radius) {
      this.x = x
      this.y = y
      this.width=width
      this.height=height
      this.radius=radius?radius:0
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
       return new Rect(
        this.x,
        this.y,
        this.width,
        this.height,
       ) 
    }
  }
  
  
  module.exports = CornerRect