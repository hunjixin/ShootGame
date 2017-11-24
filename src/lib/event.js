import util from './common/util.js'
import context from './common/context.js'


  function MyEvent () {
    var that=this
    // Do setup work here
    // 此类型用于事件转换
    this.eventRelative = {
      click: [],
      mouseDown: [],
      mouseUp: [],
      mouseMove: [],
      keyUp:[],
      // 附加事件中 object-action-callback
      attachEvent: function (target, action, callback) {
        var eventMsg = {target: target,callback: callback}
        var funcs = this[action]
        if (!funcs) throw new Error('not support event')

        if(funcs.length==0) {
          funcs.push(eventMsg)
        }else{
          for(var i=0;i<funcs.length;i++)  {
            if(eventMsg.target.zIndex>=funcs[i].target.zIndex)  {
              funcs.splice(i, 0, eventMsg); // 
              return;
            }
          }
        }
      },
      detachEvent: function (target, action) {
        var funcs = this[action]
        for (var i = 0;i < funcs.length;i++) {
          if (funcs[i].target == target) {
            util.removeArr(funcs, funcs[i])
          }
        }
      },
      // 触发事件中 action-eventInfo
      triggerEvent: function (action, eventInfo) {
        var funcs = this[action]
        if (!funcs) throw new Error('not support event')
        for (var i = 0;i < funcs.length;i++) {
          if (funcs[i].target.isDisplay && util.isEffect(funcs[i].target, action, eventInfo)) {
            funcs[i].callback(funcs[i].target, eventInfo)
            return;
          }
        }
      },
      triggerKeyEvent:function (action, eventInfo) {
        var funcs = this[action]
        if (!funcs) throw new Error('not support event')
        for (var i = 0;i < funcs.length;i++) {
          if (funcs[i].target.isDisplay) {
            funcs[i].callback(funcs[i].target, eventInfo)
          }
        }
      }
    }

    // 外部事件转内部事件驱动  
    // 包装按键按下，抬起，移动事件
    this.pacakgeEvent = function (event) {
      var evnetInfo = {
        position: {x: 0,y: 0}
      }
      if (util.isAndroid()) {
        evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
        evnetInfo.position.y = event.gesture.center.pageY, context.option,context.headOffset
      }else if(util.isElectron()){
        evnetInfo.position.x = event.pageX
        evnetInfo.position.y = event.pageY, context.option,context.headOffset
      }
      else {
        evnetInfo.position.x = event.offsetX
        evnetInfo.position.y = event.offsetY,context.option, context.headOffset
      }
      return evnetInfo
    }
    // 包装单击事件
    this.pacakgeClick = function (event) {
      var evnetInfo = {
        position: {x: 0,y: 0}
      }
   
      if (util.isAndroid()) {
        evnetInfo.position.x = event.pageX - event.target.offsetLeft
        evnetInfo.position.y = event.y
      }else if(util.isElectron()){
        evnetInfo.position.x = event.pageX 
        evnetInfo.position.y = event.pageY
      }
      else {
        evnetInfo.position.x = event.offsetX
        evnetInfo.position.y = event.offsetY
      }
      return evnetInfo
    }

    // 移动事件
    var moveFunc = (function () {
      return function () {
        that.eventRelative.triggerEvent('mouseMove', that.pacakgeEvent(arguments[0]))
      }
    })()
    // 按下事件
    var moveDownFunc = (function () {
      return function () {
        that.eventRelative.triggerEvent('mouseDown', that.pacakgeEvent(arguments[0]))
      }
    })()
    // 抬起事件
    var moveUpFunc = (function () {
      return function () {
        that.eventRelative.triggerEvent('mouseUp', that.pacakgeEvent(arguments[0]))
      }
    })()
    // 点击事件
    var clickFunc = (function () {
      return function () {
        that.eventRelative.triggerEvent('click', that.pacakgeClick(arguments[0]))
      }
    })()
    //点击事件
    var keyUpFunc = (function () {
      return function () {
        that.eventRelative.triggerKeyEvent('keyUp', arguments[0])
      }
    })()
    // 事件输入
    this.EventInput = {
      mouseDown: moveDownFunc,
      mouseUp: moveUpFunc,
      click: clickFunc,
      move: moveFunc,
      keyUp:keyUpFunc
    }
    this.init = function (_option) {
      _option.attachEvent.click = this.EventInput.click
      _option.attachEvent.move = this.EventInput.move
      _option.attachEvent.mouseDown = this.EventInput.mouseDown
      _option.attachEvent.mouseUp = this.EventInput.mouseUp
      _option.attachEvent.keyUp = this.EventInput.keyUp
    }
  }

  module.exports = MyEvent
