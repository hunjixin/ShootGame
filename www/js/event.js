define(['util'], function (util) {
  function MyEvent (option,_context) {
    var that=this
    // Do setup work here
    // 此类型用于事件转换
    this.eventRelative = {
      click: [],
      mouseDown: [],
      mouseUp: [],
      mouseMove: [],
      // 附加事件中 object-action-callback
      attachEvet: function (target, action, callback) {
        var eventMsg = {target: target,callback: callback}
        var funcs = this[action]
        if (!funcs) throw new Error('not support event')
        funcs.push(eventMsg)
      },
      detachEvent: function (target, action) {
        var funcs = this[action]
        for (var i = 0;i < funcs.length;i++) {
          if (funcs[i].target == target) {
            Util.removeArr(funcs, funcs[i])
          }
        }
      },
      // 触发事件中 action-eventInfo
      triggerEvent: function (action, eventInfo) {
        var funcs = this[action]
        if (!funcs) throw new Error('not support event')
        for (var i = 0;i < funcs.length;i++) {
          if (funcs[i].target.isDisplay && Util.isEffect(funcs[i].target, action, eventInfo)) {
            funcs[i].callback(funcs[i].target, eventInfo)
          }
        }
      }
    }

    // 外部事件转内部事件驱动  
    // 包装按键按下，抬起，移动事件
    this.pacakgeEvent = function (event,) {
      var evnetInfo = {
        position: {x: 0,y: 0}
      }
      if (util.isAndroid()) {
        evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
        evnetInfo.position.y = util.sceneYTransform(event.gesture.center.pageY, option,_context.headOffset)
      }else {
        evnetInfo.position.x = event.offsetX
        evnetInfo.position.y = util.sceneYTransform(event.offsetY,option, _context.headOffset)
      }
      return evnetInfo
    }
    // 包装单击事件
    this.pacakgeClick = function (event,) {
      var evnetInfo = {
        position: {x: 0,y: 0}
      }

      if (util.isAndroid()) {
        evnetInfo.position.x = event.pageX - event.target.offsetLeft
        evnetInfo.position.y = Util.sceneYTransform(event.pageY,option, _context.headOffset)
      }else {
        evnetInfo.position.x = event.offsetX
        evnetInfo.position.y = Util.sceneYTransform(event.offsetY,option, _context.headOffset)
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
    // 事件输入
    this.EventInput = {
      mouseDown: moveDownFunc,
      mouseUp: moveUpFunc,
      click: clickFunc,
      move: moveFunc
    }
    this.init = function (_option) {
      if (util.isAndroid) {
        _option.attachEvent.click = this.EventInput.click
        _option.attachEvent.move = this.EventInput.move
        _option.attachEvent.mouseDown = this.EventInput.mouseDown
        _option.attachEvent.mouseUp = this.EventInput.mouseUp
      }else {
        _option.attachEvent.onclick = this.EventInput.click
        _option.attachEvent.onmousemove = this.EventInput.move
        _option.attachEvent.onmousedown = this.EventInput.mouseDown
        _option.attachEvent.onmouseup = this.EventInput.mouseUp
      }
    }
  }

  return MyEvent
})
