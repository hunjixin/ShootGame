import util from '../../common/util.js'
import resource from '../../common/resource.js'
import context from '../../common/context.js'
import Spoil from './Spoil.js'
import SpoilType from './SpoilType.js'
class UmShotSpoil extends Spoil {
  constructor(object) {
    super(object)
    this.spoiltype = SpoilType.umShot
    this.icon = resource.u
  }
  Effect(targetPlayer) {
    if (targetPlayer.shotType.type == SpoilType.umShot) {
      if (targetPlayer.shotType.num > 7) {
        targetPlayer.shotEx++
      } else {
        targetPlayer.shotType.num++
      }
    } else {
      targetPlayer.shotType = {
        type: SpoilType.umShot,
        num: 1
      }
    }

    targetPlayer.setShotInterVal(2)
  }
}


export default UmShotSpoil
module.exports = UmShotSpoil