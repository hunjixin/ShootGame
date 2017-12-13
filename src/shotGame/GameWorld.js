import GameWorldCore from '../lib/GameWorldCore.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import { SpoilManager } from './spoil/'
import { Boss, Player, EnemyFactory } from './index.js'
import { ShotorFactory, Bullet, Shot } from './shot/'

class GameWorld extends GameWorldCore {
  constructor (option) {
    super(option)
    this.stageManager = option.stageManager
    this.stageManager.gameWorld=this
    this.shots = []
    this.enemies = []
    this.bullets = []
    this.spoils = []
    this.boss
    this.hasCreateBoss = false

    this.spoilManager = new SpoilManager()
    this.player = new Player(this)
    this.player.setShotInterVal(1)

    var checkTm = setInterval(() => {
      if (this.stageManager.isStageTimeOut()) {
        clearInterval(checkTm)
        this.createBoss()
        this.hasCreateBoss = true
      }
    }, 100)

    this.ememyFactory = new EnemyFactory(this)
  }
  maxBound(){
    
  }
  enemyDie (enemy) {
    var self = this
    enemy.isDie = true
    var bullet = new Bullet({
      isDie: false,
      gameWorld:this,
      icon: resource.bullet,
      width: 8,
      height: 8,
      position: {
        x: (enemy.position.x + enemy.width) / 2,
        y: (enemy.position.y + enemy.height) / 2
      }
    })
    self.bullets.push(bullet)

    util.delayCall(() => {
      util.removeArr(self.enemies, enemy)
      util.removeArr(self.bullets, bullet)
    }, 500, enemy, bullet)
    // 判断是否产生战利品
    var spoil = this.spoilManager.createSpoil(enemy)
    if (spoil) {
      if (context.stateInfo.spoils.all[spoil.type])
        context.stateInfo.spoils.all[spoil.type]++
      else context.stateInfo.spoils.all[spoil.type] = 0
      self.spoils.push(spoil)
    }

    if (context.stateInfo.enemies.resolve[enemy.type])
      context.stateInfo.enemies.resolve[enemy.type]++
    else
      context.stateInfo.enemies.resolve[enemy.type] = 1
  }
  /**
   * 对象移动
   */
  objectMove () {
    var enemies = this.enemies
    var shots = this.shots
    var bullets = this.bullets
    var spoils = this.spoils
    if (this.stageManager.canGoNextStage()) {
      this.stageManager.next()
    }
    // 生成新的个体
    var pShots = this.player.getShot()
    if (pShots) {
      shots.push.apply(shots, pShots)
      for (var i = 0; i < pShots.length; i++) {
        if (context.stateInfo.emitShot.all[pShots[i].type])
          context.stateInfo.emitShot.all[pShots[i].type]++
        else context.stateInfo.emitShot.all[pShots[i].type] = 1
      }
    }

    this.update()

    this.player.update()
    // 报告
    context.stateInfo.currentShotNum = this.shots.length
    context.stateInfo.currentEnemyNum = this.enemies.length
  }
  // 对象清理
  clearObject () {
    this.constraintAreas.forEach(constraintArea => {
      var enemies = this.enemies
      var shots = this.shots
      var bullets = this.bullets
      var spoils = this.spoils
      // 删除越界的对象  
      for (var i = shots.length - 1; i > -1; i--) {
        var oneShot = shots[i]
        if (oneShot.isDie || !util.inArea(oneShot.position, constraintArea)) {
          util.removeArr(shots, oneShot)
        }
      }

      for (var i = enemies.length - 1; i > -1; i--) {
        var enemy = enemies[i]
        if (enemy.isDie) {
          util.removeArr(enemies, enemy)
          continue
        }
        if (!util.inArea(enemy.position, constraintArea)) {
          util.removeArr(enemies, enemy)
        }
      }

      for (var i = spoils.length - 1; i > -1; i--) {
        var spoil = spoils[i]
        if (spoil.isDie) {
          util.removeArr(spoils, spoil)
          continue
        }
      }
    })
  }
  // 游戏世界和ui世界的接口
  drawScene (stage) {

    var canvas = document.createElement('canvas')
    var drawContext = canvas.getContext('2d')
    canvas.height = stage.height
    canvas.width = stage.width
    // 背景
    
    drawContext.drawImage(this.stageManager.getCurrenStageConfig().icon, stage.gameWorldOffset.x, stage.gameWorldOffset.y, stage.width, stage.height,
    0,0,stage.width,stage.height)
    // 子弹
    this.shots.forEach(shot => {
      if (!shot.isDie) {
        shot.render(drawContext,stage)
      }
    })
    // 飞机
    this.player.render(drawContext,stage)
    // 敌军
    this.enemies.forEach(enemy => {
      if (!enemy.isDie) {
        enemy.render(drawContext,stage)
      }
    })
    // 战利品
    this.spoils.forEach(spoil => {
      if (!spoil.isDie) {
        spoil.render(drawContext,stage)
      }
    })
    // 死亡
    this.bullets.forEach(bullet => {
      if (!bullet.isDie) {
        bullet.render(drawContext,stage)
      }
    })
    return canvas
  }
  // 销毁
  destroy () {
    this.player.destroy()
  }
  // 重置
  reset () {
    this.player.reset()
    this.shots.length = 0
    this.enemies.length = 0
    this.bullets.length = 0
    this.spoils.length = 0
  }
  // Boss生成
  createBoss () {
    this.boss = new Boss()
    this.enemies.push(this.boss)
  }
  // 世界更新
  update () {
    if (Math.random() < 0.07) // 百分之七生成敌军
    {
      var rad = Math.random() * 3 + ''
      var newEmeny = this.ememyFactory.createEnemy(parseInt(rad.charAt(0)) + 2)
      if (context.stateInfo.enemies.all[newEmeny.type])
        context.stateInfo.enemies.all[newEmeny.type]++
      else context.stateInfo.enemies.all[newEmeny.type] = 1
      this.enemies.push(newEmeny)
    }

    if (Math.random() < 0.01) // 百分之一生成强力敌军
    {
      var newEmeny = this.ememyFactory.createEnemy(1)
      if (context.stateInfo.enemies.all[newEmeny.type])
        context.stateInfo.enemies.all[newEmeny.type]++
      else context.stateInfo.enemies.all[newEmeny.type] = 1
      this.enemies.push(newEmeny)
    }
    this.shots.forEach(shot => {
      if (!shot.isDie) {
        shot.update()
      }
    })

    this.spoils.forEach(spoil => {
      if (!spoil.isDie) {
        spoil.update()
      }
    })

    this.enemies.forEach(enemy => {
      if (!enemy.isDie) {
        var eShots = enemy.getShot()
        if (eShots) {
          this.shots.push.apply(this.shots, eShots)
        }
        enemy.update()
      }
    })
  }
  /**
   * 根据id查找敌人
   * @param {*敌人id} oid 
   */
  findEnemyByOid (oid) {
    var enemies = this.enemies
    if (enemies) {
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].Oid == oid) {
          return enemies[i]
        }
      }
    }
  }
  // 检测碰撞
  checkCollection () {
    var plainRect = this.player.getAbsoluteCollisionArea()[0]
    var enemies = this.enemies
    var shots = this.shots
    var bullets = this.bullets
    var spoils = this.spoils

    for (var i = enemies.length - 1; i > -1; i--) {
      var enemy = enemies[i]
      if (enemy.isDie) continue
      var enemyRect = enemy.getAbsoluteCollisionArea()[0]
      // 检查子弹和飞机的碰撞
      for (var j = shots.length - 1; j > -1; j--) {
        var oneShot = shots[j]
        if (oneShot.isDie) continue
        var shotRect = oneShot.getAbsoluteCollisionArea()[0]
        if (this.player.Oid == oneShot.belong && util.isChonghe(shotRect, enemyRect)) {
          enemy.Hp = enemy.Hp - oneShot.attack * this.player.shotEx
          oneShot.Hp--
          if (enemy.Hp <= 0) {
            this.enemyDie(enemy)
          }
          // 子弹生命  穿甲弹
          if (oneShot.Hp <= 0) {
            oneShot.isDie = true
            if (context.stateInfo.emitShot.resolve[oneShot.type])
              context.stateInfo.emitShot.resolve[oneShot.type]++
            else context.stateInfo.emitShot.resolve[oneShot.type] = 1
            util.removeArr(shots, oneShot)
          }
        }
      }
      // 检查玩家和飞机的碰撞
      if (util.isChonghe(plainRect, enemyRect)) {
        enemy.Hp--
        this.player.Hp--
        util.isChonghe(plainRect, enemyRect)
        if (enemy.Hp <= 0) {
          enemy.isDie = true
          util.removeArr(enemies, enemy)
        }
      }
    }

    // 检查玩家是否被击中
    for (var j = shots.length - 1; j > -1; j--) {
      var oneShot = shots[j]
      if (oneShot.isDie) continue
      if (this.player.Oid != oneShot.belong && util.inArea({
          x: oneShot.position.x + oneShot.width / 2,
          y: oneShot.position.y
        }, plainRect)) {
        var ene = this.findEnemyByOid(oneShot.belong)
        var shotEx = ene ? ene.shotEx : 1
        this.player.Hp = this.player.Hp - oneShot.attack * shotEx
        oneShot.Hp--
        if (oneShot.Hp <= 0) {
          oneShot.isDie = true
          util.removeArr(shots, oneShot)
        }
      }
    }
    // 检查玩家是否获取战利品
    for (var j = spoils.length - 1; j > -1; j--) {
      var oneSpoil = spoils[j]
      if (oneSpoil.isDie) continue
      var spoilRect = oneSpoil.getAbsoluteCollisionArea()[0]
      if (util.isChonghe(spoilRect, plainRect)) {
        oneSpoil.isDie = true
        util.removeArr(spoils, oneSpoil)
        oneSpoil.Effect(this.player)
        if (context.stateInfo.spoils.resolve[oneSpoil.type])
          context.stateInfo.spoils.resolve[oneSpoil.type]++
        else context.stateInfo.spoils.resolve[oneSpoil.type] = 1
      }
    }

    if (this.player.Hp <= 0) {
      this.stop()
      this.resetButton.show()
    }
  }
}

export default GameWorld
module.exports = GameWorld
