class TimeLine {
  constructor () {
    this.timePoints = []
  }
  getRunningTime () {
    var timeLong = 0
    for (var index = 0; index < this.timePoints.length;) {
      var element = this.timePoints[index]
      if (element.action == 'start') {
          if(index!=this.timePoints.length-1){
            timeLong+=this.timePoints[index+1].time-element.time
          }else{
            timeLong+=new Date-element.time
          }
          index=index+2
      }
      index++
    }
    return timeLong
  }
  reset () {
    this.timePoints =[]
  }
  stop () {
    this.setAction('stop')
  }
  start () {
    this.setAction('start')
  }
  setAction (actionName) {
    if (this.timePoints.length == 0) {
      this.timePoints.push({
        action: actionName,
        time: new Date()
      })
    }else {
      var timePoint = this.timePoints[this.timePoints.length - 1]
      if (timePoint.action == actionName) {
      }else {
        timePoint.time = new Date()
      }
    }
  }
}

export default TimeLine