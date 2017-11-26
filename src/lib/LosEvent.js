import util from './common/util.js'
import context from './common/context.js'
import lodash from 'lodash'
class LosEvent {
  constructor (_option) {
    // super()
    this.eventContainer = []
    this.init(_option)
    this.focusTarget
    this.eventType = ['click', 'move', 'mouseDown', 'mouseUp', 'keyUp', 'lostFocus', 'focus']
  }
  init (_option) {
    _option.attachEvent.click = this.clickFunc()
    _option.attachEvent.move = this.moveFunc()
    _option.attachEvent.mouseDown = this.moveDownFunc()
    _option.attachEvent.mouseUp = this.moveUpFunc()
    _option.attachEvent.keyUp = this.keyUpFunc()
  }
  hasTarget (target) {
    return lodash.filter(this.eventContainer, (item) => {
        return item.target == target
      }).length > 0
  }
  findTarget (target) {
    return lodash.filter(this.eventContainer, (item) => {
      return item.target == target
    })[0]
  }
  // 附加事件中 object-action-callback
  attachEvent (target, action, callback) {
    if (!this.hasTarget(target))
      this.eventContainer.push({target: target,actions: []})
    var actions = this.findTarget(target).actions
    if (-1 === actions.indexOf(action))  actions.push(action)
  }
  deAttchEvent (target, action, funcs) {
    var items = this.findTarget(target)

    if (action) {
      for (var i = 0;i < items.actions.length;i++) {
        if (items.actions[i] == action) {
          if (funcs) {
            util.removeArr(items.target[action], funcs)
          }else {
            util.removeArr(items.actions, items.actions[i])
            return
          }
        }
      }
    }else {
      this.deAttchAllEvent(items)
    }
  }
  deAttchAllEvent (target) {
    util.removeArr(this.eventContainer , target)
  }
  // 触发事件中 action-eventInfo
  triggerEvent (action, eventInfo) {
    var targets = lodash.filter(this.eventContainer, (item) => {
      return item.target.isDisplay
        && util.isEffect(item.target, action, eventInfo)
        && item.actions.indexOf(action) > -1
    })

    if (targets.length == 0) {
      return
    }
    else if (targets.length > 1) {
      targets.sort((a, b) => b.target.zIndex - a.target.zIndex)
    }
    this.invokeEventListiner(targets[0].target, action, eventInfo)

    if (action == 'click') {
      if (this.focusTarget) this.invokeEventListiner(this.focusTarget, 'lostFocus', eventInfo)
      this.focusTarget = targets[0].target
      this.invokeEventListiner(targets[0].target, 'focus', eventInfo)
    }
  }
  invokeEventListiner (target, action, eventInfo) {
    if (target[action] && target[action] instanceof Array) {
      target[action].forEach(func => {
        if (func instanceof Function) {
          func(target, eventInfo)
        }
      })
    }
  }
  triggerKeyEvent (action, eventInfo) {
    var targets = lodash.filter(Object.keys(this.eventContainer), (key) => {
      return this.eventContainer[key].isDisplay && this.eventContainer[key].indexOf(action) > -1
    })
    targets[0][action].forEach(func => {
      func(targets[0], eventInfo)
    })
  }

  // 外部事件转内部事件驱动  
  // 包装按键按下，抬起，移动事件
  pacakgeEvent (event) {
    var evnetInfo = {
      position: {x: 0,y: 0}
    }
    if (util.isAndroid()) {
      evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
      evnetInfo.position.y = event.gesture.center.pageY, context.option, context.headOffset
    }else if (util.isElectron()) {
      evnetInfo.position.x = event.pageX
      evnetInfo.position.y = event.pageY, context.option, context.headOffset
    }else {
      evnetInfo.position.x = event.offsetX
      evnetInfo.position.y = event.offsetY, context.option, context.headOffset
    }
    return evnetInfo
  }
  // 包装单击事件
  pacakgeClick (event) {
    var evnetInfo = {
      position: {x: 0,y: 0}
    }

    if (util.isAndroid()) {
      evnetInfo.position.x = event.pageX - event.target.offsetLeft
      evnetInfo.position.y = event.y
    }else if (util.isElectron()) {
      evnetInfo.position.x = event.pageX
      evnetInfo.position.y = event.pageY
    }else {
      evnetInfo.position.x = event.offsetX
      evnetInfo.position.y = event.offsetY
    }
    return evnetInfo
  }

  // 移动事件
  moveFunc () {
    return (eventInfo) => {
      this.triggerEvent('mouseMove', this.pacakgeEvent(eventInfo))
    }
  }
  // 按下事件
  moveDownFunc () {
    return (eventInfo) => {
      this.triggerEvent('mouseDown', this.pacakgeEvent(eventInfo))
    }
  }
  // 抬起事件
  moveUpFunc () {
    return (eventInfo) => {
      this.triggerEvent('mouseUp', this.pacakgeEvent(eventInfo))
    }
  }
  // 点击事件
  clickFunc () {
    return (eventInfo) => {
      this.triggerEvent('click', this.pacakgeClick(eventInfo))
    }
  }
  // 点击事件
  keyUpFunc () {
    return (eventInfo) => {
      this.triggerEvent('keyUp', eventInfo)
    }
  }
}

module.exports = LosEvent
