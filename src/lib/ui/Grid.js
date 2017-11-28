import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Cell from './Cell.js'

class Grid extends Control {
  constructor (option) {
    super(option)
    this.col = option.col
    this.row = option.row
    this.isCheck = option.isCheck
    this.borderSize = 1
    this.CreateCells()
  }
  CreateCells () {
    this.cells = []
    var colWidth = (this.width - this.col + 1) / this.col
    var rowHeight = (this.height - this.row + 1) / this.row
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        if (!this.cells[i]) this.cells[i] = []
        this.cells[i][j] = new Cell({
          parent: this,
          position: {x: this.position.x + colWidth * j + j,y: this.position.y + rowHeight * i + i},
          width: colWidth,
          height: rowHeight
        })
      }
    }
  }

  render (drawContext) {
    super.render(drawContext)
  }
}

module.exports = Grid
