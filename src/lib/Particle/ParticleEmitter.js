import Point from '../shape/Point.js'
import Rect from '../shape/Rect.js'
import EObject from '../EObject.js'
import util from '../common/util.js'
import RectangleParticle from './RectangleParticle.js'

class ParticleEmitter extends EObject {
  constructor () {
    super()
    // emit count 
    this.emitCount = 10,
    this.emitTick = 1,

    this.maxParticle = 100
    this.type = ''

    this.particle = {
      speedX: 0,
      speedXVariance: 0,
      speedY: 0,
      speedYVariance: 0,
      accelateX: 0,
      accelateY: 0,
      maxSpeedX: 0,
      maxSpeedY: 0,

      life: 0,
      lifeVariance: 0,

      startSize: 0,
      startSizeVariance: 0,

      angle: 0,
      angleVariance: 0,

      rotation: 0,
      rotationVariance: 0
    }
  }
  update () {
    this.checkParticleAlive()
    this.updateEachParticle()()

    for (let i = 0; i < this.emitCount.length; i++) {
      if (this.children.length < this.maxParticle) {
        this.createNewParticle()
      }else {
        break
      }
    }
  }
  checkParticleAlive () {
    for (let i = this.children.length - 1; i > -1; i--) {
      const particle = this.children[i]
      if (particle.isDie)
        util.removeArr(this.children, particle)
    }
  }
  updateEachParticle () {
    this.children.forEach(a => {
      a.update()
    })
  }
  createNewParticle () {}
  getParticleSpeedX () {
    return this.particle.speedX + (this.particle.speedXVariance * (2 * util.randInt(0, 1) - 1))
  }
  getParticleSpeedY () {
    return this.particle.speedY + (this.particle.speedYVariance * (2 * util.randInt(0, 1) - 1))
  }
  getLife () {
    return this.particle.life + (this.particle.lifeVariance * (2 * util.randInt(0, 1) - 1))
  }
  getSize () {
    return this.particle.startSize + (this.particle.startSizeVariance * (2 * util.randInt(0, 1) - 1))
  }
  getAngle () {
    return this.particle.rotation + (this.particle.rotationVariance * (2 * util.randInt(0, 1) - 1))
  }
  getRotation () {
    return this.particle.rotation + (this.particle.rotationVariance * (2 * util.randInt(0, 1) - 1))
  }
}

export default ParticleEmitter
