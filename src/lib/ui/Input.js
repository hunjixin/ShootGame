import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from './../common/context.js'
class Input extends Control {
  constructor(option) {
    super(option)
    this.text = ''
    this.shakeCount = 10
    this.isFocus = false
    this.isAllSelect = false
    this._canvas = document.createElement('canvas')
    this._canvas.width = this.shape.width
    this._canvas.height = this.shape.height
    this.on('focus', () => {
      this.isFocus = true
    })
    this.on('lostFocus', () => {
      this.isFocus = false
      this.isAllSelect = false
    })
    this.on('Control a', () => {
      this.isAllSelect = true
    })

    this.on('click', () => {
      this.isAllSelect = false
    })

    this.on('click click', (eventInfo) => {
      this.isAllSelect = true
    })

    this.on('keyUp', (eventParams) => {
      if (eventParams.keyCode == 17) return
      if (eventParams.keyCode == 8) {
        if (this.text) {
          this.text = this.text.substr(0, this.text.length - 1)
        }
      } else {
        this._getInput(eventParams)
      }
    })
    this._ilen = 0
  }
  _getInput(eventParams) {
    this.text = this.text + eventParams.key
  }
  isShowCarrot() {
    return Math.floor(context.tick / 10) % 2 == 0
  }
  render(drawContext) {
    super.render(drawContext)

    drawContext.save()

    var inTextHeight = this.shape.height - 4
    drawContext.font = inTextHeight + 'px Arial'
    var textleng = drawContext.measureText(this.text).width
    if (!this._ilen) this._ilen = drawContext.measureText('|').width
    var startX = this.shape.x
    var startY = this.shape.y + this.shape.height - 2
    this.drawInner(drawContext)

    if (this._canvas.width <= this.shape.width) {
      drawContext.drawImage(this._canvas, // 绘制
        startX, this.shape.y, this._canvas.width, this.shape.height)
    } else {
      var offset = this._canvas.width - this.shape.width
      drawContext.drawImage(this._canvas, // 绘制
        offset, 0, this.shape.width, this.shape.height,
        startX, this.shape.y, this.shape.width, this.shape.height
      )
    }

    drawContext.restore()
  }
  drawInner(drawContext) {
    var tmpContext = this._canvas.getContext('2d')
    tmpContext.save()
    var dText = this.text
    if (this.isFocus && this.isShowCarrot()) {
      dText = dText + '|'
    } else {
      dText = dText + ' '
    }
    var inTextHeight = this.shape.height - 4
    drawContext.font = inTextHeight + 'px Arial'
    var textleng = drawContext.measureText(dText).width
    var startY = this.shape.height - 2

    this._canvas.width = textleng
    tmpContext.width = textleng
    tmpContext.font = inTextHeight + 'px Arial'

    if (this.isAllSelect) {
      tmpContext.save()
      tmpContext.fillStyle = 'lightblue'
      tmpContext.fillRect(0, 0, textleng, this.shape.height - 1)
      tmpContext.restore()
    }

    tmpContext.fillText(dText, 0, startY)
    tmpContext.restore()
  }
}

module.exports = Input