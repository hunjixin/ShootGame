import context from './context.js'

class EventWell {
  constructor (num) {
    this.eventWell = []
    this.wellDepth = num

    this.timer = setInterval(() => {
      this.eventWell.shift()
    }, 1000)
  }
  attach (event) {
    if (this.eventWell.length > this.wellDepth)  this.eventWell.shift()
    this.eventWell.push(event)
    this.triggerComplexEvent()
  }
  triggerComplexEvent () {
    if (2 > this.eventWell.length) return
    var action = this.eventWell[0].action
    for (var i = 1; i < this.eventWell.length; i++) {
      var eventItem = this.eventWell[i]
      action = action + ' ' + eventItem.action
      context.losEvent.triggerNamedEvent(action, eventItem.eventInfo)
    }
  }
}

export default EventWell
module.exports = EventWell
