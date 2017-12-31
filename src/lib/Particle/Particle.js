import GameObject from '../GameObject.js'
class Particle extends GameObject {

  constructor (option) {
    super(option)

    this.active = true
    this.isDie = false
    // life
    this.life = 10

    // size
    this.size = 0
    this.sizeOffset=0
    this.sizeVariance=0
    this.maxSize = -1

    // rotate
    this.rotate = 0
    this.rotateOffset=0

    // speed
    this.speedX = 0
    this.speedY = 0

    // accelate
    this.accelateX = 0
    this.accelateY = 0
    Object.assign(this, option)
  }

   update () {
    // position update
    var x = this.shape.x + this.speedX
    var y = this.shape.y + this.speedY
    this.setPlace(x,y)
    // size update
    this.size=this.getNextSize ()
    if(this.size){
      this.setSize()
    }

    // speed update
    this.speedX = this.speedX + this.accelateX
    this.speedY = this.speedY + this.accelateY

    // rotate update
    this.rotate=this.getNextRotate ()
  }
  setPlace(){ }
  setSize() {}
  getNextSize () {
    var size= this.size +this.sizeOffset+this.sizeVariance*(2 * Math.random() - 1)
    if(size<=0){
      this.emitter.killParticle(this)
    }else{
      return size
    }
  }
  getNextRotate () {
    return this.rotate + (this.rotateVariance * (2 * Math.random() - 1))
  }
  render (drawContext, shape) {
    super.render(drawContext, shape)
  }
}

export default Particle
module.exports = Particle