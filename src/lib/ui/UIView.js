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
    
    this.shape=viewOption.shape
    this.icon = viewOption.icon
    this.viewCoord=new ViewCoord()
  }

  render () {
    super.render(this.viewContext.drawContext)
  }

  destroy () {}
}

export default UIView
module.exports = UIView
