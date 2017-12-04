import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import BaseModal from './BaseModal.js'
import Button from './Button.js'
import Label from './Label.js'
import CheckBox from './CheckBox.js'
import Grid from './Grid.js'
import Input from './Input.js'
class MessageBox extends BaseModal {
  constructor(option) {
    super(option)

    var col = 1
    if (option.cancel) {
      col = 2
      this.cancel = option.cancel
    }

    var grid = new Grid({
      parent: this,
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.width,
      height: this.height,
      col: col,
      row: 3
    })

    grid.AddCellContent(new Label({
      gridLayout: {
        row: 0,
        col: 0,
        rowSpan: 2,
        colSpan: col
      },
      text: 'Degbu',
      width: 90,
      height: 30
    }))


    grid.AddCellContent(new Button({
      gridLayout: {
        row: 2,
        col: 0
      },
      text: '确定',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          context.UiObjectManager.removeView(this)
          if (this.confirm) this.confirm()
        }
      }
    }))
    if (this.cancel) {
      grid.AddCellContent(new Button({
        gridLayout: {
          row: 2,
          col: 1
        },
        text: '取消',
        width: 90,
        height: 30,
        event: {
          click: (obj, eventInfo) => {
            context.UiObjectManager.removeView(this)
            if (this.confirm) this.confirm()
          }
        }
      }))
    }
  }
  render(draw) {
    var me = this
    super.render(draw)
  }
}

module.exports = MessageBox