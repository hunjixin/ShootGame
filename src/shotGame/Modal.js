import {BaseModal,Input, Grid,Bar,CheckBox, Button,Label, TextBlock } from '../lib/ui/'
import Rect from '../lib/shape/Rect.js'
import Control from '../lib/ui/Control.js'

class Modal extends BaseModal {
  constructor(option,setting) {
    super(option)
    this.cancel = option.cancel
    this.confirmBtn = option.confirmBtn
    this.setting=setting

    Control.getInstance([
      {
        type: Grid,
        parameter: {
          shape:new Rect(
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
          ),
          col: 2,
          row: 5
        },
        children:[
          {
            type:Label,
            parameter:{
              gridLayout: {
                row: 0,
                col: 0
              },
              shape:new Rect(0,0,90,30),
              text: '调试'
            }
          },
          {
            type:CheckBox,
            parameter:{
              gridLayout: {
                row: 0,
                col: 1
              },
              isCheck:this.setting.isDebug.value,
              onChange:(isCheck)=>{
                  this.setting.isDebug.value=isCheck
              },
              shape:new Rect(0,0,30,30)
            }
          },
          {
            type:Label,
            parameter:{
              gridLayout: {
                row: 1,
                col: 0
              },
              text: '难度',
              shape:new Rect(0,0,90,30)
            }
          },
          {
            type:Input,
            parameter:{
              gridLayout: {
                row: 1,
                col: 1
              },
              shape:new Rect(0,0,90,30)
            }
          },
          {
            type:Button,
            parameter:{
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
            }
          },
          {
            type:Button,
            parameter:{
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
            }
          },
          {
            type:Button,
            parameter:{
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
            }
          }
        ]
      }
    ], this)


  }
}

export default Modal
module.exports = Modal
