import Particle from './Particle.js'
import {Point,Rect} from '../shape/'

class RectangleParticle extends Particle {
  constructor (option) {
    super(option)
    this.shape= new Rect(
      this.width,
      this.height,
      this.size,
      this.size
    )
  }
  setPlace(x,y){
    this.shape.x = x
    this.shape.y = y
  } 
  setSize() {
    this.shape.width = this.size
    this.shape.height = this.size
  }
}

export default RectangleParticle
module.exports = RectangleParticle