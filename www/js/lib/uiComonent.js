define([
  'util',
  'eShape',
  'resource',
  'plain',
  'context',
  'shot'
], function (
  util,
  eShape,
  resource,
  plain,
  context,
  shotObj
) {
  function Button (option) {
    eShape.call(this)
    this.name = option.name
    this.position.x = option.position.x
    this.position.y = option.position.y
    this.width = option.width
    this.height = option.height
    this.icon = option.icon
  }
  function Bar (option) {
    eShape.call(this)
    this.name = option.name
    this.position.x = option.position.x
    this.position.y = option.position.y
    this.width = option.width
    this.height = option.height
    this.icon = option.icon
    this.rightButton = option.rightButton
    this.render = function (drawContext) {
      if (!this.isDisplay) return
      drawContext.drawImage(this.icon, this.position.x , this.position.y, this.width, this.height)
      // hp
      for (var index = 0;index < context.player.Hp;index++) {
        var width = (resource.hp.width - 15) * index
        drawContext.drawImage(resource.hp, width, 0, 20, context.headOffset)
      }
      // rightbutton
      this.rightButton.render(drawContext)
    }
  }

  function Stage (stageConfig) {
    eShape.call(this)
    var that = this

    this.isRunning = 2, // 三种状态 1 预备/2 进行 /3 结束
    this.position.x = 0
    this.position.y = context.headOffset
    this.width = context.option.ctxWidth
    this.height = context.option.ctxHeight - context.headOffset
    // 背景图片
    // 敌军种类  自动配置敌军
    // boss
    // 关卡时长
    // 组件
    this.resetButton = new Button({
      name: 'reset',
      position: {
        x: this.width / 4,
        y: this.height / 2
      },
      width: this.width / 2,
      height: 40,
      icon: resource.button
    })

    this.resetButton.on('click', function (eventInfo) {
      that.resetButton.hide()
      that.start()
    })

    this.icon = stageConfig.icon
    this.boss
    this.time = 10
    this.startTime = new Date()

    this.shots = []
    this.enemies = []
    this.bullets = []
    this.spoils = []
    this.stopInterval = 0
    var stopTime
    // 检测碰撞
    this.checkCollection = function () {
      var player = context.player
      var plainRect = {
        x: player.position.x,
        y: player.position.y,
        width: player.width,
        height: player.height
      }
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils

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
              var spoil = context.spoilManager.createSpoil(enemy)
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
        this.stop()
        resetButton.show()
      }
    }
    /**
     * 对象移动
     */
    this.objectMove = function () {
      var player = context.player
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils
      if (context.stageManager.canGoNextStage()) {
        context.stageManager.next()
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
      this.update()

      player.update()
      // 报告
      context.stateInfo.currentShotNum = this.shots.length
      context.stateInfo.currentEnemyNum = this.enemies.length
    }
    // 对象清理
    this.clearObject = function (that) {
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils
      // 删除越界的对象  
      for (var i = shots.length - 1;i > -1;i--) {
        var oneShot = shots[i]
        if (oneShot.isDie || !util.inArea(oneShot.position, {x: -10,y: -10,width: this.width + 10,height: this.height + 10})) {
          util.removeArr(shots, oneShot)
        }
      }

      for (var i = enemies.length - 1;i > -1;i--) {
        var enemy = enemies[i]
        if (enemy.isDie) {
          util.removeArr(enemies, enemy)
          continue
        }
        if (!util.inArea(enemy.position, {x: -100,y: -100,width: this.width + 100,height: this.height + 100})) {
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
    this.stop = function () {
      stopTime = new Date()
      this.isRunning = 2
    }
    this.restart = function () {
      this.stopInterval += (new Date() - stopTime)
      this.isRunning = 1
    }
    this.start = function () {
      this.startTime = new Date()
      this.isRunning = 1
    }
    this.drawScene = function () {
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils

      var canvas = document.createElement('canvas')
      var drawContext = canvas.getContext('2d')
      canvas.height = this.height
      canvas.width = this.width
      // 背景
      drawContext.drawImage(this.icon, 0, 0,
        this.width,
        this.height)
      // 子弹
      for (var index in this.shots) {
        var shot = shots[index]
        shot.render(drawContext)
      }
      // 飞机
      context.player.render(drawContext)
      // 敌军
      for (var index in this.enemies) {
        var enemy = enemies[index]
        enemy.render(drawContext)
      }
      // 战利品
      for (var index in this.spoils) {
        var spoil = spoils[index]
        spoil.render(drawContext)
      }
      // 死亡
      for (var index in this.bullets) {
        var bullet = bullets[index]
        bullet.render(drawContext)
      }
      return canvas
    }
    this.destroy = function () {}
    this.reset = function () {
      this.startTime = new Date()
      this.shots.length = 0
      this.enemies.length = 0
      this.bullets.length = 0
      this.spoils.length = 0
      this.isRunning = 0
    }

    this.hasCreateBoss = false
    var checkTm = setInterval(function () {
      if (that.isStageTimeOut()) {
        clearInterval(checkTm)
        that.createBoss()
        that.hasCreateBoss = true
      }
    }, 100)
    this.createBoss = function () {
      var boss = new plain.Boss()
      this.boss = boss
      this.enemies.push(boss)
    }
    
    this.isStageTimeOut = function () {
      return (new Date() - this.startTime - this.stopInterval) / 1000 > this.time
    }
    this.update = function () {
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils

      if (Math.random() < 0.07) // 百分之七生成敌军
      {
        var rad = Math.random() * 3 + ''
        var newEmeny = plain.createEnemy(parseInt(rad.charAt(0)) + 2)
        if (context.stateInfo.enemies.all[newEmeny.type])
          context.stateInfo.enemies.all[newEmeny.type]++
        else context.stateInfo.enemies.all[newEmeny.type] = 1
        enemies.push(newEmeny)
      }

      if (Math.random() < 0.01) // 百分之一生成强力敌军
      {
        var newEmeny = plain.createEnemy(1)
        if (context.stateInfo.enemies.all[newEmeny.type])
          context.stateInfo.enemies.all[newEmeny.type]++
        else context.stateInfo.enemies.all[newEmeny.type] = 1
        enemies.push(newEmeny)
      }

      for (var index in shots) {
        if (shots[index].isDie) continue
        var shot = shots[index]
        shot.update()
      }

      for (var index in spoils) {
        if (spoils[index].isDie) continue
        var spoil = spoils[index]
        spoil.update()
      }

      for (var index in enemies) {
        if (enemies[index].isDie) continue
        var enemy = enemies[index]

        var eShots = enemy.getShot()
        if (eShots) {
          shots.push.apply(shots, eShots)
        }
        enemy.update()
      }
    }
    this.render = function (drawContext) {
      var canvas = this.drawScene()
      drawContext.drawImage(canvas, // 绘制
        0, 0, canvas.width, canvas.height,
        this.position.x, this.position.y, this.width, this.height)
      that.resetButton.render(drawContext)
    }

    /**
       * 根据id查找敌人
       * @param {*敌人id} oid 
       */
    var findEnemyByOid = function (oid) {
      var enemies = that.enemies
      if (enemies) {
        for (var i = 0;i < enemies.length;i++) {
          if (enemies[i].Oid == oid) {
            return enemies[i]
          }
        }
      }
    }
  }

  function StageManager () {
    this.stagesConfig = [
      {
        icon: resource.bg.bg1
      },
      {
        icon: resource.bg.bg2
      },
      {
        icon: resource.bg.bg3
      }
    ]
    this.currentStageIndex = 0
    /**
     * 判断关卡是否超时   单位s
     */
    this.isStageTimeOut = function () {
      return this.stage.isStageTimeOut()
    }
    this.canGoNextStage = function () {
      var isBossEsixt = this.stage.enemies.indexOf(this.stage.boss)
      return -1 === isBossEsixt && this.stage.isStageTimeOut() && this.stage.hasCreateBoss == true
    }
    this.init = function () {
      var stage = new Stage(this.stagesConfig[0])
      stage.isRunning = 0
      this.stage = stage
    }
    this.next = function () {
      this.currentStageIndex++
      if (this.stagesConfig.length > this.currentStageIndex) {
        this.stage.destroy()
        var stage = new Stage(this.stagesConfig[this.currentStageIndex])
        this.stage = stage
      }
    }
    this.reset = function () {
      this.currentStageIndex = 0
      var stage = new Stage(this.stagesConfig[this.currentStageIndex])
      this.stage = stage
    }
  }
  return {
    Stage: Stage,
    Button: Button,
    Bar: Bar,
    StageManager: StageManager
  }
})
