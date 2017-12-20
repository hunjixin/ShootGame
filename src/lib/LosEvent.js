import util from './common/util.js'
import context from './common/context.js'
import lodash from 'lodash'
import EventWell from './common/EventWell.js'
import MessageEmitter from './MessageEmitter.js'

class LosEvent {
  constructor (attachEvent) {
    // super()
    this.eventContainer = []
    this.init(attachEvent)
    this.focusTarget
    this.clickWell = new EventWell(this, 2)
    this.keyWell = new EventWell(this, 3)
    this.eventType = ['click', 'move', 'mouseDown', 'mouseUp', 'keyUp', 'lostFocus', 'focus']
    this.messageEmitter = new MessageEmitter()
  }
  init (attachEvent) {
    attachEvent.click = this.clickFunc()
    attachEvent.move = this.moveFunc()
    attachEvent.mouseDown = this.moveDownFunc()
    attachEvent.mouseUp = this.moveUpFunc()
    attachEvent.keyUp = this.keyUpFunc()
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
    if (!this.hasTarget(target)) {
      this.eventContainer.push({
        target: target,
        actions: []
      })
      this.eventContainer.sort((b, a) => a.target.zIndex - b.target.zIndex)
    }
    var actions = this.findTarget(target).actions
    if (-1 === actions.indexOf(action)) {
      actions.push(action)
    }
  }
  deAttchEvent (target, action, funcs) {
    var items = this.findTarget(target)

    if (action) {
      for (var i = 0; i < items.actions.length; i++) {
        if (items.actions[i] == action) {
          if (funcs) {
            util.removeArr(items.target[action], funcs)
          } else {
            util.removeArr(items.actions, items.actions[i])
            return
          }
        }
      }
    } else {
      this.deAttchAllEvent(items)
    }
  }
  deAttchAllEvent (target) {
    util.removeArr(this.eventContainer, target)
  }
  // 触发事件中 action-eventInfo
  triggerEvent (action, eventInfo) {
    var that = this
    var targets = lodash.filter(this.eventContainer, (item) => {
      if (!item) return
      var viewShape = item.target.getAbsoluteShape(context.currentStage)
      var isEffect = item.target.isDisplay &&
      util.inArea(eventInfo.position, viewShape)

      if (isEffect && item.target[action]) {
        this.invokeEventListiner(item.target, action, eventInfo)
      }
      return isEffect
    })

    if (targets.length > 0 && action == 'click') {
      if (this.focusTarget) this.invokeEventListiner(this.focusTarget, 'lostFocus', eventInfo)
      this.focusTarget = targets[0].target
      this.invokeEventListiner(targets[0].target, 'focus', eventInfo)

      this.clickWell.attach({ action, eventInfo})
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
  triggerNamedEvent (action, eventInfo) {
    var targets = lodash.filter(this.eventContainer, (item) => {
      return item.target.isDisplay &&
        item.target.isFocus &&
        item.actions.indexOf(action) > -1
    })
    if (targets.length == 0) return
    targets.forEach((targetItem) => {
      this.invokeEventListiner(targetItem.target, action, eventInfo)
    })
  }
  triggerKeyEvent (action, eventInfo) {
    var targets = lodash.filter(this.eventContainer, (item) => {
      return item.target.isDisplay &&
        item.actions.indexOf(action) > -1
    })
    if (targets.length == 0) return
    targets.forEach((targetItem) => {
      this.invokeEventListiner(targetItem.target, action, eventInfo)
      this.keyWell.attach({
        action: eventInfo.key,
      eventInfo})
    })
  }
  // 外部事件转内部事件驱动  
  // 包装按键按下，抬起，移动事件
  pacakgeEvent (event) {
    var evnetInfo = {
      position: {
        x: 0,
        y: 0
      }
    }
    if (util.isMobile()) {
      evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
      evnetInfo.position.y = event.gesture.center.pageY
    } else if (util.isElectron()) {
      evnetInfo.position.x = event.pageX
      evnetInfo.position.y = event.pageY
    } else {
      evnetInfo.position.x = event.gesture.center.pageX - event.gesture.target.offsetLeft
      evnetInfo.position.y = event.gesture.center.pageY
    }
    return evnetInfo
  }
  // 包装单击事件
  pacakgeClick (event) {
    var evnetInfo = {
      position: {
        x: 0,
        y: 0
      }
    }

    if (util.isMobile()) {
      evnetInfo.position.x = event.pageX - event.target.offsetLeft
      evnetInfo.position.y = event.y
    } else if (util.isElectron()) {
      evnetInfo.position.x = event.pageX
      evnetInfo.position.y = event.pageY
    } else {
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
      this.triggerKeyEvent('keyUp', {
        keyCode: eventInfo.keyCode,
        key: eventInfo.key
      })
    }
  }
}

module.exports = LosEvent
