import EObject from './EObject.js'
import util from '../util.js'
import resource from '../resource.js'
import context from '../context.js'

class Spoil extends EObject {
  constructor (obj, type) {
    super({})
    this.speedY = 3
    this.isDie=false
    this.spoiltype = type
    this.width = 25
    this.height = 25
    this.collisionArea = [{x: 0,y: 0,width: this.width,height: this.height}]
    this.position.x = obj.position.x
    this.position.y = obj.position.y
  }
  Effect(targetPlayer) {}
  update(){
    super.update()
  }
}
class UmShotSpoil extends Spoil {
  constructor (object) {
    super(object)
    this.spoiltype = 'umShot'
    this.icon = resource.u
  }
  Effect(targetPlayer) {
    if (targetPlayer.shotType.type == SpoilManager.spoilType.umShot) {
      if (targetPlayer.shotType.num > 7) {
        targetPlayer.shotEx++
      }else {
        targetPlayer.shotType.num++
      }
    }else {
      targetPlayer.shotType = {
        type: SpoilManager.spoilType.umShot,
        num: 1
      }
    }

    targetPlayer.setShotInterVal(2)
  }
}
class GzShotSpoil extends Spoil {
  constructor (object) {
    super(object)
    this.spoiltype = 'gzShot'
    this.icon = resource.g
  }
  Effect (targetPlayer) {
    if (targetPlayer.shotType.type == SpoilManager.spoilType.gzShot) {
      targetPlayer.shotType.num++
    }else {
      targetPlayer.shotType = {
        type: SpoilManager.spoilType.gzShot,
        num: 1
      }
    }
    targetPlayer.setShotInterVal(30 - 4 * targetPlayer.shotType.num, 2)
  }
}
class HpSpoil extends Spoil {
  constructor (object) {
    super(object)
    this.spoiltype = 'addHp'
    this.icon = resource.hp
  }
  Effect(targetPlayer) {
    if (targetPlayer.Hp < targetPlayer.AllHp) targetPlayer.Hp++
  }
}
class SpoilManager {
  constructor () {
    this.createSpoil = function (obj) {
      if (Math.random() < 0.5) return undefined
      var types = Object.values(SpoilManager.spoilType)
      var t = types[ (Math.random() * types.length).toString().charAt(0) - '0']
      var spoil
      switch (t) {
        case SpoilManager.spoilType.umShot:
          spoil = new UmShotSpoil(obj)
          break
        case SpoilManager.spoilType.gzShot:
          spoil = new GzShotSpoil(obj)
          break
        case SpoilManager.spoilType.addHp:
          spoil = new HpSpoil(obj)
          break
      }
      var factor = 5 * Math.random() * Math.sign(Math.random() - 0.5)
      spoil.setXPath(
        function (x) {
          return factor * (Math.cos(this.moveTick / 15) + Math.random() - 0.5)
        }
      )
      return spoil
    }
  }
}
SpoilManager.spoilType = {
  umShot: 'umShot',
  gzShot: 'gzShot',
  addHp: 'addHp'
}
module.exports = {
  Spoil,
SpoilManager}
