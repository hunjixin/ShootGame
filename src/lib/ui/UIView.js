import Control from './Control.js'
import ViewCoord from '../coord/ViewCoord.js'
import util from '../common/util.js'
import context from '../common/context.js'
import resource from '../common/resource.js'
import TimeLine from '../TimeLine.js'

class UIView extends Control {
  constructor (viewOption,gameWorld) {
    super(viewOption)
    this.gameWorld=gameWorld
    
    this.position=viewOption.position
    this.width = viewOption.width
    this.height = viewOption.height
    this.icon = viewOption.icon
  }
  stop () {
    this.gameWorld.stop()
  }

  restart () {
    this.gameWorld.restart()
  }

  start () {
    this.gameWorld.start()
  }

  reset () {
    this.gameWorld.reset()
  }

  isStageTimeOut () {
    return this.gameWorld.isStageTimeOut()
  }

  render () {
    super.render(this, this.viewContext.drawContext)
  }

  destroy () {}
}

export default UIView
module.exports = UIView
