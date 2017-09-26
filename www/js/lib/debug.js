define(['context','util', 'resource'], function (context,util, resource) {
  function StateInfo () {
    this.enemies = {
      all: {},
      resolve: {}
    }
    this.emitShot = {
      all: {},
      resolve: {}
    }
    this.spoils = {
      all: {},
      resolve: {}
    }
    this.currentShotNum = 0
    this.currentEnemyNum = 0
    this.getDebugArray = function () {
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
    this.reset = function () {
      this.enemies.all = {}
      this.enemies.resolve = {}

      this.emitShot.all = {}
      this.emitShot.resolve = {}

      this.spoils.all = {}
      this.spoils.resolve = {}

      this.currentShotNum = 0
      this.currentEnemyNum = 0
    }
  }
  function DebugSetting () {
    this.isDebug = {
      message: '显示调试信息',
      value: true
    }
    this.stageTime = {
      message: '关卡时长',
      value: 20 // unit ms
    }
    this.spoilRate = {
      message: '战利品几率',
      value: 0.5
    }
    this.enemyRemoveRate = {
      message: '敌军移动速率',
      value: 0.5
    }
    this.enemyShotRate = {
      message: '敌军射速',
      value: 0.5
    }
    this.playerShotRate = {
      message: '玩家射速度',
      value: 20
    }
    this.spoilRate = {
      message: '战利品几率',
      value: 0.5
    }
  }

  return {
    StateInfo: StateInfo,
    DebugSetting: DebugSetting
  }
})
