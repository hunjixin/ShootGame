define(['util', 'EObject', 'resource'], function (util, EObject, resource) {
  function ResetButton (_context) {
    EObject.call(this)
    this.position.x = _context.option.ctxWidth / 4
    this.position.y = _context.option.ctxHeight / 2
    this.width = _context.option.ctxWidth / 2
    this.height = 40
    this.icon = resource.button
  }
  function Stage (_context, stageConfig) {
    EObject.call(this)
    this.context = _context

    this.position.x = 0
    this.position.y = 0
    this.width = _context.option.ctxWidth
    this.height = _context.option.ctxHeight
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

    this.drawScene = function () {
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils

      var canvas = document.createElement('canvas')
      var drawContext = canvas.getContext('2d')
      canvas.height = this.context.option.ctxHeight
      canvas.width = this.context.option.ctxWidth
      // 背景
      drawContext.drawImage(this.icon, 0, 0,
        this.context.option.ctxWidth,
        this.context.option.ctxHeight)
      // 子弹
      for (var index in this.shots) {
        var shot = shots[index]
        util.drawEobject(drawContext, shot)
      }
      // 飞机
      util.drawEobject(drawContext, this.context.player)
      // 敌军
      for (var index in this.enemies) {
        var enemy = enemies[index]
        util.drawEobject(drawContext, enemy)
      }
      // 战利品
      for (var index in this.spoils) {
        var spoil = spoils[index]
        util.drawEobject(drawContext, spoil)
      }
      // 死亡
      for (var index in this.bullets) {
        var bullet = bullets[index]
        util.drawEobject(drawContext, bullet)
      }
      return canvas
    }
    this.destroy = function () {}
    this.reset=function(){
        this.startTime = new Date()
        this.shots.length=0
        this.enemies.length=0
        this.bullets.length=0
        this.spoils.length=0
    }
  }
  function StageManager (_context) {
    this.context = _context
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
    this.isStageTimeOut=function(){
       return (new Date()-this.context.stage.startTime)/1000>this.context.stage.time
    }
    this.init = function () {
        this.context.stage= new Stage(this.context , this.stagesConfig[0])
    }
    this.next = function () {
      this.currentStageIndex++
      if (this.stagesConfig.length > this.currentStageIndex) {
        this.context.stage.destroy()
        this.context.stage=new Stage(this.context , this.stagesConfig[this.currentStageIndex])
      }
    }
  }
  return {
    ResetButton: ResetButton,
    Stage: Stage,
    StageManager:StageManager
  }
})
