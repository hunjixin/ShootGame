define(['util', 'EObject', 'resource', 'shot'], function (util, EObject, resource, shotObj) {
  var createEnemy = function (_context, type) {
    // 1 大飞机  2,3,4 小飞机
    if (type == 1) {
      var enemy = new Enemy(_context, true)
      enemy.setShotInterVal(util.randInt(5, 15))
      enemy.Oid = ++_context.currentOid
      enemy.position.x = _context.option.ctxWidth * Math.random()
      enemy.position.y = 0 - enemy.width
      enemy.speedY = util.randInt(3,6)
  
      enemy.icon = resource.enes[type - 1]
      enemy.width = 40
      enemy.height = 60
      enemy.Hp = 20 + 10 * Math.random()
      return enemy
    }else if(type == 2||type ==3||type == 4) {
      var enemy = new Enemy(_context, true)
      enemy.setShotInterVal(util.randInt(5, 15))
      enemy.Oid = ++_context.currentOid
      enemy.position.x = _context.option.ctxWidth * Math.random()
      enemy.position.y = 0 - enemy.width
      enemy.speedY = util.randInt(3,6)
  
      enemy.icon = resource.enes[type - 1]
      enemy.width = 20
      enemy.height = 30
      enemy.Hp = 2 + 5 * Math.random()
      return enemy
    }else {
        return new Boss(_context);
    }
  
  }

  function Plain (_context, enableShot) {
    EObject.call(this)

    this.AllHp = 1 // 总HP
    this.Hp = 1 // 当前Hp
    this.isDie = false // 是否死亡
    this.shotInterVal = 10 // 发射周期
    this.enableShot = enableShot // 是否发射
    this.shotor = new shotObj.ShotorFactory(_context)
    this.shotSpeedFactor=1
    this.shots = []
    this.shotEx = 1
    var that = this
    var shotTick = 0
    
    this.setShotInterVal = function (val, minVal) {
      if (minVal < 1) minVal = 1
      if (val < minVal) val = minVal
      this.shotInterVal = val
    }
    this.refresh = function () {
      if (shotTick <= that.shotInterVal) {
        shotTick++
      }else {
        if (that.shots && that.shots.length > 0) return
        that.shots.push.apply(that.shots, that.shotFactory())
        shotTick = 0
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
    this.shotSpeedFactor=0.6
    this.shotType = {
      type: 'enemyShot',
      num: 1
    }
    this.shotFactory = function () {
      return this.shotor.CreateShot(this)
    }
  }
  function Boss(_context){
    Plain.call(this, _context, true)
    this.type = 'boss'
    this.setShotInterVal(util.randInt(10, 20))
    this.Oid = ++_context.currentOid
    this.width = _context.option.ctxWidth*0.6
    this.height = this.width*0.6
    this.position.x = _context.option.ctxWidth *0.5
    this.position.y = - this.height*3/4
    this.speedY=0
    this.icon = resource.enes[1]
    this.Hp = 200 + 200 * Math.random()
    this.shotSpeedFactor=0.1
    var factor = 5 * Math.random()
    this.setXPath(
      function (x) {
        return factor * (Math.cos(this.moveTick/15))
      }
    )

    this.shotType = {
      type: 'umShot',
      num: 4
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
      type: 'gzShot',
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
        type: 'gzShot',
        num: 1
      }
      this.setShotInterVal(5)
    }
  }
  return {
    createEnemy: createEnemy,
    Plain: Plain,
    Enemy: Enemy,
    Player: Player,
    Boss:Boss
  }
})
