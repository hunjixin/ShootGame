import GameObject from '../../lib/GameObject.js'
import Rect from '../../lib/ui/shape/Rect.js'
class Spoil extends GameObject {
  constructor(obj, type) {
    super({})
    this.speedY = 3
    this.isDie = false
    this.spoiltype = type
    this.shape=new Rect(obj.shape.x,obj.shape.y,25,25)
  }
  Effect(targetPlayer) {}
  update() {
    super.update()
  }
}

export default Spoil
module.exports = Spoil