import Point from '../shape/Point.js'
import ParticleEmitter from './ParticleEmitter.js'

class PointEmitter extends ParticleEmitter {
  constructor (option) {
    super(option)
    this.point = new Point(0, 0)
  }
}

export default PointEmitter
