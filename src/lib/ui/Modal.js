import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Button from './Button.js'
import Label from './Label.js'
import CheckBox from './CheckBox.js'
import Grid from './Grid.js'
import Input from './Input.js'
class Modal extends Control {
  constructor (option) {
    option.backgroundColor = 'white'
    super(option)
    this.cancel = option.cancel
    this.confirmBtn = option.confirmBtn

    this.on('keyUp', function (params) {
      if(params.keyCode==27){
        context.objectManager.removeElement(this)
      }
    })
    var grid=new Grid({
      parent:this,
      position: {
        x: this.position.x,
        y: this.position.y 
      },
      width:this.width,
      height: this.height,
      col:2,
      row:5
    })

    grid.cells[0][0].addControl(new Label({
      parent: grid.cells[0][0],
      text: 'Degbu',
      width: 90,
      height: 30
    }))

    grid.cells[0][1].addControl(new CheckBox({
      parent: grid.cells[0][0],
      width: 30,
      height: 30
    }))

    grid.cells[1][0].addControl(new Label({
      parent: grid.cells[1][0],
      text: '难度',
      width: 90,
      height: 30
    }))

    grid.cells[1][1].addControl(new Input({
      parent: grid.cells[1][1],
      width: 90,
      height: 30
    }))

    grid.cells[4][0].addControl(new Button({
      parent: grid.cells[4][0],
      parent:this,
      text: '确定',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          context.objectManager.removeElement(this)
          if (this.confirm)  this.confirm()
        }
      }
    }))
    grid.cells[4][1].addControl(new Button({
      parent: grid.cells[4][1],
      text: '取消',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          context.objectManager.removeElement(this)
          if (this.cancel) this.cancel()
        }
      }
    }))
  }
}

module.exports = Modal
