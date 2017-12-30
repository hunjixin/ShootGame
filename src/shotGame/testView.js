import Control from '../lib/ui/Control.js'
import UIView from '../lib/ui/UIView.js'
import ViewCoord from '../lib/coord/ViewCoord.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import { Boss, Player } from './index.js'
import { Bullet, Shot } from './shot/'
import { Bar, Button, Label, TextBlock } from '../lib/ui/'
import Modal from './Modal.js'
import Stage from './Stage.js'
import ShowStage from './ShowStage.js'
import Rect from '../lib/shape/Rect.js'

class View extends UIView {
  constructor (viewOption, gameWorld) {
    super(viewOption, gameWorld)
  }
}

export default View
module.exports = View
