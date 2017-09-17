define(['util', 'EObject', 'resource', 'shot'], function (util, EObject, resource, shotObj) {
  var createEnemy = function (_context, type) {
    // 1 大飞机  2,3,4 小飞机
    var enemy = new Enemy(_context, true)
    enemy.setShotInterVal(util.randInt(5, 15))
    enemy.Oid = ++_context.currentOid
    enemy.position.x = _context.option.ctxWidth * Math.random()
    enemy.position.y = 0 - enemy.width
    enemy.speedY = 5 * _context.option.enemy.speedFactor

    enemy.icon = resource.enes[type - 1]
    if (type == 1) {
      enemy.width = 40
      enemy.height = 60
      enemy.Hp = 20 + 10 * Math.random()
    }else {
      enemy.width = 20
      enemy.height = 30
      enemy.Hp = 2 + 5 * Math.random()
    }
    return enemy
  }

  function Plain (_context, enableShot) {
    EObject.call(this)

    this.AllHp = 1 // 总HP
    this.Hp = 1 // 当前Hp
    this.isDie = false // 是否死亡
    this.shotInterVal = 10 // 发射周期
    this.enableShot = enableShot // 是否发射
    this.shotor = new shotObj.ShotorFactory(_context)
    this.shots = []
    this.shotEx = 1
    var that = this
    var currentTick = 0
    this.setShotInterVal = function (val, minVal) {
      if (minVal < 1) minVal = 1
      if (val < minVal) val = minVal
      this.shotInterVal = val
    }
    this.refresh = function () {
      if (currentTick <= that.shotInterVal) {
        currentTick++
      }else {
        if (that.shots && that.shots.length > 0) return
        that.shots.push.apply(that.shots, that.shotFactory())
        currentTick = 0
      }
    }
    this.getShot = function () {
      if (this.shots && that.shots.length > 0) {
        var shotes = this.shots.concat([])
        this.shots.length = 0
        return shotes
      }else {
        return undefined
      }
    }
  }
  /**
   * 敌军
   * @param {*是否发射} isShot 
   */
  function Enemy (_context, isShot) {
    Plain.call(this, _context, isShot)
    this.type = 'common'
    this.speedX = 0
    this.shotType = {
      type: 'enemyShot',
      num: 1
    }
    this.shotFactory = function () {
      return this.shotor.CreateShot(this)
    }
  }

  /**
   * @param {*玩家} isShot 
   */
  function Player (_context) {
    Plain.call(this, _context, true)

    this.icon = resource.plainImg
    this.Oid = ++_context.currentOid
    this.width = 30
    this.height = 24
    this.AllHp = 3
    this.Hp = this.AllHp
    this.position.x = (_context.option.ctxWidth - this.width) / 2
    this.position.y = (_context.option.ctxHeight - this.height)
    this.enableShot = true
    this.speedY = -1
    this.shotType = {
      type: 'umShot',
      num: 1
    }
    this.shotFactory = function () {
      return this.shotor.CreateShot(this)
    }
    this.reset = function () {
      this.Hp = 3
      this.position.x = (_context.option.ctxWidth - 30) / 2
      this.position.y = (_context.option.ctxHeight - 24)
      this.shotType = {
        type: 'umShot',
        num: 1
      }
      this.setShotInterVal(5)
    }
  }
  return {
    createEnemy: createEnemy,
    Plain: Plain,
    Enemy: Enemy,
    Player: Player
  }
})
