import Point from '../shape/Point.js'
import Circle from '../shape/Circle.js'
import EObject from '../EObject.js'
class Particle {
  constructor (option) {
    this.active = true

    // life
    this.life = 10
    this.lifeVariance = 0

    // size
    this.startSize = 0
    this.startSizeVariance = 0
    this.maxSize = -1

    // rotate
    this.rotation = 0
    this.rotationAccelate = 0

    // speed
    this.speedX = 0
    this.speedY = 0
    this.maxSpeedX = -1
    this.maxSpeeddY = -1

    // accelate
    this.accelateX = 0
    this.accelateY = 0
    Object.assign(this,option)
  }
  update () {

  }
  render (drawContext, shape) {}
}

export default Particle
