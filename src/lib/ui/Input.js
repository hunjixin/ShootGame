import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from './../common/context.js'
class Input extends Control {
  constructor (option) {
    super(option)
    this.text = ''
    this.shakeCount = 10
    this.isFocus = false
    this.on('focus', () => {
      this.isFocus = true
    })
    this.on('lostFocus', () => {
      this.isFocus = false
    })
    this.on('keyUp', (eventParams) => {
      this.text = this.text + eventParams.key
      console.log(eventParams.keyCode)
    })
    this._ilen = 0
  }
  isShowCarrot () {
    return Math.floor(context.tick / 10) % 2 == 0
  }
  render (drawContext) {
    super.render(drawContext)
    if (!this.text)return
    drawContext.save()

    drawContext.font = this.height - 4 + 'px Arial'
    drawContext.fillText(this.text, this.position.x, this.position.y + this.height - 2)
    if (this.isFocus && this.isShowCarrot()) {
      if (!this._ilen) this._ilen = drawContext.measureText('|').width
      var textleng = drawContext.measureText(this.text).width
      drawContext.fillText('|', this.position.x + textleng, this.position.y + this.height - 2)
    }

    drawContext.restore()
  }
}

module.exports = Input
