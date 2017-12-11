import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import EngineCore from '../lib/EngineCore.js'
import GameWorld from './GameWorld.js'
import LosEvent from '../lib/LosEvent.js'
import ViewContext from '../lib/common/ViewContext.js'
import View from './View.js'
import StageManager from '../lib/StageManager.js'
class ShotGame extends EngineCore {
  constructor (option) {
    super(option)

    this.gameWorld = context.gameWorld = new GameWorld({stageManager:new StageManager(this.gameWorld, [
      {
        icon: resource.bg.bg1
      },
      {
        icon: resource.bg.bg1
      }
    ])})

    var views = option.views
    this.gameWorld.constraintAreas = this.maxBound(views)
    this.createViews(views)

    this.gameWorld.stageManager.init()
  }
  maxBound (viewConfig) {
    var area = []
    if (!viewConfig) console.error('no view config')
    var x = []
    var y = []
    if (viewConfig instanceof Array) {
      viewConfig.forEach(config => {
        x.push(config.position.x)
        y.push(config.position.y)
        x.push(config.position.x + config.width)
        y.push(config.position.y + config.height)
      })
    }else {
      x.push(viewConfig.position.x)
      y.push(viewConfig.position.y)
      x.push(viewConfig.position.x + viewConfig.width)
      y.push(viewConfig.position.y + viewConfig.height)
    }
    area.push({
      x: Math.min(...x),
      y: Math.min(...y),
      width: Math.max(...x) - Math.min(...x),
      height: Math.max(...y) - Math.min(...y)
    })
    return area
  }
  createViews (viewConfig) {
    var views = []
    if (!viewConfig) console.error('no view config')
    if (viewConfig instanceof Array) {
      viewConfig.forEach(config => {
        views.push(this.createView(config))
      })
    }else {
      views.push(this.createView(viewConfig))
    }
    return views
  }
  createView (viewConfig) {
    var viewContext = new ViewContext()
    var canvasId = viewConfig.id

    var canvas = document.getElementById(canvasId)
    var drawContext = canvas.getContext('2d')
    canvas.width = viewConfig.width
    canvas.height = viewConfig.height

    Object.assign(viewContext,{
      id: canvasId,
      canvas: canvas,
      screenWidth: canvas.width,
      screenHeight: canvas.height,
      drawContext: drawContext
    })
    var viewOption={}
    viewContext.losEvent = new LosEvent(viewContext, viewConfig.attachEvent)
    Object.assign(viewOption, {
      width: canvas.width,
      height: canvas.height,
      position: {x: 0,y: 0},
      viewContext: viewContext,
      stageConfig: {
        position: {x: 0,y: 20},
        width: canvas.width,
        height: canvas.height - 20,
        icon: resource.bg.bg1
      },
      stageManager: this.gameWorld.stageManager
    })
    var view = new View(viewOption, this.gameWorld)
    viewContext.view=view
    context.UiObjectManager.addView(view)
    return view
  }

}

module.exports = ShotGame
export default ShotGame
