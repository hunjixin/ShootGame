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
    this._canvas = document.createElement('canvas')
    this._canvas.width = this.width
    this._canvas.height = this.height
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
      }else {
        this._getInput(eventParams)
      }
    })
    this._ilen = 0
  }
  _getInput (eventParams) {
    this.text = this.text + eventParams.key
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
    this.drawInner(drawContext)

    if (this._canvas.width <= this.width) {
      drawContext.drawImage(this._canvas, // 绘制
        startX, this.position.y, this._canvas.width, this.height)
    }else {
      var offset = this._canvas.width - this.width
      drawContext.drawImage(this._canvas, // 绘制
        offset, 0, this.width, this.height,
        startX, this.position.y, this.width, this.height
      )
    }

    drawContext.restore()
  }
  drawInner (drawContext) {
    var tmpContext = this._canvas.getContext('2d')
    tmpContext.save()
    var dText = this.text
    if (this.isFocus && this.isShowCarrot()) {
      dText = dText + '|'
    }
    var inTextHeight = this.height - 4
    drawContext.font = inTextHeight + 'px Arial'
    var textleng = drawContext.measureText(dText).width
    var startY = this.height - 2

    this._canvas.width = textleng
    tmpContext.width = textleng
    tmpContext.font = inTextHeight + 'px Arial'

    if (this.isAllSelect) {
      tmpContext.save()
      tmpContext.fillStyle = 'lightblue'
      tmpContext.fillRect(0, 0, textleng, this.height - 1)
      tmpContext.restore()
    }

    tmpContext.fillText(dText, 0, startY)
    tmpContext.restore()
  }
}

module.exports = Input
