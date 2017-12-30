import util from '../lib/common/util.js'
import resource from '../lib/common/resource.js'
import context from '../lib/common/context.js'

import BasePlain from './BasePlain.js'
import Boss from './Boss.js'
import Enemy from './Enemy.js'
import Player from './Player.js'
import Rect from '../lib/shape/Rect.js'
class EnemyFactory {
  constructor (gameWorld) {
    this.gameWorld = gameWorld
  }
  createEnemy (type) {
    this.width = this.gameWorld.constraintAreas[0].width
    // 1 大飞机  2,3,4 小飞机
    if (type == 1) {
      var enemy = new Enemy({
        gameWorld: this.gameWorld,
        shape:new Rect(
          this.width * Math.random(),
          -30,
          40,
          60
        ),
        speedY: util.randInt(3, 6),
        icon: resource.enes[type - 1],
        hp: 20 + 10 * Math.random()
      }, true)
      enemy.setShotInterVal(util.randInt(5, 15))
      return enemy
    } else if (type == 2 || type == 3 || type == 4) {
      var enemy = new Enemy({
        gameWorld: this.gameWorld,
        shape:new Rect(
          this.width * Math.random(),
          -15,
          20,
          30
        ),
        speedY: util.randInt(3, 6),
        icon: resource.enes[type - 1],
        hp: 2 + 5 * Math.random()
      }, true)
      enemy.setShotInterVal(util.randInt(5, 15))
      return enemy
    } else {
      var boss = new Boss()
      boss.gameWorld = gameWorld
      return boss
    }
  }
}

module.exports = {
  EnemyFactory,
  BasePlain,
  Boss,
  Enemy,
Player}
