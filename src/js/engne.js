import util from './util.js'
import resource from './resource.js'
import context from './context.js'
import { Spoil, SpoilManager } from './lib/spoil.js'
import MyEvent from './lib/event.js'
import eShape from './lib/eShape.js'
import { Player } from './lib/plain.js'
import { shotTypes, ShotorFactory, Bullet, Shot } from './lib/shot.js'
import { Stage, Button, Bar, TextBlock, StageManager } from './lib/uiComonent.js'
import { StateInfo, DebugSetting } from './lib/debug.js'

function Engine () {
  var option = {  }

  var plainMoveState = {
    isMouseDown: false,
    position: {x: 0,y: 0}
  }

  var player
  var bar
  var stageManager
  var textBlock
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
      myevent: new MyEvent(),
      stateInfo: new StateInfo(),
      plainMoveState: plainMoveState,
      shotType: shotTypes,
      setting: new DebugSetting(),
      spoilManager: new SpoilManager()
    })

    // events
    context.myevent.init(_option)
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
      icon: resource.setting
    })
    settingButton.on('click', function (eventInfo) {
      stageManager.stage.stop()
      _option.showConsoleView(function () {
        stageManager.stage.restart()
      })
    })
    // bar
    bar = new Bar({
      icon: resource.head,
      position: {x: -5,y: 0},
      width: option.ctxWidth + 10,
      height: context.headOffset,
      rightButton: settingButton
    })
    textBlock = new TextBlock({
      position: {
        x: 0,
        y: context.headOffset
      }
    })
    player = new Player(true)
    context.player = player
    player.setShotInterVal(1)
    // 注册事件
    // 玩家开始移动
    player.on('mouseDown', function (eventInfo) {
      if (stageManager.stage.isRunning == 1)  plainMoveState.isMouseDown = true
    })
    // 玩家停止移动
    stageManager.stage.on('mouseUp', function (eventInfo) {
      if (stageManager.stage.isRunning == 1)  plainMoveState.isMouseDown = false
    })
    // 玩家移动中
    stageManager.stage.on('mouseMove', function (eventInfo) {
      if (stageManager.stage.isRunning == 1 && plainMoveState.isMouseDown === true) {
        player.position.x = eventInfo.position.x - player.width / 2
        player.position.y = eventInfo.position.y - player.height / 2 - context.headOffset
      }
    })
    _option.initConsoleView(context)
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

    drawTm = setInterval(draw, 50)

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
    // stage
    stageManager.stage.render(drawContext)
    // head
    bar.render(drawContext)
    // 绘制文本
    if (context.setting.isDebug.value) {
      textBlock.setText(context.stateInfo.getDebugArray())
      textBlock.render(drawContext)
    }
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
