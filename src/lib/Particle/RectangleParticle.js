import Particle from './Particle.js'
import Rect from '../shape/Rect.js'

class RectangleParticle extends Particle {
  constructor (option) {
     this.shape = new Rect(0,0,0,0)
     super()
  }
}

export default RectangleParticle
