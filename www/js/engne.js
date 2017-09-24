define([
      'event',
      'util',
      'spoil',
      'EObject',
      'resource', 
      'shot',
      'plain', 
      'uiComonent',
      'Debug',
      'context'
    ],
  function (
      MyEvent,
      util, 
      spoil,
      EObject,
      resource,
      shotObj, 
      plain,
      uiComonent,
      Debug,
      context
        ) {
    return function Engine () {
      var option = {  }

      var plainMoveState = {
        isMouseDown: false,
        position: {x: 0,y: 0}
      }

      var player
      var buttons = []
      var resetButton
      var settingButton
      var myevent
      var spoilManager
      var stageManager

      this.Create = function (_option) {
        //canvas context
        var canvas = document.getElementById(_option.id)
        drawContext = canvas.getContext('2d')

        option.ctxWidth =canvas.width = window.screen.width
        option.ctxHeight =canvas.height = window.screen.height

       Object.assign(context,{
          headOffset: 20,
          currentOid: 0,
          option: option,
          myevent: myevent,
          stateInfo: new Debug.StateInfo(),
          plainMoveState: plainMoveState,
          shotType: shotObj.shotTypes,
          setting: new Debug.DebugSetting()
        })

        context.myevent = new MyEvent()
        spoilManager = new spoil.SpoilManager()

        //stage
        stageManager = new uiComonent.StageManager()
        stageManager.init()

        // events
        context.myevent.init(_option)
        // 重置事件
        resetButton = new uiComonent.ResetButton()
        resetButton.on('click',function (eventInfo) {
          resetButton.hide()
          reset()
          stageManager.stage.start()
        })

        // 设置按钮
        settingButton = new uiComonent.SettingButton()
        settingButton.on('click',function (eventInfo) {
          stageManager.stage.stop()
          _option.showConsoleView(function () {
            stageManager.stage.restart()
          })
        })

        player = new plain.Player(true)
        context.player = player
        player.setShotInterVal(1)
        // 注册事件
        // 玩家开始移动
        player.on('mouseDown',function (eventInfo) {
          if (context.stage.isRunning == 1)  plainMoveState.isMouseDown = true
        })
        // 玩家停止移动
        stageManager.stage.on('mouseUp',function (eventInfo) {
          if (context.stage.isRunning == 1)  plainMoveState.isMouseDown = false
        })
        // 玩家移动中
        context.stage.on('mouseMove',function (eventInfo) {
          if (context.stage.isRunning == 1 && plainMoveState.isMouseDown === true) {
            player.position.x = eventInfo.position.x - player.width / 2
            player.position.y = eventInfo.position.y - player.height / 2 - context.headOffset
          }
        })
        resetButton.show()
        buttons.push(resetButton)
        buttons.push(settingButton)
        _option.initConsoleView(context)
      }

      /**
       * time
       */
      var clearTm
      var drawTm
      var moveTm
      var checkTm
      this.Start = function () {
        // 拦截作用 必要时可以扩展出去
        var before = function (callback) {
          return function () {
            if (context.stage.isRunning == 1)  callback()
          }
        }

        drawTm = setInterval(draw, 50)
        checkTm = setInterval(before(checkCollection), 50)
        moveTm = setInterval(before(objectMove), 50)
        clearTm = setInterval(before(clearObject), 5000)
      }
      // 绘制
      var draw = function () {
        // stage
        var canvas = context.stage.drawScene()
        drawContext.drawImage(canvas, // 绘制
          0, 0, canvas.width, canvas.height,
          0, context.headOffset, option.ctxWidth, canvas.height)
        // head
        drawContext.drawImage(resource.head, -5, 0, option.ctxWidth + 10, context.headOffset)
        // hp
        for (var index = 0;index < player.Hp;index++) {
          var width = (resource.hp.width-15)* index
          drawContext.drawImage(resource.hp, width, 0, 20, context.headOffset)
        }
        // 设置图标
        util.drawEobject(drawContext, settingButton)
        // 按钮
        for (var i = 0;i < buttons.length;i++) {
          if (buttons[i].isDisplay) {
            util.drawEobject(drawContext, buttons[i])
          }
        }
        // 绘制文本
        if (context.setting.isDebug.value) {
          var arr = context.stateInfo.getDebugArray()
          for (var index = 0;index < arr.length;index++) {
            drawContext.strokeText(arr[index], 10, 10 * (index + 1) + context.headOffset)
          }
        }
      }
      // 检测碰撞
      var checkCollection = function () {
        var plainRect = {
          x: player.position.x,
          y: player.position.y,
          width: player.width,
          height: player.height
        }
        var enemies = context.stage.enemies
        var shots = context.stage.shots
        var bullets = context.stage.bullets
        var spoils = context.stage.spoils

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
              enemy.Hp = enemy.Hp - oneShot.attack * player.shotEx
              oneShot.Hp--
              if (enemy.Hp <= 0) {
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
                // 判断是否产生战利品
                var spoil = spoilManager.createSpoil(enemy)
                if (spoil) {
                  if (context.stateInfo.spoils.all[spoil.type])
                  context.stateInfo.spoils.all[spoil.type]++
                  else context.stateInfo.spoils.all[spoil.type] = 0
                  spoils.push(spoil)
                }
                if (context.stateInfo.enemies.resolve[enemy.type])
                context.stateInfo.enemies.resolve[enemy.type]++
                else
                context.stateInfo.enemies.resolve[enemy.type] = 1
              }
              // 子弹生命  穿甲弹
              if (oneShot.Hp <= 0) {
                oneShot.isDie = true
                setTimeout((function (shot) {
                  return function () {
                    if (context.stateInfo.emitShot.resolve[shot.type])
                    context.stateInfo.emitShot.resolve[shot.type]++
                    else context.stateInfo.emitShot.resolve[shot.type] = 1
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
            var ene = findEnemyByOid(oneShot.belong)
            var shotEx = ene ? ene.shotEx : 1
            player.Hp = player.Hp - oneShot.attack * shotEx
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
            if (context.stateInfo.spoils.resolve[oneSpoil.type])
            context.stateInfo.spoils.resolve[oneSpoil.type]++
            else context.stateInfo.spoils.resolve[oneSpoil.type] = 1
            oneSpoil.isDie = true
            oneSpoil.Effect(player)
            util.removeArr(spoils, oneSpoil)
          }
        }

        if (player.Hp <= 0) {
          context.stage.stop()
          resetButton.show()
        }
      }
      /**
       * 对象移动
       */
      var objectMove = function () {
        var enemies = context.stage.enemies
        var shots = context.stage.shots
        var bullets = context.stage.bullets
        var spoils = context.stage.spoils
        if (stageManager.canGoNextStage()) {
          stageManager.next()
        }
        // 生成新的个体
        var pShots = player.getShot()
        if (pShots) {
          shots.push.apply(shots, pShots)
          for (var i = 0;i < pShots.length;i++) {
            if (context.stateInfo.emitShot.all[pShots[i].type])
            context.stateInfo.emitShot.all[pShots[i].type]++
            else context.stateInfo.emitShot.all[pShots[i].type] = 1
          }
        }
        context.stage.update()

        player.update()
        // 报告
        context.stateInfo.currentShotNum = context.stage.shots.length
        context.stateInfo.currentEnemyNum = context.stage.enemies.length
      }
      // 对象清理
      var clearObject = function (that) {
        var enemies = context.stage.enemies
        var shots = context.stage.shots
        var bullets = context.stage.bullets
        var spoils = context.stage.spoils
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
       * 清理函数
       */
      var destory = function () {
        context.stage.destroy()
        clearInterval(clearTm)
        clearInterval(drawTm)
        clearInterval(moveTm)
        clearInterval(checkTm)
      }

      /**
       * reset
       */
      var reset = function () {
        player.reset()
        context.stateInfo.reset()
        stageManager.reset()
      }
      /**
       * 根据id查找敌人
       * @param {*敌人id} oid 
       */
      var findEnemyByOid = function (oid) {
        var enemies = context.stage.enemies
        if (enemies) {
          for (var i = 0;i < enemies.length;i++) {
            if (enemies[i].Oid == oid) {
              return enemies[i]
            }
          }
        }
      }
    }
  }
)
