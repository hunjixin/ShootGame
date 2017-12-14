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
  constructor (gameWorld,stageConfig) {
    super(gameWorld,stageConfig)

    this.isMouseDown=false
    // 注册事件
    context.currentStage=this;
    //聚焦stage
    this.on('mouseDown', eventInfo => {
      context.currentStage=this;
    })
    // 玩家开始移动
    this.gameWorld.player.on(this.viewContext,'mouseDown', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = true
    })
    // 玩家停止移动
    this.on('mouseUp', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = false
    })
    // 玩家移动中
    this.on('mouseMove', eventInfo => {
      if (this.gameWorld.isRunning == 1 && this.isMouseDown === true) {
        this.gameWorld.player.position.x = this.XViewToGameWorld(eventInfo.position.x-this.position.x)- this.gameWorld.player.width / 2
        this.gameWorld.player.position.y =  this.YViewToGameWorld(eventInfo.position.y-this.position.y) - this.gameWorld.player.height / 2 
      }
    })
    
    this.gameWorld.player.placeAtWorld(this.XViewToGameWorld((this.width - this.gameWorld.player.width) / 2), this.YViewToGameWorld(this.height - this.gameWorld.player.height))
  }
  reset () {
    super.reset()
    this.gameWorld.player.placeAtWorld(this.XViewToGameWorld((this.width - this.gameWorld.player.width) / 2), this.YViewToGameWorld(this.height - this.gameWorld.player.height))
    this.gameWorld.reset()
  }
  render (drawContext) {
    var canvas = this.gameWorld.drawScene(this)
    drawContext.drawImage(canvas, // 绘制
      0, 0, canvas.width, canvas.height,
      this.position.x, this.position.y, this.width, this.height)
  }
}

export default Stage
module.exports = Stage
