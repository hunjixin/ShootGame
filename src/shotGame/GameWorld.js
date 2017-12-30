import GameWorldCore from '../lib/GameWorldCore.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import { SpoilManager } from './spoil/'
import { Boss, Player, EnemyFactory } from './index.js'
import { ShotorFactory, Bullet, Shot } from './shot/'
import Rect from '../lib/shape/Rect.js'
import {DebugSetting} from '../lib/Debug.js'

class GameWorld extends GameWorldCore {
  constructor (option) {
    super(option)
    this.stageManager = option.stageManager
    this.stageManager.gameWorld = this
    this.debugInfo=new DebugSetting()
    this.shots = []
    this.enemies = []
    this.bullets = []
    this.spoils = []
    this.boss
    this.hasCreateBoss = false

    this.spoilManager = new SpoilManager(this)
    this.player = new Player({
      gameWorld: this,
      icon: resource.plainImg,
      shape:new Rect(0,0,40,34),
      AllHp: 12,
      hp: this.AllHp,
      shotType : {
        type: 'umShot',
        num: 5
      }
      
    })
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
  createSpoil (enemy) {
    // 判断是否产生战利品
    var spoil = this.spoilManager.createSpoil(enemy)
    if (spoil) {
      this.spoils.push(spoil)
    }
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
    }

    this.update()

    this.player.update()
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
        if (oneShot.isDie || !util.inArea(oneShot.shape.getCenter(), constraintArea)) {
          util.removeArr(shots, oneShot)
        }
      }

      for (var i = enemies.length - 1; i > -1; i--) {
        var enemy = enemies[i]
        if (enemy.isDie) {
          util.removeArr(enemies, enemy)
          continue
        }
        if (!util.inArea(enemy.shape.getCenter(), constraintArea)) {
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
    canvas.height = stage.shape.height/stage.gameWorldOffset.scaleY
    canvas.width = stage.shape.width/stage.gameWorldOffset.scaleX
    // 背景
    drawContext.drawImage(this.stageManager.getCurrenStageConfig().icon,
     stage.gameWorldOffset.x, stage.gameWorldOffset.y, canvas.width,canvas.height,
      0, 0, canvas.width,canvas.height)
    // 子弹
    this.shots.forEach(shot => {
      if (!shot.isDie) {
        this.renderObject(stage,drawContext,shot)
      }
    })
    // 飞机
    this.renderObject(stage,drawContext,this.player)
    // 敌军
    this.enemies.forEach(enemy => {
      if (!enemy.isDie) {
        this.renderObject(stage,drawContext,enemy)
      }
    })
    // 战利品
    this.spoils.forEach(spoil => {
      if (!spoil.isDie) {
        this.renderObject(stage,drawContext,spoil)
      }
    })
    // 死亡
    this.bullets.forEach(bullet => {
      if (!bullet.isDie) {
        this.renderObject(stage,drawContext,bullet)
      }
    })
    return canvas
  }
  // 销毁
  destroy () {
    super.destroy()
    this.player.destroy()
  }

  stop () {
    super.stop()
  }
  restart () {
    super.restart()
    this.reset()
  }
  start () {
    super.start()
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
    this.boss = new Boss({
      gameWorld: this,
      shape:new Rect(
        this.viewContext.screenWidth * 0.5,
        0,
        this.viewContext.screenWidth * 0.6,
        this.shape.width * 0.6,
      ),
      speedY: 0,
      icon: resource.enes[1],
      hp: 200 + 200 * Math.random(),
      shotType :{
        type: 'umShot',
        num: 4
      }
    })
    var factor = 5 * Math.random()
    this.boss.setXPath(
      (x) => {
        return factor * (Math.cos(this.boss._moveTick / 15))
      }
    )
    this.boss.setShotInterVal(util.randInt(10, 20))
    this.enemies.push(this.boss)
  }
  // 世界更新
  update () {
    if (Math.random() < 0.07) // 百分之七生成敌军
    {
      var rad = Math.random() * 3 + ''
      var newEmeny = this.ememyFactory.createEnemy(parseInt(rad.charAt(0)) + 2)
      this.enemies.push(newEmeny)
    }

    if (Math.random() < 0.01) // 百分之一生成强力敌军
    {
      var newEmeny = this.ememyFactory.createEnemy(1)
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
    var enemies = this.enemies
    var shots = this.shots
    var bullets = this.bullets
    var spoils = this.spoils

    for (var i = enemies.length - 1; i > -1; i--) {
      var enemy = enemies[i]
      if (enemy.isDie) continue
      var enemyRect = enemy.shape
      // 检查子弹和飞机的碰撞
      for (var j = shots.length - 1; j > -1; j--) {
        var oneShot = shots[j]
        if (oneShot.isDie) continue
        if (this.player.Oid == oneShot.belong) {
           if(enemy.isCollide(oneShot)){
            enemy.hp = enemy.hp - oneShot.attack * this.player.shotEx
            oneShot.hp--
            if (enemy.hp <= 0) {
              this.createSpoil(enemy)
              this.killEnemy(enemy)
            }
            // 子弹生命  穿甲弹
            if (oneShot.hp <= 0) {
              this.killShot(oneShot)
            }
           }
        }
      }
      // 检查玩家和飞机的碰撞
      if (this.player.isCollide(enemy)) {
        enemy.hp--
        this.player.hp--
        if (enemy.hp <= 0) {
          this.killEnemy(enemy)
        }
      }
    }

    // 检查玩家是否被击中
    for (var j = shots.length - 1; j > -1; j--) {
      var oneShot = shots[j]
      if (oneShot.isDie) continue
      if (this.player.Oid != oneShot.belong) {
          if( this.player.isCollide(oneShot)){
            var enemy = this.findEnemyByOid(oneShot.belong)
            var shotEx = enemy ? enemy.shotEx : 1
            this.player.hp = this.player.hp - oneShot.attack * shotEx
            oneShot.hp--
            if (oneShot.hp <= 0) {
              this.killShot(oneShot)
            }
          }
      }
    }

    // 检查玩家是否获取战利品
    for (var j = spoils.length - 1; j > -1; j--) {
      var oneSpoil = spoils[j]
      if (oneSpoil.isDie) continue
      if (this.player.isCollide(oneSpoil)) {
        this.removeSpoil(oneSpoil)
        oneSpoil.Effect(this.player)
      }
    }

    if (this.player.hp <= 0) {
      this.stop()
    }
  }

  killEnemy(enemy){
    enemy.isDie = true
    util.removeArr(this.enemies, enemy)
  }
  killShot(shot){
    shot.isDie = true
    util.removeArr(this.shots, shot)
  }
  removeSpoil(spoil){
    spoil.isDie = true
    util.removeArr(this.spoils, spoil)
  }
  renderObject(stage,drawContext,item){
    item.render(drawContext, stage.getPositiveShape(item))
  }
}

export default GameWorld
module.exports = GameWorld
