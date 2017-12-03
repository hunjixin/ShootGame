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
  constructor (option) {
    super(option)
    
    var grid=new Grid({
      parent:this,
      position: {
        x: this.position.x,
        y: this.position.y 
      },
      width:this.width,
      height: this.height,
      col:1,
      row:3
    })

    grid.AddCellContent(new Label({
      gridLayout:{
        row:0,
        col:0,
        rowSpan:2
      },
      text: 'Degbu',
      width: 90,
      height: 30
    }))


    grid.AddCellContent(new Button({
      gridLayout:{
        row:2,
        col:0
      },
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
  }
  render(draw){
       var me =this
      super.render(draw)
  }
}

module.exports = MessageBox
