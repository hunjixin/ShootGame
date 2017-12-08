import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import GameCore from '../lib/GameCore.js'
import {SpoilManager} from './spoil/'
import View from './View.js'
class ShotGame extends GameCore  {
  constructor(option) {
    super(option)
    context.spoilManager= new SpoilManager()
    context.viewManager.viewProvider.register("view",(args)=>{
      return new View(args)
    })
    context.viewManager.init()
  }
}


module.exports = ShotGame
export default ShotGame