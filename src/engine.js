import util from './lib/common/util.js'
import resource from './lib/common/resource.js'
import context from './lib/common/context.js'

import LosEvent from './lib/LosEvent.js'
import EObject from './lib/EObject.js'
import { ShotTypes } from './lib/shotGame/shot/'
import { Spoil, SpoilManager } from './lib/shotGame/spoil/'
import { Bar, Button, Modal, TextBlock } from './lib/ui/'
import { Stage, StageManager } from './lib/Stage.js'
import { StateInfo, DebugSetting } from './lib/Debug.js'

function Engine () {
  var option = {  }

  var stageManager
  var textBlock
  var drawContext
  var bar
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
    // stage
    stageManager = new StageManager()
    stageManager.init()
    context.stageManager = stageManager

    // 设置按钮
    var settingButton = new Button({
      name: 'setting',
      position: {
        x: context.option.ctxWidth - context.headOffset,
        y: 2
      },
      width: context.headOffset,
      height: context.headOffset - 4,
      icon: resource.setting,
      event: {
        'click': function (eventInfo) {
          stageManager.stage.stop()
          var modal = new Modal({
            title: '设置页面',
            position: {
              x: 10,
              y: context.option.ctxHeight / 4
            },
            width: context.option.ctxWidth - 20,
            height: context.option.ctxHeight / 2,
            zIndex: 2,
            confirm: function () {
              stageManager.stage.restart()
            },
            cancel: function () {
              stageManager.stage.restart()
            }
          })
          context.objectManager.addElement(modal)
        }
      }
    })

    // bar
    bar = new Bar({
      icon: resource.head,
      position: {x: -5,y: 0},
      width: option.ctxWidth + 10,
      height: context.headOffset,
      children: [settingButton]
    })
    textBlock = new TextBlock({
      position: {
        x: 0,
        y: context.headOffset
      }
    })
    context.objectManager.addElement(bar)
    context.objectManager.addElement(textBlock)
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
        if (stageManager.stage.isRunning == 1)  callback()
      }
    }

    drawTm =setInterval(function () {
      context.tick++
      draw()
    }, 50)

    checkTm = setInterval(before(function () {
      stageManager.stage.checkCollection()
    }), 50)

    moveTm = setInterval(before(function () {
      stageManager.stage.objectMove()
    }), 50)

    clearTm = setInterval(before(function () {
      stageManager.stage.clearObject()
    }), 5000)
  }
  // 绘制
  var draw = function () {
    // 绘制文本
    /*if (context.setting.isDebug.value) {
      textBlock.setText(context.stateInfo.getDebugArray())
      textBlock.render(drawContext)
    }*/

    context.objectManager.forEach((item) => {
      item.render(drawContext)
    })
  }
  /**
   * 清理函数
   */
  var destory = function () {
    stageManager.stage.destroy()
    clearInterval(clearTm)
    clearInterval(drawTm)
    clearInterval(moveTm)
    clearInterval(checkTm)
  }
}

export default Engine
module.exports = Engine
