import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Button from './Button.js'

class Modal extends Control {
  constructor (option) {
    option.backgroundColor = 'silver'
    super(option)
    this.cancel = option.cancel
    this.confirmBtn = option.confirmBtn
    this.on('keyUp', function (params) {
      option.cancel()
    })
    this.on('click', function (params) {
      // option.cancel()
    })
    this.confirmBtn = new Button({
      text: '确定',
      position: {
        x: this.position.x + (this.width - 180) / 4,
        y: this.position.y + this.height - 40
      },
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          if (this.cancel)
            this.confirm()
        }
      }
    })
    this.cancelBtn = new Button({
      text: '取消',
      position: {
        x: this.position.x + this.width / 2 + (this.width - 180) / 4,
        y: this.position.y + this.height - 40
      },
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          if (this.confirm)
            this.cancel()
        }
      }
    })

    this.registerControl(this.confirmBtn)
    this.registerControl(this.cancelBtn)
  }
}

module.exports = Modal
