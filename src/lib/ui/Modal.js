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
import MessageBox from './MessageBox.js'

class Modal extends BaseModal {
  constructor (option) {
    super(option)
    this.cancel = option.cancel
    this.confirmBtn = option.confirmBtn

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

    grid.AddCellContent(new Label({
      gridLayout:{
        row:0,
        col:0
      },
      text: 'Degbu',
      width: 90,
      height: 30
    }))

    grid.AddCellContent(new CheckBox({
      gridLayout:{
        row:0,
        col:1
      },
      width: 30,
      height: 30
    }))

    grid.AddCellContent(new Label({
      gridLayout:{
        row:1,
        col:0
      },
      text: '难度',
      width: 90,
      height: 30
    }))

    grid.AddCellContent(new Input({
      gridLayout:{
        row:1,
        col:1
      },
      width: 90,
      height: 30
    }))

    grid.AddCellContent(new Button({
      gridLayout:{
        row:3,
        col:0
      },
      text: '测试',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          var box = new MessageBox({
            title: '设置页面',
            position: {
              x: 20,
              y: context.option.ctxHeight / 3
            },
            width: context.option.ctxWidth - 40,
            height: context.option.ctxHeight / 3,
            zIndex: 3,
            confirm: function () {
              console.log("xxxxxxxxxxxxxx")
            }
          })
          box.open()
        }
      }
    }))

    grid.AddCellContent(new Button({
      gridLayout:{
        row:4,
        col:0
      },
      text: '确定',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          this.close()
          if (this.confirm)  this.confirm()
        }
      }
    }))

    grid.AddCellContent(new Button({
      gridLayout:{
        row:4,
        col:1
      },
      text: '取消',
      width: 90,
      height: 30,
      event: {
        click: (obj, eventInfo) => {
          this.close()
          if (this.cancel) this.cancel()
        }
      }
    }))

  }
}

module.exports = Modal
