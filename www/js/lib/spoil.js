define(['util', 'eShape', 'resource'], function (util, eShape, resource) {
  function Spoil (obj, type) {
    eShape.call(this)
    this.speedY = 3
    this.spoiltype = type
    this.width = 25
    this.height = 25
    this.position.x = obj.position.x
    this.position.y = obj.position.y
    this.Effect = function (targetPlayer) {}
  }
  function UmShotSpoil (object) {
    Spoil.call(this, object)
    this.spoiltype = 'umShot'
    this.icon = resource.u
    this.Effect = function (targetPlayer) {
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

      targetPlayer.setShotInterVal(4)
    }
  }
  function GzShotSpoil (object) {
    Spoil.call(this, object)
    this.spoiltype = 'gzShot'
    this.icon = resource.g
    this.Effect = function (targetPlayer) {
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
  function HpSpoil (object) {
    Spoil.call(this, object)
    this.spoiltype = 'addHp'
    this.icon = resource.hp
    this.Effect = function (targetPlayer) {
      if (targetPlayer.Hp < targetPlayer.AllHp) targetPlayer.Hp++
    }
  }
  function SpoilManager () {
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
          return factor * (Math.cos(this.moveTick/15)+Math.random()-0.5)
        }
      )
      return spoil
    }
  }
  SpoilManager.spoilType = {
    umShot: 'umShot',
    gzShot: 'gzShot',
    addHp: 'addHp'
  }
  return {
    Spoil: Spoil,
    SpoilManager: SpoilManager
  }
})
