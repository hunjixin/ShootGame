
import eShape from './eShape.js'
import context from '../context.js'
import resource from '../resource.js'
import {Button, Bar, TextBlock, StageManager } from './uiComonent.js'

class Modal extends eShape
{
    constructor(option)
    {
        option.backgroundColor="silver"
        super(option)
        this.on('keyUp',function(params){
            option.cancel()
        })
        this.on('click',function(params){
           // option.cancel()
        })
        this.confirmBtn=new Button({
            text: 'confirm',
            position: {
              x: this.position.x+(this.width-30)/4,
              y: this.position.y+this.height-10
            },
            width: 90,
            height:30,
           // icon: resource.setting
          })
        this.cancelBtn=new Button({
            text: 'cancel',
            position: {
              x: this.position.x+this.width/2+(this.width-30)/4,
              y: this.position.y+this.height-10
            },
            width: 90,
            height:30,
           // icon: resource.setting
          })  
    }
    render(drawContext){
        super.render(drawContext)
       //画边框
          
       //画按钮 
       this.confirmBtn.render(drawContext)
       this.cancelBtn.render(drawContext)
       //画
    }
}

module.exports =Modal