define(['util', 'EObject', 'resource','plain'], function (util, EObject, resource,plain) {
  function ResetButton (_context) {
    EObject.call(this)
    this.position.x = _context.option.ctxWidth / 4
    this.position.y = _context.option.ctxHeight / 2
    this.width = _context.option.ctxWidth / 2
    this.height = 40
    this.icon = resource.button
  }
  function SettingButton (_context) {
    EObject.call(this)
    this.position.x = _context.option.ctxWidth -_context.headOffset
    this.position.y = 2
    this.width = _context.headOffset
    this.height = _context.headOffset-4
    this.icon = resource.setting
  }
  function Stage (_context, stageConfig) {
    EObject.call(this)
    var that=this
    this.context = _context

    this.position.x = 0
    this.position.y = _context.headOffset
    this.width = _context.option.ctxWidth
    this.height = _context.option.ctxHeight-_context.headOffset
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
      canvas.height =this.height
      canvas.width =  this.width
      // 背景
      drawContext.drawImage(this.icon, 0, 0,
        this.width,
        this.height)
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
    var checkTm=setInterval(function(){
       if(that.isStageTimeOut())
       {
        that.createBoss()
         clearInterval(checkTm)
       }
    },100)
    
    this.createBoss=function(){
      var boss=new plain.Boss(this.context)
      this.boss=boss
      this.enemies.push(boss)
    }
    this.isStageTimeOut=function(){
      return (new Date()-this.startTime)/1000>this.time
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
       return this.context.stage.isStageTimeOut()
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
    this.reset=function(){
      this.currentStageIndex=0
      this.context.stage= new Stage(this.context , this.stagesConfig[0])
      this.context.stage.boss=undefined
    }
  }
  return {
    ResetButton: ResetButton,
    Stage: Stage,
    SettingButton:SettingButton,
    StageManager:StageManager
  }
})
