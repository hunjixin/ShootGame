import Particle from './Particle.js'
import Point from '../shape/Point'

class CircleParticle extends Particle {
  constructor (option) {
     this.shape = new Circle(new Point(0, 0), 1)
     super()
  }
}

export default CircleParticle
