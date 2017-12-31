class Circle {
    constructor(point, radius) {
        this.point=point
        this.radius=radius
    }
    getCenter(){
      return  this.point
    }
    getPosition(){
      return  this.point
    }
    getArea(){
       return new Rect(
         this.point.x-this.radius,
         this.point.y-this.radius,
         this.radius,
         this.radius,
       ) 
    }
  }
  
  
  module.exports = Circle