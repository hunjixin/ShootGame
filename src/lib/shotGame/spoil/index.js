import GzShotSpoil from './GzShotSpoil.js'
import HpSpoil from './HpSpoil.js'
import Spoil from './Spoil.js'
import SpoilType from './SpoilType.js'
import UmShotSpoil from './UmShotSpoil.js'

class SpoilManager {
  constructor() {}
  createSpoil(obj) {
    if (Math.random() < 0.5) return undefined
    var types = Object.values(SpoilType)
    var t = types[(Math.random() * types.length).toString().charAt(0) - '0']
    var spoil
    switch (t) {
      case SpoilType.umShot:
        spoil = new UmShotSpoil(obj)
        break
      case SpoilType.gzShot:
        spoil = new GzShotSpoil(obj)
        break
      case SpoilType.addHp:
        spoil = new HpSpoil(obj)
        break
    }
    var factor = 5 * Math.random() * Math.sign(Math.random() - 0.5)
    spoil.setXPath(
      (x) => {
        return factor * (Math.cos(spoil._moveTick / 15) + Math.random() - 0.5)
      }
    )
    return spoil
  }
}

module.exports = {
  Spoil,
  GzShotSpoil,
  HpSpoil,
  SpoilType,
  UmShotSpoil,
  SpoilManager
}