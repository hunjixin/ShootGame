
import resource from '../../lib/common/resource.js'
import context from '../../lib/common/context.js'
import Spoil from './Spoil.js'
import SpoilType from './SpoilType.js'

class HpSpoil extends Spoil {
  constructor(object) {
    super(object)
    this.spoiltype = SpoilType.addHp
    this.icon = resource.hp
  }
  Effect(targetPlayer) {
    if (targetPlayer.Hp < targetPlayer.AllHp) targetPlayer.Hp++
  }
}

export default HpSpoil
module.exports = HpSpoil