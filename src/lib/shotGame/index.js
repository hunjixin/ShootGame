import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

import BasePlain from './BasePlain.js'
import Boss from './Boss.js'
import Enemy from './Enemy.js'
import Player from './Player.js'

var createEnemy = function (type) {
  // 1 大飞机  2,3,4 小飞机
  if (type == 1) {
    var enemy = new Enemy(true)
    enemy.setShotInterVal(util.randInt(5, 15))
    enemy.position.x = context.viewManager.view.width * Math.random()
    enemy.position.y = 0 - enemy.width / 2
    enemy.speedY = util.randInt(3, 6)
    enemy.icon = resource.enes[type - 1]
    enemy.width = 40
    enemy.height = 60
    enemy.Hp = 20 + 10 * Math.random()
    enemy.collisionArea = [{
      x: 0,
      y: 0,
      width: enemy.width,
      height: enemy.height
    }]
    return enemy
  } else if (type == 2 || type == 3 || type == 4) {
    var enemy = new Enemy(context, true)
    enemy.setShotInterVal(util.randInt(5, 15))
    enemy.position.x = context.viewManager.view.width * Math.random()
    enemy.position.y = 0 - enemy.width / 2
    enemy.speedY = util.randInt(3, 6)

    enemy.icon = resource.enes[type - 1]
    enemy.width = 20
    enemy.height = 30
    enemy.Hp = 2 + 5 * Math.random()
    enemy.collisionArea = [{
      x: 0,
      y: 0,
      width: enemy.width,
      height: enemy.height
    }]
    return enemy
  } else {
    return new Boss()
  }
}



module.exports = {
  createEnemy,
  BasePlain,
  Boss,
  Enemy,
  Player
}