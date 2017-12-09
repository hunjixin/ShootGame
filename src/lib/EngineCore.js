import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'

import LosEvent from './LosEvent.js'
import { StateInfo, DebugSetting } from './Debug.js'
import ViewCoord from './coord/ViewCoord.js'
import ViewManager from './ViewManager.js'
class EngineCore {
  constructor (_option) {
    this.option = {}
    this.drawContext
    this.clearTm
    this.drawTm
    this.moveTm
    this.checkTm
    this.create(_option)
  }
  create (_option) {
    // canvas context
    var canvas = document.getElementById(_option.id)
    this.drawContext = canvas.getContext('2d')

    this.option.ctxWidth = canvas.width = window.document.body.clientWidth
    this.option.ctxHeight = canvas.height = window.document.body.clientHeight
    Object.assign(context, {
      headOffset: 20,
      currentOid: 0,
      option: this.option,
      losEvent: new LosEvent(_option),
      stateInfo: new StateInfo(),
      setting: new DebugSetting(),
      tick: 0
    })

    // view
    context.viewManager = new ViewManager(this)
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
      context.gameWorld.clearObject(context.viewManager.view)
    }), 5000)
  }
  draw () {
    context.UiObjectManager.forEach((item) => {
      item.render(context.viewManager.view,this.drawContext)
    })
  }

  destory () {
    context.viewManager.view.destroy()
    context.gameWorld.destory()
    clearInterval(this.clearTm)
    clearInterval(this.drawTm)
    clearInterval(this.moveTm)
    clearInterval(this.checkTm)
  }
}
export default EngineCore
module.exports = EngineCore
