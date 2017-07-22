function Engine () {
  var currentOid = 0
  var isRunning = 0 // 三种状态 1 预备/2 进行 /3 结束
  var option = {
    isDebug: true,
    'id': '',
    enemy: {
      speedFactor: 0.8,
      shotSpeedFactor: -0.6,
      shotInterVal: 1000
    },
    playerShotSpeedFactor: 1,
    isAndroid: false,
    resources: {
      button: '',
      plainImg: '',
      shot: '',
      bullet: '',
      bg: '',
      eshot: '',
      hp: '',
      head: '',
      enes: '',
      gz: '',
      u: '',
      g: ''
    }
  }
  var scene
  var resetButton
  var shots = []
  var enemies = []
  var bullets = []
  var spoils = []
  var headOffset = 20
  var player
  var context = ''
  var spoilManager = new SpoilManager()
  var plainMoveState = {
    isMouseDown: false,
    position: {x: 0,y: 0}
  }
  var statInfo = {
    debugMsg: '',
    kill: {
      common: 0
    },
    allEnemy: 0,
    currentShotNum: 0,
    currentEnemyNum: 0,
    emitShot: {
      common: 0
    },
    getDebugArray: function () {
      var arr = []
      arr.push('杀敌总数量：' + this.kill.common + '\r\n')
      arr.push('敌人总数：' + this.allEnemy + '\r\n')
      arr.push('击杀比：' + this.kill.common / this.allEnemy + '\r\n')

      arr.push('发射弹药总量：' + this.emitShot.common + '\r\n')
      arr.push('命中比：' + this.kill.common / this.emitShot.common + '\r\n')

      arr.push('子弹数量：' + this.currentShotNum + '\r\n')
      arr.push('敌人数量：' + this.currentEnemyNum + '\r\n')
      return arr
    }
  }

  this.Create = function (_option) {
    option.isAndroid = Util.isAndroid()
    option.id = _option.id

    // resources
    if (!_option.resources) throw new Error('resource not exist')
    option.resources.plainImg = _option.resources.plainImg
    var resourceKeys = Object.keys(option.resources)
    for (var index in resourceKeys) {
      var pReourceKeys = Object.keys(_option.resources)
      if (pReourceKeys.indexOf(resourceKeys[index]) != -1) {
        option.resources[resourceKeys[index]] = _option.resources[resourceKeys[index]]
      }else {
        throw new Error('resource ' + resourceKeys[index] + ' not exist')
      }
    }

    // events
    if (option.isAndroid) {
      _option.attachEvent.click = this.EventInput.click
      _option.attachEvent.move = this.EventInput.move
      _option.attachEvent.mouseDown = this.EventInput.mouseDown
      _option.attachEvent.mouseUp = this.EventInput.mouseUp
    }else {
      _option.attachEvent.onclick = this.EventInput.click
      _option.attachEvent.onmousemove = this.EventInput.move
      _option.attachEvent.onmousedown = this.EventInput.mouseDown
      _option.attachEvent.onmouseup = this.EventInput.mouseUp
    }

    var c = document.getElementById(option.id)

    var body = document.body
    if (option.isAndroid) {
      c.width = body.scrollWidth
      c.height = body.scrollHeight - 6
    }

    context = c.getContext('2d')
    option.ctxHeight = context.canvas.clientHeight
    option.ctxWidth = context.canvas.clientWidth

    scene = new Scene()
    scene.position.x = 0
    scene.position.y = 0
    scene.width = option.ctxWidth
    scene.height = option.ctxHeight

    resetButton = new ResetButton()
    resetButton.position.x = option.ctxWidth / 4
    resetButton.position.y = option.ctxHeight / 2
    resetButton.width = option.ctxWidth / 2
    resetButton.height = 40
    resetButton.icon = option.resources.button
    // 重置事件
    eventRelative.attachEvet(resetButton, 'click', function (obj, eventInfo) {
      isRunning = 1
      obj.isDisplay = false
      reset()
    })

    player = new Player(true)
    player.readyShot(100)
    // 注册事件
    // 玩家开始移动
    eventRelative.attachEvet(player, 'mouseDown', function (obj, eventInfo) {
      if (isRunning == 1)  plainMoveState.isMouseDown = true
    })
    // 玩家停止移动
    eventRelative.attachEvet(player, 'mouseUp', function (obj, eventInfo) {
      if (isRunning == 1)  plainMoveState.isMouseDown = false
    })
    // 玩家移动中
    eventRelative.attachEvet(scene, 'mouseMove', function (obj, eventInfo) {
      if (isRunning == 1 && plainMoveState.isMouseDown === true) {
        player.position.x = eventInfo.position.x - player.width / 2
        player.position.y = eventInfo.position.y - player.height / 2
      }
    })
  }

  /**
   * time
   */
  var clearTm
  var drawTm
  var moveTm
  this.Start = function () {
    // 拦截作用 必要时可以扩展出去
    var before = function (callback) {
      return function () {
        if (isRunning == 1)  callback()
      }
    }
    drawTm = setInterval(draw, 50)
    drawTm = setInterval(before(checkCollection), 50)
    moveTm = setInterval(before(objectMove), 50)
    clearTm = setInterval(before(clearObject), 5000)
  }
  // 绘制
  var draw = function () {
    drawBuffer()
    // 报告
    statInfo.currentShotNum = shots.length
    statInfo.currentEnemyNum = enemies.length
  }
  // 检测碰撞
  var checkCollection = function () {
    var plainRect = {
      x: player.position.x,
      y: player.position.y,
      width: player.width,
      height: player.height
    }
    for (var i = enemies.length - 1;i > -1;i--) {
      var enemy = enemies[i]
      if (enemy.isDie) continue
      var enemyRect = {
        x: enemy.position.x,
        y: enemy.position.y,
        width: enemy.width,
        height: enemy.height
      }
      // 检查子弹和飞机的碰撞
      for (var j = shots.length - 1;j > -1;j--) {
        var oneShot = shots[j]
        if (oneShot.isDie) continue
        var shotRect = {x: oneShot.position.x,y: oneShot.position.y,width: oneShot.width,height: oneShot.height}
        if (player.Oid == oneShot.belong && Util.isChonghe(shotRect, enemyRect)) {
          enemy.Hp--
          oneShot.Hp--
          if (enemy.Hp <= 0) {
            // 判断是否产生战利品
            var spoil = spoilManager.createSpoil(enemy)
            if (spoil) spoils.push(spoil)

            statInfo.kill[enemy.type]++

            enemy.isDie = true
            var bullet = new Bullet()
            bullet.isDie = false
            bullet.icon = option.resources.bullet
            bullet.width = 8
            bullet.height = 8
            bullet.position.x = oneShot.position.x + oneShot.width / 2
            bullet.position.y = oneShot.position.y
            bullets.push(bullet)
            setTimeout((function (enemy, bullet) {
              return function () {
                Util.removeArr(enemies, enemy)
                Util.removeArr(bullets, bullet)
              }
            })(enemy, bullet), 500)
          }
          // 子弹生命  穿甲弹
          if (oneShot.Hp <= 0) {
            oneShot.isDie = true
            setTimeout((function (shot) {
              return function () {
                Util.removeArr(shots, shot)
              }
            })(oneShot), 500)
          }
        }
      }
      // 检查玩家和飞机的碰撞
      if (Util.isChonghe(plainRect, enemyRect)) {
        enemy.Hp--
        player.Hp--
        Util.isChonghe(plainRect, enemyRect)
        if (enemy.Hp <= 0) {
          enemy.isDie = true
          setTimeout(function () {
            enemies = enemies.slice(0, i).concat(enemies.slice(i + 1, enemies.length))
          }, 100)
        }
      }
    }

    // 检查玩家是否被击中
    for (var j = shots.length - 1;j > -1;j--) {
      var oneShot = shots[j]
      if (oneShot.isDie) continue

      if (player.Oid != oneShot.belong && Util.inArea({x: oneShot.position.x + oneShot.width / 2,y: oneShot.position.y}, plainRect)) {
        player.Hp--
        oneShot.Hp--
        if (oneShot.Hp <= 0) {
          oneShot.isDie = true
          setTimeout((function (shot) {
            return function () {
              Util.removeArr(shots, shot)
            }
          })(oneShot), 500)
        }
      }
    }
    // 检查玩家是否获取战利品
    for (var j = spoils.length - 1;j > -1;j--) {
      var oneSpoil = spoils[j]
      if (oneSpoil.isDie) continue
      var spoilRect = {x: oneSpoil.position.x,y: oneSpoil.position.y,width: oneSpoil.width,height: oneSpoil.height}
      if (Util.isChonghe(spoilRect, plainRect)) {
        oneSpoil.isDie = true
        oneSpoil.Effect(player)
        Util.removeArr(spoils, oneSpoil)
      }
    }

    if (player.Hp <= 0) {
      isRunning = 2
      resetButton.isDisplay = true
    }
  }
  // 对象移动
  var objectMove = function () {
    // 生成新的个体
    var pShots = player.getShot()
    if (pShots) {
      shots.push.apply(shots, pShots)
      statInfo.emitShot[pShots[0].type]++
    }

    if (Math.random() < 0.07) // 百分之七生成敌军
    {
      var rad = Math.random() * 3 + ''
      statInfo.allEnemy++
      Util.createEnemy(parseInt(rad.charAt(0)) + 2)
    }

    if (Math.random() < 0.01) // 百分之一生成强力敌军
    {
      statInfo.allEnemy++
      Util.createEnemy(1)
    }

    for (var index in shots) {
      if (shots[index].isDie) continue
      var shot = shots[index]
      shot.position.y -= shot.speedY
      shot.position.x -= shot.speedX
    }

    for (var index in spoils) {
      if (spoils[index].isDie) continue
      var spoil = spoils[index]
      spoil.position.y += spoil.speedY
      spoil.position.x += spoil.speedX
    }

    for (var index in enemies) {
      if (enemies[index].isDie) continue
      var enemy = enemies[index]
      enemy.position.y += enemy.speedY
      enemy.position.x += enemy.speedX
      var eShots = enemy.getShot()
      if (eShots) {
        shots.push.apply(shots, eShots)
        statInfo.emitShot[eShots[0].type]++
      }
    }
  }
  // 对象清理
  var clearObject = function (that) {
    // 删除越界的对象  
    for (var i = shots.length - 1;i > -1;i--) {
      var oneShot = shots[i]
      if (oneShot.isDie || !Util.inArea(oneShot.position, {x: -10,y: -10,width: option.ctxWidth + 10,height: option.ctxHeight + 10})) {
        Util.removeArr(shots, oneShot)
      }
    }

    for (var i = enemies.length - 1;i > -1;i--) {
      var enemy = enemies[i]
      if (enemy.isDie) {
        Util.removeArr(enemies, enemy)
        continue
      }
      if (!Util.inArea(enemy.position, {x: -100,y: -100,width: option.ctxWidth + 100,height: option.ctxHeight + 100})) {
        Util.removeArr(enemies, enemy)
      }
    }

    for (var i = spoils.length - 1;i > -1;i--) {
      var spoil = spoils[i]
      if (spoil.isDie) {
        Util.removeArr(spoils, spoil)
        continue
      }
      if (!Util.inArea(spoil.position, {x: -100,y: -100,width: option.ctxWidth + 100,height: option.ctxHeight + 100})) {
        Util.removeArr(spoils, spoil)
      }
    }
  }
  /**
   * 绘图
   */
  function drawBuffer () {
    var canvas = document.createElement('canvas')
    var tempContext = canvas.getContext('2d')
    canvas.height = option.ctxHeight
    canvas.width = option.ctxWidth

    function drawEobject (eobj, rotateValue) {
      tempContext.drawImage(eobj.icon,
        eobj.position.x , eobj.position.y,
        eobj.width, eobj.height)
    }
    // 背景
    tempContext.drawImage(option.resources.bg, 0, 0,
      option.ctxWidth,
      option.ctxHeight)
    // 子弹
    for (var index in shots) {
      var shot = shots[index]
      drawEobject(shot)
    }
    // 飞机
    drawEobject(player)
    // 敌军
    for (var index in enemies) {
      var enemy = enemies[index]
      drawEobject(enemy)
    }
    // 战利品
    for (var index in spoils) {
      var spoil = spoils[index]
      drawEobject(spoil)
    }
    // 死亡
    for (var index in bullets) {
      var bullet = bullets[index]
      drawEobject(bullet)
    }
    // 重置
    if (isRunning != 1) {
      drawEobject(resetButton)
    }
    // 绘制文本
    if (option.isDebug) {
      var arr = statInfo.getDebugArray()
      for (var index = 0;index < arr.length;index++) {
        tempContext.strokeText(arr[index], 10, 10 * (index + 1))
      }
    }

    // head
    context.drawImage(option.resources.head, -5, 0, option.ctxWidth + 10, headOffset)
    // hp
    for (var index = 0;index < player.Hp;index++) {
      var width = (option.resources.hp.width + 5) * index + 5
      context.drawImage(option.resources.hp, width, 0, 20, headOffset)
    }
    // scene
    context.drawImage(canvas, // 绘制
      0, 0, canvas.width, canvas.height,
      0, headOffset, option.ctxWidth, option.ctxHeight - headOffset)
  }
  /**
   * 清理函数
   */
  var destory = function () {
    clearTimeout(clearTm)
    clearTimeout(drawTm)
    clearTimeout(moveTm)
  }
  /**
   * reset
   */
  var reset = function () {
    shots.length = 0
    enemies.length = 0
    spoils.length = 0
    player.reset()
  }
  /**
   * event
   */
  // 此类型用于事件转换
  var eventRelative = {
    click: [],
    mouseDown: [],
    mouseUp: [],
    mouseMove: [],
    // 附加事件中 object-action-callback
    attachEvet: function (target, action, callback) {
      var eventMsg = {target: target,callback: callback}
      var funcs = this[action]
      if (!funcs) throw new Error('not support event')
      funcs.push(eventMsg)
    },
    detachEvent: function (target, action) {
      var funcs = this[action]
      for (var i = 0;i < funcs.length;i++) {
        if (funcs[i].target == target) {
          Util.removeArr(funcs, funcs[i])
        }
      }
    },
    // 触发事件中 action-eventInfo
    triggerEvent: function (action, eventInfo) {
      var funcs = this[action]
      if (!funcs) throw new Error('not support event')
      for (var i = 0;i < funcs.length;i++) {
        if (funcs[i].target.isDisplay && Util.isEffect(funcs[i].target, action, eventInfo)) {
          funcs[i].callback(funcs[i].target, eventInfo)
        }
      }
    }
  }

  // 外部事件转内部事件驱动  
  // 包装按键按下，抬起，移动事件
  var pacakgeEvent = function (event) {
    var evnetInfo = {
      position: {x: 0,y: 0}
    }
    if (option.isAndroid) {
      evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
      evnetInfo.position.y = Util.sceneYTransform(event.gesture.center.pageY)
    }else {
      evnetInfo.position.x = event.offsetX
      evnetInfo.position.y = Util.sceneYTransform(event.offsetY)
    }
    return evnetInfo
  }
  // 包装单击事件
  var pacakgeClick = function (event) {
    var evnetInfo = {
      position: {x: 0,y: 0}
    }

    if (option.isAndroid) {
      evnetInfo.position.x = event.pageX - event.target.offsetLeft
      evnetInfo.position.y = Util.sceneYTransform(event.pageY)
    }else {
      evnetInfo.position.x = event.offsetX
      evnetInfo.position.y = Util.sceneYTransform(event.offsetY)
    }
    return evnetInfo
  }
  // 移动事件
  var moveFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseMove', pacakgeEvent(arguments[0]))
    }
  })()
  // 按下事件
  var moveDownFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseDown', pacakgeEvent(arguments[0]))
    }
  })()
  // 抬起事件
  var moveUpFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseUp', pacakgeEvent(arguments[0]))
    }
  })()
  // 点击事件
  var clickFunc = (function () {
    return function () {
      eventRelative.triggerEvent('click', pacakgeClick(arguments[0]))
    }
  })()
  // 事件输入
  this.EventInput = {
    mouseDown: moveDownFunc,
    mouseUp: moveUpFunc,
    click: clickFunc,
    move: moveFunc
  }

  /**
   * Util
   */
  var Util = {
    isChonghe: function (rect1, rect2) {
      if (Util.inArea({x: rect1.x,y: rect1.y}, rect2)) return true
      if (Util.inArea({x: rect1.x + rect1.width,y: rect1.y}, rect2)) return true
      if (Util.inArea({x: rect1.x,y: rect1.y + rect1.height}, rect2)) return true
      if (Util.inArea({x: rect1.x + rect1,y: rect1 + rect1.height.y}, rect2)) return true

      if (Util.inArea({x: rect2.x,y: rect2.y}, rect1)) return true
      if (Util.inArea({x: rect2.x + rect2.width,y: rect2.y}, rect1)) return true
      if (Util.inArea({x: rect2.x,y: rect2.y + rect2.height}, rect1)) return true
      if (Util.inArea({x: rect2.x + rect2,y: rect2 + rect2.height.y}, rect1)) return true

      return false
    },
    inArea: function (position, rect) {
      if (position.x >= rect.x && position.x <= rect.x + rect.width) {
        if (position.y >= rect.y && position.y <= rect.y + rect.height) {
          return true
        }
      }
      return false
    },
    isEffect: function (plain, action , eventInfo) {
      var pos = {x: eventInfo.position.x,y: eventInfo.position.y}
      var rect = {
        x: plain.position.x,
        y: plain.position.y,
        width: plain.width,
        height: plain.height
      }
      return Util.inArea(pos, rect)
    },
    removeArr: function (arr, val) {
      var index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    sceneYTransform: function (y) {
      return (y - headOffset) / (option.ctxHeight - headOffset) * option.ctxHeight
    },
    isAndroid: function () {
      var u = navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    },
    createEnemy: function (type) {
      // 1 大飞机  2,3,4 小飞机

      statInfo.allEnemy++
      var enemy = new Enemy(true)
      enemy.readyShot(500 * (Math.random() + 1))
      enemy.Oid = ++currentOid
      var span = shot.width / 5
      enemy.position.x = option.ctxWidth * Math.random()
      enemy.position.y = 0 - enemy.width
      enemy.speed = enemy.speedY = 5 * option.enemy.speedFactor
      enemies.push(enemy)

      enemy.icon = option.resources.enes[type - 1]
      if (type == 1) {
        enemy.width = 40
        enemy.height = 60
        enemy.Hp = 20 + 10 * Math.random()
      }else {
        enemy.width = 20
        enemy.height = 30
        enemy.Hp = 2 + 5 * Math.random()
      }
    }
  }

  /**
 * 基类
 */
  function EObject () {
    this.isDisplay = true
    this.Oid = -1 // id
    this.icon // 图片
    this.width = 0 // 宽度
    this.height = 0 // 高度
    this.speed = 5 // 合速度
    this.speedY = 5 // Y速度
    this.speedX = 0 // X速度
    this.position = {x: 0,y: 0} // 位置
  }

  function Plain (enableShot) {
    EObject.call(this)

    this.AllHp = 1 // 总HP
    this.Hp = 1 // 当前Hp
    this.isDie = false // 是否死亡
    this.shotInterVal = 500 // 发射周期
    this.enableShot = enableShot // 是否发射
    this.interval // 发射器
    this.shots = []
    var that = this
    this.readyShot = function (time) {
      clearInterval(this.interval)
      if (! this.enableShot) return
      var that = this
      that.shotInterVal = time
      clearTimeout(that.interval)
      that.interval = setInterval(function () {
        if (that.shots && that.shots.length > 0) return
        that.shots.push.apply(that.shots, that.shotFactory())
      }, time)
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
  function Enemy (isShot) {
    Plain.call(this, isShot)
    this.type = 'common'
    this.speedX = 0

    this.shotFactory = function () {
      var shot = new Shot()
      shot.Oid = ++currentOid
      shot.belong = this.Oid
      shot.Hp = 1
      shot.width = 5
      shot.height = 15
      shot.icon = option.resources.eshot
      shot.speed = shot.speedY = (this.speedY + 8) * option.enemy.shotSpeedFactor
      shot.position.x = this.position.x + this.width / 2 - shot.width / 2
      shot.position.y = this.position.y
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
    this.Attact = 1 // 攻击力
    belong = 0
  }
  /**
   * @param {*玩家} isShot 
   */
  function Player () {
    Plain.call(this, true)

    this.icon = option.resources.plainImg
    this.Oid = ++currentOid
    this.width = 30
    this.height = 24
    this.AllHp = 3
    this.Hp = this.AllHp
    this.position.x = (option.ctxWidth - this.width) / 2
    this.position.y = (option.ctxHeight - this.height)
    this.enableShot = true
    this.shotEx = new ShotEx()
    this.shotType = {
      type: 'umShot',
      num: 1
    }
    this.shotFactory = function () {
      return this.shotEx.CreateShot(this)
    }
    this.reset = function () {
      this.Hp = player.AllHp
      this.position.x = (option.ctxWidth - player.width) / 2
      this.position.y = (option.ctxHeight - player.height)
      this.shotType = {
        type: 'umShot',
        num: 1
      }
    }
  }

  function ResetButton () {
    EObject.call(this)
  }
  function Scene () {
    EObject.call(this)
  }
  function Spoil (obj, type) {
    EObject.call(this)
    this.speedY = 20
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
    this.icon = option.resources.u
    this.Effect = function (targetPlayer) {
      if (targetPlayer.shotType.type == spoilManager.spoilType.umShot) {
        targetPlayer.shotType.num++
      }else {
        targetPlayer.shotType = {
          type: spoilManager.spoilType.umShot,
          num: 1
        }
      }

      targetPlayer.readyShot(200)
    }
  }
  function GzShotSpoil (object) {
    Spoil.call(this, object)
    this.spoiltype = 'gzShot'
    this.icon = option.resources.g
    this.Effect = function (targetPlayer) {
      if (targetPlayer.shotType.type == spoilManager.spoilType.gzShot) {
        targetPlayer.shotType.num++
      }else {
        targetPlayer.shotType = {
          type: spoilManager.spoilType.gzShot,
          num: 1
        }
      }
      targetPlayer.readyShot(1500-200*targetPlayer.shotType.num)
    }
  }
  function AddHpSpoil (object) {
    Spoil.call(this, object)
    this.spoiltype = 'addHp'
    this.icon = option.resources.hp
    this.Effect = function (targetPlayer) {
      if (targetPlayer.Hp < targetPlayer.AllHp) targetPlayer.Hp++
    }
  }
  function ShotEx () {
    EObject.call(this)
    this.CreateShot = function (ePlayer) {
      // ePlayer.shots.
      if (ePlayer.shotType.type == 'umShot') return umbrellaShot(ePlayer, ePlayer.shotType.num)
      else if (ePlayer.shotType.type == 'gzShot') return gzShot(ePlayer, ePlayer.shotType.num)
      else if (ePlayer.shotType.type == 'common') return commonShot(ePlayer)
    }
    var umbrellaShot = function (ePlayer, num) {
      var split
      var sp = (ePlayer.speed + 8) * option.playerShotSpeedFactor
      if (2 * num - 1 < 15)
        split = 2 * num - 1
      else
        split = 15
      var rotate = Math.PI / (split + 1)
      var shots = []
      for (var i = 1;i <= split;i++) {
        var shot = new Shot()
        shot.Oid = ++currentOid
        shot.belong = ePlayer.Oid
        shot.Hp = 1
        shot.width = 5
        shot.height = 15
        shot.icon = option.resources.shot
        shot.position.x = ePlayer.position.x + ePlayer.width / 2-shot.width/2
        shot.position.y = ePlayer.position.y

        shot.speedY = sp * Math.sin(rotate * i)
        shot.speedX = sp * Math.cos(rotate * i)
        shots.push(shot)
      }
      return shots
    }
    var gzShot = function (ePlayer) {
      var sp = (ePlayer.speed + 8) * option.playerShotSpeedFactor
      var shot = new Shot()
      shot.Oid = ++currentOid
      shot.belong = ePlayer.Oid
      shot.Hp = 100000000
      shot.width = 100
      shot.height = option.ctxHeight
      shot.icon = option.resources.gz
      shot.position.x = ePlayer.position.x + ePlayer.width / 2 - shot.width / 2
      shot.position.y = 0

      shot.speedY = 0
      shot.speedX = 0
      var shotCount = 100
      var tm
      // 1秒后威力减弱
      setTimeout(function () {
        var span = shot.width / 5
        if (isRunning == 1) {
          tm = setInterval(function () {
            if (isRunning == 1) {
              shot.width = shot.width - span
              shot.position.x=shot.position.x+span/2
            }
          }, 100)
        }
      }, 1000)
      // 1.5秒后消失
      setTimeout(function () {
        if (isRunning == 1) {
          shot.position.y = -option.ctxHeight
          shot.isDie = true
          clearTimeout(tm)
        }
      }, 1500)
      return [shot]
    }
    var commonShot = function (ePlayer) {
      var shot = new Shot()
      shot.Oid = ++currentOid
      shot.belong = ePlayer.Oid
      shot.Hp = 1
      shot.width = 8
      shot.height = 24
      shot.speedY = 10 * option.playerShotSpeedFactor
      shot.icon = option.resources.shot
      shot.position.x = ePlayer.position.x + ePlayer.width / 2 - shot.width / 2
      shot.position.y = ePlayer.position.y

      return [shot]
    }
  }

  function SpoilManager () {
    this.spoilType = {
      umShot: 'umShot',
      gzShot: 'gzShot',
      addHp: 'addHp'
    }
    this.createSpoil = function (obj) {
      if (Math.random() < 0.5) return undefined
      var types = Object.values(this.spoilType)
      var t = types[ (Math.random() * types.length).toString().charAt(0) - '0']

      switch (t) {
        case this.spoilType.umShot:
          return new UmShotSpoil(obj)
          break
        case this.spoilType.gzShot:
          return new GzShotSpoil(obj)
          break
        case this.spoilType.addHp:
          return new AddHpSpoil(obj)
          break
      }
    }
  }
}
