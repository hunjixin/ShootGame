import GameObject from '../lib/GameObject.js'
import context from '../lib/common/context.js'
import {ShotorFactory} from './shot/'

class BasePlain extends GameObject {
  constructor(option) {
    super()
    this.borderColor = null
    this.enableShot=false
    this.AllHp = 1 // 总HP
    this.hp = 1 // 当前Hp
    this.isDie = false // 是否死亡
    this.shotInterVal = 10 // 发射周期
    this.shotor = new ShotorFactory(option.gameWorld)
    this.shotSpeedFactor = 1
    this.shots = []
    this.shotEx = 1
    this.shotTick = 0

    Object.assign(this,option)
  }
  setShotInterVal(val, minVal) {
    if (minVal < 1) minVal = 1
    if (val < minVal) val = minVal
    this.shotInterVal = val
  }

  update() {
    super.update()
    if (this.shotTick <= this.shotInterVal) {
      this.shotTick++
    } else {
      if (this.shots && this.shots.length > 0) return
      this.shots.push.apply(this.shots, this.shotFactory())
      this.shotTick = 0
    }
  }
  getShot() {
    if (this.shots && this.shots.length > 0) {
      var shotes = this.shots.concat([])
      this.shots.length = 0
      return shotes
    } else {
      return undefined
    }
  }
  shotFactory(){
   return this.enableShot
  }
}

export default BasePlain
module.exports = BasePlain