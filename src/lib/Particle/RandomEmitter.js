import ParticleEmitter from './ParticleEmitter.js'
import Rect from '../shape/Rect.js'
import util from '../common/util.js'
class RandomEmitter extends ParticleEmitter {
  constructor (option) {
    super(option)
    this.area=option.area
    this.children = []
  }

  createNewParticle () {
    var size = this.getSize()
    this.children.push(new RectangleParticle({
      shape: new Rect(
        this.area.width * util.randInt(0, 1),
        this.area.height * util.randInt(0, 1),
        size,
        size
      ),
      speedX: this.getParticleSpeedX(),
      speedY: this.getParticleSpeedY(),
      accelateX: this.particle.accelateX,
      accelateY: this.particle.accelateY,
      life: this.getLife(),
      size: size,
      angle: this.getAngle(),
      rotation: this.getRotation()
    }))
  }
}

export default RandomEmitter
