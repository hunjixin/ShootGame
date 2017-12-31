import Particle from './Particle.js'
import {Point,Circle} from '../shape/'
class CircleParticle extends Particle {
  constructor (option) {
    super(option)
    this.shape=  new Circle(
      new Point(this.width,this.height),
      this.size
    )
  }
  setPlace(x,y){
    this.shape.x = x
    this.shape.y = y
  } 
  setSize() {
    this.shape.radius = this.size
  }
}

export default CircleParticle
module.exports = CircleParticle