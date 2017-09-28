define(function (require, exports, module) {
  var MyEvent = require('event')
  var spoil = require('spoil')
  var eShape = require('eShape')
  var util = require('util')
  var resource = require('resource')
  var plain = require('plain')
  var context = require('context')
  var shotObj = require('shot')
  var uiComonent = require('uiComonent')
  var Debug = require('Debug')

  return function Engine () {
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

      option.ctxWidth = canvas.width = window.screen.width
      option.ctxHeight = canvas.height = window.screen.height
      Object.assign(context, {
        headOffset: 20,
        currentOid: 0,
        option: option,
        myevent: new MyEvent(),
        stateInfo: new Debug.StateInfo(),
        plainMoveState: plainMoveState,
        shotType: shotObj.shotTypes,
        setting: new Debug.DebugSetting(),
        spoilManager: new spoil.SpoilManager()
      })

      // events
      context.myevent.init(_option)
      // stage
      stageManager = new uiComonent.StageManager()
      stageManager.init()
      context.stageManager = stageManager

      // 设置按钮
      var settingButton = new uiComonent.Button({
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
      bar = new uiComonent.Bar({
        icon: resource.head,
        position: {x: -5,y: 0},
        width: option.ctxWidth + 10,
        height: context.headOffset,
        rightButton: settingButton
      })
      textBlock = new uiComonent.TextBlock({
        position: {
          x: 0,
          y: context.headOffset
        }
      })
      player = new plain.Player(true)
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
}
)
