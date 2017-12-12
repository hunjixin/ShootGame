import EObject from '../lib/EObject.js'
import GameStage from '../lib/ui/GameStage.js'
import ViewCoord from '../lib/coord/ViewCoord.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import { Boss, Player } from './index.js'
import { ShotorFactory, Bullet, Shot } from './shot/'
import { Bar, Button, Modal, TextBlock } from '../lib/ui/'

class ShowStage extends GameStage {
  constructor (gameWorld,stageConfig) {
    super(gameWorld,stageConfig)
    this.gameWorldOffset={
      x:0,
      y:0
    }

 }

  render (view,drawContext) {
    var canvas = this.gameWorld.drawScene(this)
    drawContext.drawImage(canvas, // 绘制
      0, 0, canvas.width, canvas.height,
      this.position.x, this.position.y, this.width, this.height)
  }
}

export default ShowStage
module.exports = ShowStage
