import {BaseModal,Input, Grid,Bar,CheckBox, Button,Label, TextBlock } from '../lib/ui/'
import Rect from '../lib/ui/shape/Rect.js'

class Modal extends BaseModal {
  constructor(option,setting) {
    super(option)
    this.cancel = option.cancel
    this.confirmBtn = option.confirmBtn
    this.setting=setting
    var grid = new Grid({
      parent: this,
      viewContext:this.viewContext,
      shape:new Rect(
        this.shape.x,
        this.shape.y,
        this.shape.width,
        this.shape.height,
      ),
      col: 2,
      row: 5
    })

    grid.AddCellContent(new Label({
      viewContext:this.viewContext,
      gridLayout: {
        row: 0,
        col: 0
      },
      shape:new Rect(0,0,90,30),
      text: '调试'
    }))

    grid.AddCellContent(new CheckBox({
      viewContext:this.viewContext,
      gridLayout: {
        row: 0,
        col: 1
      },
      isCheck:this.setting.isDebug.value,
      onChange:(isCheck)=>{
          this.setting.isDebug.value=isCheck
      },
      shape:new Rect(0,0,30,30)
    }))

    grid.AddCellContent(new Label({
      viewContext:this.viewContext,
      gridLayout: {
        row: 1,
        col: 0
      },
      text: '难度',
      shape:new Rect(0,0,90,30)
    }))

    grid.AddCellContent(new Input({
      viewContext:this.viewContext,
      gridLayout: {
        row: 1,
        col: 1
      },
      shape:new Rect(0,0,90,30)
    }))

    grid.AddCellContent(new Button({
      viewContext:this.viewContext,
      gridLayout: {
        row: 3,
        col: 0
      },
      text: '测试',
      shape:new Rect(0,0,90,30),
      event: {
        click: (obj, eventInfo) => {

        }
      }
    }))

    grid.AddCellContent(new Button({
      viewContext:this.viewContext,
      gridLayout: {
        row: 4,
        col: 0
      },
      text: '确定',
      shape:new Rect(0,0,90,30),
      event: {
        click: (obj, eventInfo) => {
          this.close()
          if (this.confirm) this.confirm()
        }
      }
    }))

    grid.AddCellContent(new Button({
      viewContext:this.viewContext,
      gridLayout: {
        row: 4,
        col: 1
      },
      text: '取消',
      shape:new Rect(0,0,90,30),
      event: {
        click: (obj, eventInfo) => {
          this.close()
          if (this.cancel) this.cancel()
        }
      }
    }))

  }
}

export default Modal
module.exports = Modal
