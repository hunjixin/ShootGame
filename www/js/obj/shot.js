define(['util', 'EObject', 'resource','context'], function (util, EObject, resource,context) {
  var shotTypes=['umShot','gzShot','common']
  function ShotorFactory () {
    this.CreateShot = function (ePlayer) {
      // ePlayer.shots.
      if (ePlayer.shotType.type == 'umShot') return umbrellaShot(ePlayer, ePlayer.shotType.num)
      else if (ePlayer.shotType.type == 'gzShot') return gzShot(ePlayer, ePlayer.shotType.num)
      else if (ePlayer.shotType.type == 'common') return commonShot(ePlayer)
      else if (ePlayer.shotType.type == 'enemyShot') return enemyShot(ePlayer)
    }
    var umbrellaShot = function (ePlayer, num) {
      var spy=ePlayer.speedY===0?1:ePlayer.speedY
      var split
      var sp = 10 * ePlayer.shotSpeedFactor*Math.sign(spy)*Math.abs(spy)
      if (2 * num - 1 < 15)
        split = 2 * num - 1
      else
        split = 15
      var rotate = Math.PI / (split + 1)
      var shots = []
      for (var i = 1;i <= split;i++) {
        var shot = new Shot()
        shot.belong = ePlayer.Oid
        shot.Hp = 1
        shot.width = 5
        shot.height = 15
        shot.icon = resource.shot
        shot.position.x = ePlayer.position.x + ePlayer.width / 2 - shot.width / 2
        shot.position.y = ePlayer.position.y+ePlayer.height-15

        shot.speedY = sp * Math.sin(rotate * i)
        shot.speedX = sp * Math.cos(rotate * i)
        shots.push(shot)
      }
      return shots
    }
    var gzShot = function (ePlayer) {
      var spy=ePlayer.speedY===0?1:ePlayer.speedY
      var sp = 10 *  ePlayer.shotSpeedFactor*Math.sign(spy)*Math.abs(spy)*Math.sign(spy)
      var shot = new Shot()
      shot.belong = ePlayer.Oid
      shot.Hp = 100000000
      shot.width = 100
      shot.height = context.stage.height
      shot.icon = resource.gz
      shot.position.x = ePlayer.position.x + ePlayer.width / 2 - shot.width / 2
      shot.position.y = 0

      shot.speedY = 0
      shot.speedX = 0
      var shotCount = 100
      var tm
      // 1秒后威力减弱
      setTimeout(function () {
        var span = shot.width / 5
        tm = setInterval(function () {
          if (context.isRunning == 1) {
            shot.width = shot.width - span
            shot.position.x = shot.position.x + span / 2
          }
        }, 100)
      }, 1000)
      // 1.5秒后消失
      setTimeout(function () {
        shot.position.y = context.stage.height
        shot.isDie = true
        clearTimeout(tm)
      }, 1500)
      return [shot]
    }
    var commonShot = function (ePlayer) {
      var spy=ePlayer.speedY===0?1:ePlayer.speedY
      var sp = 10 *  ePlayer.shotSpeedFactor*Math.sign(spy)*Math.abs(spy)
      var shot = new Shot()
      shot.belong = ePlayer.Oid
      shot.Hp = 1
      shot.width = 8
      shot.height = 24
      shot.speedY = sp
      shot.icon = resource.shot
      shot.position.x = ePlayer.position.x + ePlayer.width / 2 - shot.width / 2
     

      return [shot]
    }
    var enemyShot = function (enemy) {
      var shot = new Shot()
      shot.belong = enemy.Oid
      shot.Hp = 1
      shot.width = 5
      shot.height = 15
      shot.icon = resource.eshot
      shot.speedY = (Math.abs(enemy.speedY) + 8) *Math.sign(enemy.speedY)
      shot.position.x = enemy.position.x + enemy.width / 2 - shot.width / 2
      shot.position.y = enemy.position.y+enemy.height-15
      return [shot]
    }
  }
  /**
       * 爆炸
       */
  function Bullet () {
    EObject.call(this)
  }
  /**
   * 子弹
   */
  function Shot () {
    EObject.call(this)

    this.speedX = 0
    this.type = 'common'
    this.attack = 1 // 攻击力
    belong = 0
  }
  return {
    shotTypes:shotTypes,
    ShotorFactory: ShotorFactory,
    Bullet: Bullet,
    Shot: Shot
  }
})
