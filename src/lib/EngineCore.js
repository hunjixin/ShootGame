import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'
import ViewContext from './common/ViewContext.js'
import LosEvent from './LosEvent.js'
import ViewCoord from './coord/ViewCoord.js'
class EngineCore {
  constructor (_option) {
    this.option = {}
    this.clearTm
    this.bound=this.getBound(_option.views)
    this.drawTm
    this.moveTm
    this.checkTm
  }
  Start () {
    // 拦截作用 必要时可以扩展出去
    var before = (callback) => {
      return () => {
        if (context.gameWorld.isRunning == 1) callback()
      }
    }

    this.drawTm = setInterval(() => {
      context.tick++
      this.draw()
    }, 50)

    this.checkTm = setInterval(before(() => {
      context.gameWorld.checkCollection()
    }), 50)

    this.moveTm = setInterval(before(() => {
      context.gameWorld.objectMove()
    }), 50)

    this.clearTm = setInterval(before(() => {
      context.gameWorld.clearObject()
    }), 5000)
  }
  draw () {
    context.UiObjectManager.forEach((item) => {
      var context = item.viewContext.drawContext
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    })

    context.UiObjectManager.forEach((item) => {
      item.render(item.viewContext.drawContext)
    })
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
    var canvasId = viewConfig.id

    this.canvas = document.getElementById(canvasId)
    var drawContext =  this.canvas.getContext('2d')
    this.canvas.width = viewConfig.width
    this.canvas.height = viewConfig.height

    this.viewContext = new ViewContext({
      id: canvasId,
      canvas: this.canvas,
      drawContext: drawContext,
      losEvent: new LosEvent(viewConfig.attachEvent)
    })
  }
  getBound(views){
    var lxs=views.map(a=>a.position.x)
    var rxs=views.map(a=>a.position.x+a.width)
    var tys=views.map(a=>a.position.y)
    var bys=views.map(a=>a.position.y+a.height)
    return {
      x:Math.min(...lxs),
      y:Math.min(...tys),
      width:Math.max(...rxs)-Math.min(...lxs),
      height:Math.max(...bys)-Math.min(...tys)
    }
  }
  ViewConstructor(viewConfig){
     if(util.isAndroid()){
        return viewConfig.android
     }else if(util.isIOS()){
      return viewConfig.ios
     }else if(util.isElectron()){
      return viewConfig.electron
     }else {
      return viewConfig.web
     }
  }
  destory () {
    context.stageManager.stage.destroy()
    context.gameWorld.destory()
    clearInterval(this.clearTm)
    clearInterval(this.drawTm)
    clearInterval(this.moveTm)
    clearInterval(this.checkTm)
  }
}
export default EngineCore
module.exports = EngineCore
