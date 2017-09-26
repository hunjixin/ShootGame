define(['util', 'eShape', 'resource', 'plain','context'], function (util, eShape, resource, plain,context) {
  function ResetButton () {
    eShape.call(this)
    this.position.x = context.option.ctxWidth / 4
    this.position.y = context.option.ctxHeight / 2
    this.width = context.option.ctxWidth / 2
    this.height = 40
    this.icon = resource.button
  }
  function SettingButton (callback) {
    eShape.call(this)
    this.position.x = context.option.ctxWidth - context.headOffset
    this.position.y = 2
    this.width = context.headOffset
    this.height = context.headOffset - 4
    this.icon = resource.setting
  }
  function Stage (stageConfig) {
    eShape.call(this)
    var that = this

    this.isRunning= 2, // 三种状态 1 预备/2 进行 /3 结束
    this.position.x = 0
    this.position.y = context.headOffset
    this.width = context.option.ctxWidth
    this.height = context.option.ctxHeight - context.headOffset
    // 背景图片
    // 敌军种类  自动配置敌军
    // boss
    // 关卡时长
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
    this.stop = function () {
      stopTime = new Date()
      this.isRunning=2
    }
    this.restart = function () {
      this.stopInterval += (new Date() - stopTime)
      this.isRunning=1
    }
    this.start = function () {
      this.startTime = new Date()
      this.isRunning=1
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
        util.drawShap(drawContext, shot)
      }
      // 飞机
      util.drawShap(drawContext, context.player)
      // 敌军
      for (var index in this.enemies) {
        var enemy = enemies[index]
        util.drawShap(drawContext, enemy)
      }
      // 战利品
      for (var index in this.spoils) {
        var spoil = spoils[index]
        util.drawShap(drawContext, spoil)
      }
      // 死亡
      for (var index in this.bullets) {
        var bullet = bullets[index]
        util.drawShap(drawContext, bullet)
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
      this.isRunning=0
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
      return context.stage.isStageTimeOut()
    }
    this.canGoNextStage = function () {
      var isBossEsixt = context.stage.enemies.indexOf(context.stage.boss)
      return -1 === isBossEsixt && this.isStageTimeOut() && context.stage.hasCreateBoss == true
    }
    this.init = function () {
     var stage = new Stage(this.stagesConfig[0])
      stage.isRunning=0
      context.stage=this.stage=stage
    }
    this.next = function () {
      this.currentStageIndex++
      if (this.stagesConfig.length > this.currentStageIndex) {
        context.stage.destroy()
        var stage=new Stage(this.stagesConfig[this.currentStageIndex])
        stage.isRunning=1
        context.stage=this.stage = stage
      }
    }
    this.reset = function () {
      this.currentStageIndex = 0
      var stage=new Stage(this.stagesConfig[this.currentStageIndex])
      stage.isRunning=1
      context.stage=this.stage = stage
      context.stage.boss = undefined
    }
  }
  return {
    ResetButton: ResetButton,
    Stage: Stage,
    SettingButton: SettingButton,
    StageManager: StageManager
  }
})
