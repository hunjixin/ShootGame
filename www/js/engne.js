function Engine () {
  var currentOid = 0
  var isRunning = true
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
      plainImg: '',
      shot: '',
      bullet: '',
      bg: '',
      eshot: '',
      hp: '',
      head: '',
      enes: ''
    }
  }
  var scene = {}
  var shots = []
  var enemies = []
  var bullets = []
  var headOffset = 20
  var player = new Player(true)
  var context = ''
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
        throw new Error('resource ' + esourceKeys[index] + ' not exist')
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

    scene.position = {}
    scene.position.x = 0
    scene.position.y = 0
    scene.width = option.ctxWidth
    scene.height = option.ctxHeight

    player.icon = option.resources.plainImg
    player.Oid = ++currentOid
    player.width = 30
    player.height = 24
    player.AllHp = 3
    player.Hp = player.AllHp
    player.position.x = (option.ctxWidth - player.width) / 2
    player.position.y = (option.ctxHeight - player.height)
    player.setShot(100)
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
        if (!isRunning) return
        callback()
      }
    }
    drawTm = setInterval(before(draw), 50)
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

        if (player.Oid == oneShot.belong && Util.inArea({x: oneShot.position.x + oneShot.width / 2,y: oneShot.position.y}, enemyRect)) {
          enemy.Hp--
          oneShot.Hp--
          if (enemy.Hp <= 0) {
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

    if (player.Hp <= 0) {
      isRunning = false
    }
  }
  //对象移动
  var objectMove = function () {
    // 生成新的个体
    if (player.isShot) {
      var shot = Util.createShot(player, 0)
      shots.push(shot)
      player.isShot = false
      statInfo.emitShot[shot.type]++
    }

    if (plainMoveState.isMouseDown) {
      player.position = plainMoveState.position
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
    }

    for (var index in enemies) {
      if (enemies[index].isDie) continue
      var enemy = enemies[index]
      enemy.position.y += enemy.speedY
      if (enemy.isShot) {
        var shot = Util.createShot(enemy, 1)
        shots.push(shot)
        enemy.isShot = false
        statInfo.emitShot[shot.type]++
      }
    }
  }
  //对象清理
  var clearObject = function (that) {
    // 删除越界的对象  
    for (var i = shots.length - 1;i > -1;i--) {
      var oneShot = shots[i]
      if (!Util.inArea(oneShot.position, {x: -10,y: -10,width: option.ctxWidth + 10,height: option.ctxHeight + 10})) {
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
    // 死亡
    for (var index in bullets) {
      var bullet = bullets[index]
      drawEobject(bullet)
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
    player.Hp = player.AllHp
    player.position.x = (option.ctxWidth - player.width) / 2
    player.position.y = (option.ctxHeight - player.height)
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
    //附加事件中 object-action-callback
    attachEvet: function (target, action, callback) {
      var eventMsg = {target: target,callback: callback}
      var funcs = this[action]
      if (!funcs) throw new Error('not support event')
      funcs.push(eventMsg)
    },
    //触发事件中 action-eventInfo
    triggerEvent: function (action, eventInfo) {
      var funcs = this[action]
      if (!funcs) throw new Error('not support event')
      for (var i = 0;i < funcs.length;i++) {
        if (Util.isEffect(funcs[i].target, action, eventInfo)) {
          funcs[i].callback(funcs[i].target, eventInfo)
        }
      }
    }
  }

  // 注册内部事件
  //玩家开始移动
  eventRelative.attachEvet(player, 'mouseDown', function (obj, eventInfo) {
    plainMoveState.isMouseDown = true
  })
  //玩家停止移动
  eventRelative.attachEvet(player, 'mouseUp', function (obj, eventInfo) {
    plainMoveState.isMouseDown = false
  })
  //重置事件
  eventRelative.attachEvet(scene, 'click', function (obj, eventInfo) {
    if (!isRunning && !plainMoveState.isMouseDown) {
      isRunning = true
      reset()
    }
  })
  //玩家移动中
  eventRelative.attachEvet(scene, 'mouseMove', function (obj, eventInfo) {
    if (plainMoveState.isMouseDown === true) {
      plainMoveState.position.x = eventInfo.position.x
      plainMoveState.position.y = Util.sceneYTransform(eventInfo.position.y)
    }
  })

  // 外部事件转内部事件驱动  
  //包装按键按下，抬起，移动事件
  var pacakgeEvent = function (event) {
    var evnetInfo = {
      position: {x: 0,y: 0}
    }
    if (option.isAndroid) {
      evnetInfo.position.x = event.gesture.center.pageX - player.width / 2 - event.gesture.target.offsetLeft
      evnetInfo.position.y = Util.sceneYTransform(event.gesture.center.pageY) - player.height / 2
    }else {
      evnetInfo.position.x = event.offsetX - player.width / 2
      evnetInfo.position.y = Util.sceneYTransform(event.offsetY) - player.height / 2
    }
    return evnetInfo
  }
  //包装单击事件
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
  //移动事件
  var moveFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseMove', pacakgeEvent(arguments[0]))
    }
  })()
 //按下事件
  var moveDownFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseDown', pacakgeEvent(arguments[0]))
    }
  })()
  //抬起事件
  var moveUpFunc = (function () {
    return function () {
      eventRelative.triggerEvent('mouseUp', pacakgeEvent(arguments[0]))
    }
  })()
  //点击事件
  var clickFunc = (function () {
    return function () {
      eventRelative.triggerEvent('click', pacakgeClick(arguments[0]))
    }
  })()
  //事件输入
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
      return false
    },
    inArea: function (position, rect) {
      if (position.x > rect.x && position.x < rect.x + rect.width) {
        if (position.y > rect.y && position.y < rect.y + rect.height) {
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
      enemy.setShot(option.enemy.shotInterVal)
      enemy.Oid = ++currentOid
      enemy.position.x = option.ctxWidth * Math.random()
      enemy.position.y = 0 - enemy.width
      enemy.speedY = 5 * option.enemy.speedFactor
      enemies.push(enemy)

      enemy.icon = option.resources.enes[type - 1]
      if (type == 1) {
        enemy.width = 40
        enemy.height = 60
        enemy.Hp = 10
      }else {
        enemy.width = 20
        enemy.height = 30
      }
      enemy.setShot(500 * (Math.random() + 1))
    },
    createShot: function (eobject, type) {
      // type 型号1 玩家 型号2
      var shot = new Shot()
      shot.Oid = ++currentOid
      shot.belong = eobject.Oid
      shot.Hp = 1
      switch (type) {
        case 0:
          shot.width = 8
          shot.height = 24
          shot.speedY = 10 * option.playerShotSpeedFactor
          shot.icon = option.resources.shot
          break
        case 1:
          shot.width = 5
          shot.height = 15
          shot.icon = option.resources.eshot
          shot.speedY = (eobject.speedY + 8) * option.enemy.shotSpeedFactor
          break
      }
      shot.position.x = eobject.position.x + eobject.width / 2 - shot.width / 2
      shot.position.y = eobject.position.y
      return shot
    }
  }
}
/**
 * 基类
 */
function EObject (isShot) {
  this.Oid = -1 // id
  this.AllHp = 1 // 总HP
  this.Hp = 1 // 当前Hp
  this.icon // 图片
  this.width = 0 // 宽度
  this.height = 0 // 高度
  this.speedY = 5 // Y速度
  this.speedX = 5 // X速度
  this.position = {x: 0,y: 0} // 位置
  this.isDie = false // 是否死亡
  this.isShot = false // 是否处于发射状态
  this.shotInterVal = 500 // 发射周期
  this.enableShot = isShot // 是否发射

  var that = this
  this.interval // 发射器
  this.setShot = function (time) {
    if (! this.enableShot) return false
    this.shotInterVal = time
    clearTimeout(this.interval)
    this.interval = setInterval(function () {
      that.isShot = true
    }, time)
  }
}
/**
 * 敌军
 * @param {*是否发射} isShot 
 */
function Enemy (isShot) {
  this.enableShot = isShot
  this.type = 'common'
  EObject.call(this, isShot)
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
  this.type = 'common'
  this.Attact = 1 // 攻击力
  belong = 0
  EObject.call(this)
}
/**
 * 
 * @param {*玩家} isShot 
 */
function Player (isShot) {
  this.enableShot = isShot
  EObject.call(this, isShot)
}
