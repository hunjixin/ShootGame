import ShotTypes from './ShotTypes.js'
import CommonShot from './CommonShot.js'
import EnemyShot from './EnemyShot.js'
import GzShot from './GzShot.js'
import UmbrellaShot from './UmbrellaShot.js'
import Bullet from './Bullet.js'
import Shot from './Shot.js'

class ShotorFactory {
  constructor (gameWorld) {
    this.gameWorld = gameWorld
  }
  CreateShot (ePlayer) {
    // ePlayer.shots.
    var shot
    switch (ePlayer.shotType.type) {
      case ShotTypes.umShot:
        shot = new UmbrellaShot(ePlayer, ePlayer.shotType.num)
        break
      case ShotTypes.gzShot:
        shot = new GzShot(ePlayer)
        break
      case ShotTypes.common:
        shot = new CommonShot(ePlayer)
        break
      case ShotTypes.enemyShot:
        shot = new EnemyShot(ePlayer)
        break
    }
    return shot.createShots(ePlayer)
  }
}

module.exports = {
  Bullet,
  Shot,
  ShotTypes,
ShotorFactory}
