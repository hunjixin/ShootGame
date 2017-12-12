import EObject from '../lib/EObject.js'
import UIView from '../lib/ui/UIView.js'
import ViewCoord from '../lib/coord/ViewCoord.js'
import util from '../lib/common/util.js'
import context from '../lib/common/context.js'
import resource from '../lib/common/resource.js'
import TimeLine from '../lib/TimeLine.js'
import { Boss, Player } from './index.js'
import { ShotorFactory, Bullet, Shot } from './shot/'
import { Bar, Button, Modal, TextBlock } from '../lib/ui/'
import Stage from './Stage.js'
class View extends UIView {
  constructor (viewOption, gameWorld) {
    super(viewOption, gameWorld)

    this.gameWorld = gameWorld
    this.headOffset = 40
    this.stage = new Stage(this.gameWorld,
      Object.assign({
        position: {
          x: 150,
          y: this.headOffset
        },
        width: this.width-40,
        height: this.height - this.headOffset-220,
      },
        {parent: this,zIndex: 4}))
    viewOption.stageManager.register('next', (args) => {
      Object.assign(this.stage, args)
      this.stage.reset()
    })
  
    // reset button    
    this.resetButton = new Button({
      parent: this,
      name: 'reset',
      zIndex: 7,
      position: {
        x: this.width / 4,
        y: this.height / 2 + this.position.y
      },
      width: this.width / 2,
      height: 40,
      icon: resource.button,
      borderSize: 0,
      gameWorld: gameWorld,
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
      parent: this,
      zIndex: 6,
      gameWorld: gameWorld,
      icon: resource.head,
      position: {
        x: -5,
        y: 0
      },
      width: this.viewContext.screenWidth + 10,
      height:20,
      children: [new Button({
        viewContext: viewOption.viewContext,
        name: 'setting',
        position: {
          x: this.viewContext.screenWidth - 20,
          y: 0
        },
        width: 20,
        height:20,
        icon: resource.setting,
        event: {
          'click': function (eventInfo) {
            this.gameWorld.stageManager.stage.stop()
            var modal = new Modal({
              viewContext: viewOption.viewContext,
              title: '设置页面',
              position: {
                x: 10,
                y: this.viewContext.screenHeight / 4
              },
              width: this.viewContext.screenWidth - 20,
              height: this.viewContext.screenHeight / 2,
              zIndex: 2,
              confirm: function () {
                this.gameWorld.stageManager.stage.restart()
              },
              cancel: function () {
                this.gameWorld.stageManager.stage.restart()
              }
            })
            modal.open()
          }
        }
      })]
    })
    // debug text
    this.textBlock = new TextBlock({
      parent: this,
      zIndex: 5,
      position: {
        x: 0,
        y: this.headOffset
      }
    })
  }

  reset () {
    super.reset()
    this.gameWorld.stageManager.reset()
  }
}

export default View
module.exports = View
