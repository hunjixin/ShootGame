import Particle from './Particle.js'
import Point from '../shape/Point.js'

class RectangleParticle extends Particle {
  constructor (option) {
     super()
  } 
   update () {
    //position update
    var x=this.shape.x+this.speedX
    var y=this.shape.y+this.speedY

    //size update

    //speed update
    this.speedX=this.speedX+this.accelateX
    this.speedY=this.speedY+this.accelateY

    //rotate update
    this.rotation=this.rotation+this.rotationAccelate

  }
}

export default RectangleParticle
