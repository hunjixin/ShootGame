import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import EngineCore from '../lib/EngineCore.js'
import GameWorld from './GameWorld.js'
import {SpoilManager} from './spoil/'
import View from './View.js'

class ShotGame extends EngineCore  {
  constructor(option) {
    super(option)
    this.gameWorld=context.gameWorld=new GameWorld()
    context.spoilManager= new SpoilManager()
    context.viewManager.viewProvider.register("view",(args)=>{
      return new View(this.gameWorld,args)
    })
    context.viewManager.init()
    this.gameWorld.placeAtByView(context.viewManager.view)
  }
}


module.exports = ShotGame
export default ShotGame