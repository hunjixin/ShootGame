import EObject from '../lib/EObject.js'
import BaseView from '../lib/ui/BaseView.js'
import ViewCoord from '../lib/coord/ViewCoord.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import { Boss, Player, createEnemy } from './index.js'
import { ShotorFactory, Bullet, Shot } from './shot/'
import { Bar, Button, Modal, TextBlock } from '../lib/ui/'

class View extends BaseView {
  constructor (gameWorld,viewConfig) {
    super(gameWorld,viewConfig)

    //reset button    
    this.resetButton = new Button({
      name: 'reset',
      zIndex: 2,
      position: {
        x: this.width / 4,
        y: this.height / 2 + this.position.y
      },
      width: this.width / 2,
      height: 40,
      icon: resource.button,
      borderSize: 0,
      event: {
        click: (eventInfo) => {
          this.resetButton.hide()
          if (this.gameWorld.player.hp > 0) {
            this.start()
          } else {
            this.restart()
          }
        }
      }
    })
    // bar
    this.bar = new Bar({
      icon: resource.head,
      position: {
        x: -5,
        y: 0
      },
      width: context.option.ctxWidth + 10,
      height: context.headOffset,
      children: [new Button({
        name: 'setting',
        position: {
          x: context.option.ctxWidth - context.headOffset,
          y: 2
        },
        width: context.headOffset,
        height: context.headOffset - 4,
        icon: resource.setting,
        event: {
          'click': function (eventInfo) {
            context.viewManager.view.stop()
            var modal = new Modal({
              title: '设置页面',
              position: {
                x: 10,
                y: context.option.ctxHeight / 4
              },
              width: context.option.ctxWidth - 20,
              height: context.option.ctxHeight / 2,
              zIndex: 2,
              confirm: function () {
                context.viewManager.view.restart()
              },
              cancel: function () {
                context.viewManager.view.restart()
              }
            })
            modal.open()
          }
        }
      })]
    })
    //debug text
    this.textBlock = new TextBlock({
      zIndex: 1,
      position: {
        x: 0,
        y: context.headOffset
      }
    })

    context.UiObjectManager.addView(this.resetButton)
    context.UiObjectManager.addView(this.bar)
    context.UiObjectManager.addView(this.textBlock)

    this.isMouseDown=false
    // 注册事件
    // 玩家开始移动
    this.gameWorld.player.on('mouseDown', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = true
    })
    // 玩家停止移动
    this.on('mouseUp', eventInfo => {
      if (this.gameWorld.isRunning == 1) this.isMouseDown = false
    })
    // 玩家移动中
    this.on('mouseMove', eventInfo => {
      if (this.gameWorld.isRunning == 1 && this.isMouseDown === true) {
        this.gameWorld.player.position.x = eventInfo.position.x - this.gameWorld.player.width / 2
        this.gameWorld.player.position.y = eventInfo.position.y - this.gameWorld.player.height / 2 - context.headOffset
      }
    })
  }

  destroy () {
    this.gameWorld.player.off('mouseDown')
    this.off('mouseUp')
    this.off('mouseMove')
  }
  reset () {
    super.reset()
    this.shots.length = 0
    this.enemies.length = 0
    this.bullets.length = 0
    this.spoils.length = 0
  }
  render (view,drawContext) {
    var canvas = this.gameWorld.drawScene(view)
    drawContext.drawImage(canvas, // 绘制
      0, 0, canvas.width, canvas.height,
      this.position.x, this.position.y, this.width, this.height)
  }
}

export default View
module.exports = View
