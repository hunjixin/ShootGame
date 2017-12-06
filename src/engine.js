import util from './lib/common/util.js'
import resource from './lib/common/resource.js'
import context from './lib/common/context.js'

import LosEvent from './lib/LosEvent.js'
import {ShotTypes} from './lib/shotGame/shot/'
import {SpoilManager} from './lib/shotGame/spoil/'
import {ViewManager} from './lib/View.js'
import {StateInfo,DebugSetting} from './lib/Debug.js'
import ViewCoord from './lib/coord/ViewCoord.js'

function Engine() {
  var option = {}

  var viewManager
  var drawContext

  this.Create = function (_option) {
    // canvas context
    var canvas = document.getElementById(_option.id)
    drawContext = canvas.getContext('2d')

    option.ctxWidth = canvas.width = window.document.body.clientWidth
    option.ctxHeight = canvas.height = window.document.body.clientHeight
    Object.assign(context, {
      headOffset: 20,
      currentOid: 0,
      option: option,
      losEvent: new LosEvent(_option),
      stateInfo: new StateInfo(),
      shotType: ShotTypes,
      setting: new DebugSetting(),
      spoilManager: new SpoilManager(),
      tick: 0
    })

    // view
    viewManager = new ViewManager()
    viewManager.init()
    context.viewManager = viewManager
  }

  /**
   * time
   */
  var clearTm
  var drawTm
  var moveTm
  var checkTm

  this.Start = function () {
    // 拦截作用 必要时可以扩展出去
    var before = function (callback) {
      return function () {
        if (viewManager.view.isRunning == 1) callback()
      }
    }

    drawTm = setInterval(function () {
      context.tick++
        draw()
    }, 50)

    checkTm = setInterval(before(function () {
      viewManager.view.checkCollection()
    }), 50)

    moveTm = setInterval(before(function () {
      viewManager.view.objectMove()
    }), 50)

    clearTm = setInterval(before(function () {
      viewManager.view.clearObject()
    }), 5000)
  }

  // 绘制
  var draw = function () {
    context.UiObjectManager.forEach((item) => {
      item.render(drawContext)
    })
  }

  /**
   * 清理函数
   */
  var destory = function () {
    viewManager.view.destroy()
    clearInterval(clearTm)
    clearInterval(drawTm)
    clearInterval(moveTm)
    clearInterval(checkTm)
  }

}

export default Engine
module.exports = Engine