import EObject from '../EObject.js'
import util from '../common/util.js'
import lodash from 'lodash'
class ParticleEmitter extends EObject {
  constructor (option) {
    super({})
    // emit count 
    this.emitCount = 5,
    this.emitTick = 1,

    this.maxParticle = 100

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
      sizeOffset: 0,
      sizeVariance: 0,

      angle: 0,
      angleVariance: 0,

      rotate: 0,
      rotateVariance: 0,
      rotateOffset: 0
    }
    lodash.merge(this, option)
    
    setTimeout(() => {
      this.checkParticle()
    }, 50);
  }
  createNewParticle () {
    var size = this.getSize()
    this.children.push(new this.type({
      emitter: this,

      opacity: 0.2,
      life: this.getLife(),
      backgroundColor: this.particle.backgroundColor,
      icon: this.particle.icon,

      size: size,
      sizeOffset: this.particle.sizeOffset,
      sizeVariance: this.particle.sizeVariance,

      width: this.area.width * Math.random(),
      height: this.area.height * Math.random(),

      speedX: this.getParticleSpeedX(),
      speedY: this.getParticleSpeedY(),

      accelateX: this.particle.accelateX,
      accelateY: this.particle.accelateY,

      speedXOffset: this.particle.speedXOffset,
      speedYOffset: this.particle.speedYOffset,

      angle: this.getAngle(),
      rotate: this.getRotate(),
      rotateOffset: this.particle.rotateOffset
    }))
  }
  update () {
    this.checkParticleAlive()
    this.updateEachParticle()

    for (let i = 0; i < this.emitCount; i++) {
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
  getParticleSpeedX () {
    return this.particle.speedX + (this.particle.speedXVariance * (2 * Math.random() - 1))
  }
  getParticleSpeedY () {
    return this.particle.speedY + (this.particle.speedYVariance * (2 * Math.random() - 1))
  }
  getLife () {
    return this.particle.life + (this.particle.lifeVariance * (2 * Math.random() - 1))
  }
  getSize () {
    return this.particle.startSize + (this.particle.startSizeVariance * (2 * Math.random() - 1))
  }
  getAngle () {
    return this.particle.rotate + (this.particle.rotateVariance * (2 * Math.random() - 1))
  }
  getRotate () {
    return this.particle.rotate + (this.particle.rotateVariance * (2 * Math.random() - 1))
  }
  killParticle (particle) {
    particle.isDie = true
    util.removeArr(this.children, particle)
  }
  checkParticle () {
    var now = new Date()
    for (let i = this.children.length - 1; i > -1; i--) {
      const element = array[i]
    }
    lodash.remove(this.children, element => {
      if (now - element.startTime > element.life) {
        element.isDie = true
        return true
      }
      return false
    })
  }
  render (a, b) {
    super.render(a, b)
  }
}

export default ParticleEmitter
module.exports = ParticleEmitter
