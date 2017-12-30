import Point from '../shape/Point.js'
import Rect from '../shape/Rect.js'
import EObject from '../EObject.js'
import util from '../common/util.js'
import RectangleParticle from './RectangleParticle.js'
import Rect from '../shape/Rect.js'

class ParticleEmitter extends EObject {
  constructor () {
    super()
    this.maxParticle = 100

    this.type = ''

    this.speedX = 0
    this.speedY = 0
    this.maxSpeedX=-1
    this.maxSpeedY=-1

    this.accelateX = 0
    this.accelateY = 0

    this.life = 10
    this.lifeVariance = 0

    this.startSize = 0
    this.startSizeVariance = 0
    this.maxSize=-1

    this.emitAngle = 0
    this.emitAngleVariance = 0

    this.rotationStart = 0
    this.rotationStartVariance = 0

    this.rotationEnd = 0
    this.rotationEndVariance = 0
  }
  update () {
    this.checkParticleAlive()
    this.updateEachParticle()()

    if (this.children.length < this.maxParticle) {
      this.createNewParticle()
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
  createNewParticle () {
  }
}

export default ParticleEmitter
