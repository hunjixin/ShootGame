import ParticleEmitter from './ParticleEmitter.js'
import Rect from '../shape/Rect.js'
import util from '../common/util.js'
import RectangleParticle from './RectangleParticle.js'
class RandomEmitter extends ParticleEmitter {
  constructor (option) {
    super(option)
    this.area = option.area
    this.children = []
  }
}

export default RandomEmitter
module.exports = RandomEmitter
