import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'

import LosEvent from './LosEvent.js'
import { StateInfo, DebugSetting } from './Debug.js'
import ViewCoord from './coord/ViewCoord.js'
class EngineCore {
  constructor (_option) {
    this.option = {}
    this.clearTm
    this.drawTm
    this.moveTm
    this.checkTm
    this.create(_option)
  }
  create (_option) {
    // canvas context
    Object.assign(context, {
      currentOid: 0,
      stateInfo: new StateInfo(),
      setting: new DebugSetting(),
      tick: 0
    })
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
      var context=item.viewContext.drawContext  
      context.clearRect(0,0,context.canvas.width,context.canvas.height);  
    })

    context.UiObjectManager.forEach((item) => {
      item.render(item.viewContext.drawContext)
    })
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
