import util from '../../common/util.js'
import resource from '../../common/resource.js'
import context from '../../common/context.js'
import Spoil from './Spoil.js'
import SpoilType from './SpoilType.js'

class GzShotSpoil extends Spoil {
    constructor (object) {
      super(object)
      this.spoiltype = SpoilType.gzShot
      this.icon = resource.g
    }
    Effect (targetPlayer) {
      if (targetPlayer.shotType.type == SpoilType.gzShot) {
        targetPlayer.shotType.num++
      }else {
        targetPlayer.shotType = {
          type: SpoilType.gzShot,
          num: 1
        }
      }
      targetPlayer.setShotInterVal(30 - 4 * targetPlayer.shotType.num, 2)
    }
  }

  export default GzShotSpoil
  module.exports =GzShotSpoil