import ShotTypes from './ShotTypes.js'
import CommonShot from './CommonShot.js'
import EnemyShot from './EnemyShot.js'
import GzShot from './GzShot.js'
import UmbrellaShot from './UmbrellaShot.js'
import Bullet from './Bullet.js'
import Shot from './Shot.js'
import Rect from '../../lib/shape/Rect.js'
class ShotorFactory {
  constructor (gameWorld) {
    this.gameWorld = gameWorld
  }
  CreateShot (ePlayer) {
    // ePlayer.shots.
    var shot
    switch (ePlayer.shotType.type) {
      case ShotTypes.umShot:
        shot = new UmbrellaShot(this.gameWorld, ePlayer.shotType.num)
        break
      case ShotTypes.gzShot:
        shot = new GzShot(this.gameWorld)
        break
      case ShotTypes.common:
        shot = new CommonShot(this.gameWorld)
        break
      case ShotTypes.enemyShot:
        shot = new EnemyShot(this.gameWorld)
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
