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
    this.isAllSelect = false
    this.on('focus', () => {
      this.isFocus = true
    })
    this.on('lostFocus', () => {
      this.isFocus = false
      this.isAllSelect = false
    })
    this.on('keyUp', (eventParams) => {
      if (eventParams.keyCode == 8||eventParams.keyCode==17) {
        if (this.text) {
          this.text = this.text.substr(0, this.text.length - 2)
        }
      }else {
        this.text = this.text + eventParams.key
      }
    })
    this.on('click click', (eventInfo) => {
      this.isAllSelect = true
    })
    this.on('Control a', () => {
      this.isAllSelect = true
    })

    this.on('click', () => {
      this.isAllSelect = false
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

    var inTextHeight = this.height - 4
    drawContext.font = inTextHeight + 'px Arial'
    var textleng = drawContext.measureText(this.text).width
    if (!this._ilen) this._ilen = drawContext.measureText('|').width
    var startX = this.position.x
    var startY = this.position.y + this.height - 2

    if (this.isAllSelect) {
      drawContext.save()
      drawContext.fillStyle = 'lightblue'
      drawContext.fillRect(startX, this.position.y - 1, textleng + this._ilen, this.height - 1)
      drawContext.restore()
    }

    drawContext.fillText(this.text, startX, startY)
    if (this.isFocus && this.isShowCarrot()) {
      drawContext.fillText('|', startX + textleng, startY)
    }

    drawContext.restore()
  }
}

module.exports = Input
