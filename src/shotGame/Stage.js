import EObject from '../lib/EObject.js'
import GameStage from '../lib/ui/GameStage.js'
import ViewCoord from '../lib/coord/ViewCoord.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import { Boss, Player } from './index.js'
import { Bullet, Shot } from './shot/'
import { Bar, Button, Modal, TextBlock } from '../lib/ui/'

class Stage extends GameStage {
  constructor (stageConfig, gameWorld) {
    super(stageConfig, gameWorld)

    this.isMouseDown = false

    this.borderSize = 1
    // 注册事件
    context.currentStage = this
    // 聚焦stage
    this.on('mouseDown', eventInfo => {
      context.currentStage = this
    })
    // 玩家开始移动
    this.gameWorld.player.on(this.viewContext, 'mouseDown', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = true
    })
    // 玩家停止移动
    this.on('mouseUp', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = false
    })
    this.playerOriPosition = {
      x: 300,
      y: 1150
    }
    // 玩家移动中
    this.on('mouseMove', eventInfo => {
      if (this.gameWorld.isRunning == 1 && this.isMouseDown === true) {
        var x = (eventInfo.position.x-this.shape.x- (this.gameWorld.player.shape.width / 2)* this.gameWorldOffset.scaleX) / this.gameWorldOffset.scaleX + this.gameWorldOffset.x 
        var y = (eventInfo.position.y-this.shape.y- (this.gameWorld.player.shape.height / 2)* this.gameWorldOffset.scaleY) / this.gameWorldOffset.scaleY + this.gameWorldOffset.y
        this.gameWorld.player.shape.x = x
        this.gameWorld.player.shape.y = y
      }
    })

    this.gameWorld.messageEmitter.on('restart', () => {
      this.gameWorld.player.placeAtWorld(this.playerOriPosition)
    })

    this.gameWorld.messageEmitter.on('start', () => {
      this.gameWorld.player.placeAtWorld(this.playerOriPosition)
    })
  }
  reset () {
    super.reset()
    this.gameWorld.player.placeAtWorld(this.playerOriPosition)
    this.gameWorld.reset()
  }
  render (drawContext) {
    super.render(drawContext)
    var canvas = this.gameWorld.drawScene(this)
    drawContext.drawImage(canvas, // 绘制
      0, 0, canvas.width, canvas.height,
      this.shape.x, this.shape.y, this.shape.width, this.shape.height)
  }
}

export default Stage
module.exports = Stage
