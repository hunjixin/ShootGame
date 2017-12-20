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
import Rect from '../lib/ui/shape/Rect.js'

class View extends UIView {
  constructor (viewOption, gameWorld) {
    super(viewOption, gameWorld)

    this.gameWorld = gameWorld
    this.headOffset = 20

    var stageHeight =viewOption.shape.height-20
    var stageWidth =viewOption.shape.width

    this.stage = Control.getInstance({
      type: Stage,
      parameter: {
        shape: new Rect(0, this.headOffset, stageWidth, stageHeight),
        gameWorldOffset: {
          x: 0,
          y: 0
        },
        zIndex: 3
      },
      optional: gameWorld
    }, this)


    viewOption.stageManager.register('next', (args) => {
      Object.assign(this.stage, args)
      this.stage.reset()
    })

    // reset button    
    this.resetButton = new Button({
      shape: new Rect(
        stageWidth / 4,
        stageHeight / 2 ,
        stageWidth / 2,
        40),
      parent: this,
      name: 'reset',
      zIndex: 7,
      icon: resource.button,
      borderSize: 0,
      gameWorld: gameWorld,
      event: {
        click: (eventInfo) => {
          this.resetButton.hide()
          if (this.gameWorld.player.hp > 0) {
            this.gameWorld.start()
          } else {
            this.gameWorld.restart()
          }
        }
      }
    })
    // bar
    this.bar = new Bar({
      shape: new Rect(
        0,
        0,
        stageWidth,
        20),
      parent: this,
      zIndex: 6,
      gameWorld: gameWorld,
      icon: resource.head,
      children: [new Button({
        viewContext: viewOption.viewContext,
        name: 'setting',
        shape: new Rect(
          stageWidth-20,
          0,
          20,
          20
        ),
        icon: resource.setting,
        event: {
          'click': (eventInfo) => {
            this.gameWorld.stop()
            var modal = new Modal({
              viewContext: viewOption.viewContext,
              shape: new Rect(
                10,
                stageHeight / 4,
                stageWidth - 20,
                stageHeight / 2
              ),
              title: '设置页面',
              zIndex: 6,
              confirm: () => {
                this.gameWorld.restart()
              },
              cancel: () => {
                this.gameWorld.restart()
              }
            }, context.setting)
            modal.open()
          }
        }
      })]
    })
    // debug text
    this.textBlock = new TextBlock({
      parent: this,
      zIndex: 5,
      shape: new Rect(
        0,
        this.headOffset,
        200,
        200
      )
    })
    this.gameWorld.messageEmitter.on('stop', () => {
      this.resetButton.show()
    })
  }

  reset () {
    super.reset()
    this.gameWorld.stageManager.reset()
  }
}

export default View
module.exports = View
