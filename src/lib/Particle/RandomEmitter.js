import ParticleEmitter from './ParticleEmitter.js'
import Rect from '../shape/Rect.js'

class RandomEmitter extends ParticleEmitter {
  constructor (option) {
    super(option)
    this.area = new Rect()
    this.children=[]
  }
  createNewParticle () {
    this.children.push(new RectangleParticle({
      shape: new Rect({
          
      })
    }))
  }
}



export default RandomEmitter
