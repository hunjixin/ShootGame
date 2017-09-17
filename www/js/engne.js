
define(['event','util','spoil','EObject','resource','shot','plain','uiComonent'],
function(MyEvent,util,spoil,EObject,resource,shotObj,plain,uiComonent) {
  return function Engine () {
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
    }
    var scene
    var resetButton
    var shots = []
    var enemies = []
    var bullets = []
    var spoils = []
    var player

    var _context = {    
      headOffset : 20,
      currentOid:0,
      isRunning :0, // 三种状态 1 预备/2 进行 /3 结束
      option:option
    }
    var spoilManager = new spoil.SpoilManager()
    var plainMoveState = {
      isMouseDown: false,
      position: {x: 0,y: 0}
    }
    var stateInfo = {
      enemies: {
        all: {},
        resolve: {}
      },
      emitShot: {
        all: {},
        resolve: {}
      },
      spoils: {
        all: {},
        resolve: {}
      },
      currentShotNum: 0,
      currentEnemyNum: 0,
      getDebugArray: function () {
        var sumLog = function (obj) {
          var keys = Object.keys(obj)
          var sum = 0
          for (var i = 0;i < keys.length;i++) {
            sum += obj[keys[i]]
          }
          return sum
        }
        var arr = []
  
        var allKillEmemies = sumLog(this.enemies.resolve)
        var allEnemies = sumLog(this.enemies.all)
        arr.push('杀敌总数量：' + allKillEmemies + '\r\n')
        arr.push('敌人总数：' + allEnemies + '\r\n')
        arr.push('击杀比：' + allKillEmemies / allEnemies + '\r\n')
  
        var allTargetShots = sumLog(this.emitShot.resolve)
        var allShots = sumLog(this.emitShot.all)
        arr.push('命中弹药' + allTargetShots + '\r\n')
        arr.push('发射弹药总量：' + allShots + '\r\n')
        arr.push('命中比：' + allTargetShots / allShots + '\r\n')
  
        arr.push('子弹数量：' + this.currentShotNum + '\r\n')
        arr.push('敌人数量：' + this.currentEnemyNum + '\r\n')
        return arr
      }
    }
    var myevent=new MyEvent(_context)
    this.Create = function (_option) {
      option.isAndroid = util.isAndroid()
      option.id = _option.id
      // events
      myevent.init(_option,_context)
  
      var c = document.getElementById(option.id)
  
      var body = document.body
      if (option.isAndroid) {
        c.width = body.scrollWidth
        c.height = body.scrollHeight - 6
      }
  
      context = c.getContext('2d')
      option.ctxHeight = context.canvas.clientHeight
      option.ctxWidth = context.canvas.clientWidth
  
      scene = new uiComonent.Scene()
      scene.position.x = 0
      scene.position.y = 0
      scene.width = option.ctxWidth
      scene.height = option.ctxHeight
  
      resetButton = new uiComonent.ResetButton()
      resetButton.position.x = option.ctxWidth / 4
      resetButton.position.y = option.ctxHeight / 2
      resetButton.width = option.ctxWidth / 2
      resetButton.height = 40
      resetButton.icon = resource.button
      // 重置事件
      myevent.eventRelative.attachEvet(resetButton, 'click', function (obj, eventInfo) {
        _context.isRunning = 1
        obj.isDisplay = false
        reset()
      })
  
      player = new plain.Player(_context,true)
      player.setShotInterVal(1)
      // 注册事件
      // 玩家开始移动
      myevent.eventRelative.attachEvet(player, 'mouseDown', function (obj, eventInfo) {
        if ( _context.isRunning == 1)  plainMoveState.isMouseDown = true
      })
      // 玩家停止移动
      myevent.eventRelative.attachEvet(player, 'mouseUp', function (obj, eventInfo) {
        if ( _context.isRunning == 1)  plainMoveState.isMouseDown = false
      })
      // 玩家移动中
      myevent.eventRelative.attachEvet(scene, 'mouseMove', function (obj, eventInfo) {
        if ( _context.isRunning == 1 && plainMoveState.isMouseDown === true) {
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
          if ( _context.isRunning == 1)  callback()
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
      stateInfo.currentShotNum = shots.length
      stateInfo.currentEnemyNum = enemies.length
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
          if (player.Oid == oneShot.belong && util.isChonghe(shotRect, enemyRect)) {
            enemy.Hp=enemy.Hp-oneShot.attack*player.shotEx
            oneShot.Hp--
            if (enemy.Hp <= 0) {
              // 判断是否产生战利品
              var spoil = spoilManager.createSpoil(enemy)
              if (spoil) {
                if (1===stateInfo.spoils.all[spoil.type])
                  stateInfo.spoils.all[spoil.type]++
                else stateInfo.spoils.all[spoil.type] = 1
                spoils.push(spoil)
              }
              if (1===stateInfo.enemies.resolve[enemy.type])
                stateInfo.enemies.resolve[enemy.type]++
              else
                stateInfo.enemies.resolve[enemy.type] = 1
  
              enemy.isDie = true
              var bullet = new shotObj.Bullet()
              bullet.isDie = false
              bullet.icon = resource.bullet
              bullet.width = 8
              bullet.height = 8
              bullet.position.x = oneShot.position.x + oneShot.width / 2
              bullet.position.y = oneShot.position.y
              bullets.push(bullet)
              setTimeout((function (enemy, bullet) {
                return function () {
                  util.removeArr(enemies, enemy)
                  util.removeArr(bullets, bullet)
                }
              })(enemy, bullet), 500)
            }
            // 子弹生命  穿甲弹
            if (oneShot.Hp <= 0) {
              oneShot.isDie = true
              setTimeout((function (shot) {
                return function () {
                  if (1===stateInfo.emitShot.resolve[shot.type])
                    stateInfo.emitShot.resolve[shot.type]++
                  else stateInfo.emitShot.resolve[shot.type] = 1
                  util.removeArr(shots, shot)
                }
              })(oneShot), 500)
            }
          }
        }
        // 检查玩家和飞机的碰撞
        if (util.isChonghe(plainRect, enemyRect)) {
          enemy.Hp--
          player.Hp--
          util.isChonghe(plainRect, enemyRect)
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
  
        if (player.Oid != oneShot.belong && util.inArea({x: oneShot.position.x + oneShot.width / 2,y: oneShot.position.y}, plainRect)) {
          var ene=findEnemyByOid(oneShot.belong)
          var shotEx=ene?ene.shotEx:1
          player.Hp=player.Hp-oneShot.attack*shotEx
          oneShot.Hp--
          if (oneShot.Hp <= 0) {
            oneShot.isDie = true
            setTimeout((function (shot) {
              return function () {
                util.removeArr(shots, shot)
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
        if (util.isChonghe(spoilRect, plainRect)) {
          if (1===stateInfo.spoils.resolve[oneSpoil.type])
            stateInfo.spoils.resolve[oneSpoil.type]++
          else stateInfo.spoils.resolve[oneSpoil.type] = 1
          oneSpoil.isDie = true
          oneSpoil.Effect(player)
          util.removeArr(spoils, oneSpoil)
        }
      }
  
      if (player.Hp <= 0) {
        _context.isRunning = 2
        resetButton.isDisplay = true
      }
    }
    // 对象移动
    var objectMove = function () {
      // 生成新的个体
      var pShots = player.getShot()
      if (pShots) {
        shots.push.apply(shots, pShots)
        for (var i = 0;i < pShots.length;i++) {
          if (1===stateInfo.emitShot.all[pShots[i].type])
            stateInfo.emitShot.all[pShots[i].type]++
          else stateInfo.emitShot.all[pShots[i].type] = 1
        }
      }
  
      if (Math.random() < 0.07) // 百分之七生成敌军
      {
        var rad = Math.random() * 3 + ''
        var newEmeny = plain.createEnemy(_context,parseInt(rad.charAt(0)) + 2)
        if (1===stateInfo.enemies.all[newEmeny.type])
          stateInfo.enemies.all[newEmeny.type]++
        else stateInfo.enemies.all[newEmeny.type] = 1
        enemies.push(newEmeny)
      }
  
      if (Math.random() < 0.01) // 百分之一生成强力敌军
      {
        var newEmeny = plain.createEnemy(_context,1)
        if (1===stateInfo.enemies.all[newEmeny.type])
          stateInfo.enemies.all[newEmeny.type]++
        else stateInfo.enemies.all[newEmeny.type] = 1
        enemies.push(newEmeny)
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
        spoil.position.x += spoil.getXPosition()
      }
  
      for (var index in enemies) {
        if (enemies[index].isDie) continue
        var enemy = enemies[index]
        enemy.position.y += enemy.speedY
        enemy.position.x += enemy.speedX
        var eShots = enemy.getShot()
        if (eShots) {
          shots.push.apply(shots, eShots)
        }
      }
      player.refresh()
      for (var i = 0;i < enemies.length;i++) {
        enemies[i].refresh()
      }
    }
    // 对象清理
    var clearObject = function (that) {
      // 删除越界的对象  
      for (var i = shots.length - 1;i > -1;i--) {
        var oneShot = shots[i]
        if (oneShot.isDie || !util.inArea(oneShot.position, {x: -10,y: -10,width: option.ctxWidth + 10,height: option.ctxHeight + 10})) {
          util.removeArr(shots, oneShot)
        }
      }
  
      for (var i = enemies.length - 1;i > -1;i--) {
        var enemy = enemies[i]
        if (enemy.isDie) {
          util.removeArr(enemies, enemy)
          continue
        }
        if (!util.inArea(enemy.position, {x: -100,y: -100,width: option.ctxWidth + 100,height: option.ctxHeight + 100})) {
          util.removeArr(enemies, enemy)
        }
      }
  
      for (var i = spoils.length - 1;i > -1;i--) {
        var spoil = spoils[i]
        if (spoil.isDie) {
          util.removeArr(spoils, spoil)
          continue
        }
      // if (!util.inArea(spoil.position, {x: -100,y: -100,width: option.ctxWidth + 100,height: option.ctxHeight + 100})) {
      //   util.removeArr(spoils, spoil)
      // }
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
      tempContext.drawImage(resource.bg, 0, 0,
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
      if ( _context.isRunning != 1) {
        drawEobject(resetButton)
      }
      // 绘制文本
      if (option.isDebug) {
        var arr = stateInfo.getDebugArray()
        for (var index = 0;index < arr.length;index++) {
          tempContext.strokeText(arr[index], 10, 10 * (index + 1))
        }
      }
  
      // head
      context.drawImage(resource.head, -5, 0, option.ctxWidth + 10, _context.headOffset)
      // hp
      for (var index = 0;index < player.Hp;index++) {
        var width = (resource.hp.width + 5) * index + 5
        context.drawImage(resource.hp, width, 0, 20, _context.headOffset)
      }
      // scene
      context.drawImage(canvas, // 绘制
        0, 0, canvas.width, canvas.height,
        0, _context.headOffset, option.ctxWidth, option.ctxHeight - _context.headOffset)
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
     * 根据id查找敌人
     * @param {*敌人id} oid 
     */
    var findEnemyByOid=function(oid){
      if(enemies)
      {
        for(var i=0 ;i<enemies.length;i++)
        {
          if(enemies[i].Oid==oid)
          {
            return enemies[i]
          }
        }
      }
    }
  }
}
);