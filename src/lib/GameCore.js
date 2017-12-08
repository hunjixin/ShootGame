import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'

import LosEvent from './LosEvent.js'
import { StateInfo, DebugSetting } from './Debug.js'
import ViewCoord from './coord/ViewCoord.js'
import ViewManager from './ViewManager.js'
class GameCore {
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
    context.viewManager = new ViewManager()
  }
  Start () {
    // 拦截作用 必要时可以扩展出去
    var before = (callback) => {
      return () => {
        if (context.viewManager.view.isRunning == 1) callback()
      }
    }

    this.drawTm = setInterval(() => {
      context.tick++
      this.draw()
    }, 50)

    this.checkTm = setInterval(before(() => {
      context.viewManager.view.checkCollection()
    }), 50)

    this.moveTm = setInterval(before(() => {
      context.viewManager.view.objectMove()
    }), 50)

    this.clearTm = setInterval(before(() => {
      context.viewManager.view.clearObject()
    }), 5000)
  }
  draw () {
    context.UiObjectManager.forEach((item) => {
      item.render(this.drawContext)
    })
  }

  destory () {
    context.viewManager.view.destroy()
    clearInterval(this.clearTm)
    clearInterval(this.drawTm)
    clearInterval(this.moveTm)
    clearInterval(this.checkTm)
  }
}
export default GameCore
module.exports = GameCore
