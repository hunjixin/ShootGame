import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import Control from '../lib/ui/Control.js'
import EngineCore from '../lib/EngineCore.js'
import GameWorld from './GameWorld.js'
import LosEvent from '../lib/LosEvent.js'
import ViewContext from '../lib/common/ViewContext.js'
import StageManager from '../lib/StageManager.js'
import Rect from '../lib/shape/Rect.js'
import config from './View.config'

class ShotGame extends EngineCore {
  constructor (option) {
    super(option)

    this.gameWorld = context.gameWorld = new GameWorld({
      stageManager: new StageManager([
        {
          icon: resource.bg.bg1
        },
        {
          icon: resource.bg.bg1
        }
      ]),
      constraintAreas: [{
        x: this.bound.x - 100,
        y: this.bound.y - 100,
        width: this.bound.width + 100,
        height: this.bound.height + 100
      }]
    })

    var views = option.views
    this.createViews(views)

    this.gameWorld.stageManager.init()
  }
  createView (viewConfig) {
    super.createView(viewConfig)
    var viewOption = {}

    Object.assign(viewOption, {
      shape: new Rect(0, 0, this.canvas.width, this.canvas.height),
      viewContext: this.viewContext,
      stageConfig: {
        shape: new Rect(0, 20, this.canvas.width, this.canvas.height - 20),
        icon: resource.bg.bg1
      },
      stageManager: this.gameWorld.stageManager
    })

    var view = Control.getInstance({
      type: this.ViewConstructor(config),
      parameter: viewOption,
      optional: this.gameWorld
    })

    context.UiObjectManager.addView(view)
    return view
  }
}

module.exports = ShotGame
export default ShotGame
