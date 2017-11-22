import util from './util.js'
import resource from './resource.js'
import context from './context.js'
import { Spoil, SpoilManager } from './lib/spoil.js'
import MyEvent from './lib/event.js'
import EObject from './lib/EObject.js'
import Modal from './lib/ui/Modal.js'

import { shotTypes, ShotorFactory, Bullet, Shot } from './lib/shot.js'
import { Bar,Button,TextBlock} from './lib/ui/UiControl.js'
import { Stage, StageManager } from './lib/Stage.js'
import { StateInfo, DebugSetting } from './lib/debug.js'

function Engine () {
  var option = {  }

  var stageManager
  var textBlock
  var drawContext
  var bar
  var viewRoot = []
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
          util.removeArr(viewRoot, modal)
        }
      })
      viewRoot.push(modal)
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
   for(var i=0;i<viewRoot.length;i++){
     viewRoot[i].render(drawContext)
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
module.exports=Engine

