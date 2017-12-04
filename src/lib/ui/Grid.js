import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import Cell from './Cell.js'

class Grid extends Control {
  constructor(option) {
    super(option)
    this.col = option.col
    this.row = option.row
    this.borderSize = 1
    this.cells = []
    this.colWidth = (this.width - this.col + 1) / this.col
    this.rowHeight = (this.height - this.row + 1) / this.row
    this.CreateCells()
  }
  CreateCells() {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        if (!this.cells[i]) this.cells[i] = []
        this.cells[i][j] = new Cell({
          parent: this,
          position: {
            x: this.position.x + this.colWidth * j + j,
            y: this.position.y + this.rowHeight * i + i
          },
          width: this.colWidth,
          height: this.rowHeight
        })
      }
    }
  }
  AddCellContent(childControl) {
    var row = childControl.gridLayout.row
    var column = childControl.gridLayout.col
    var colSpan = childControl.gridLayout.colSpan ? childControl.gridLayout.colSpan : 1
    var rowSpan = childControl.gridLayout.rowSpan ? childControl.gridLayout.rowSpan : 1

    this.cells[row][column].position.x = this.position.x + this.colWidth * column + column
    this.cells[row][column].position.y = this.position.y + this.rowHeight * row + row
    this.cells[row][column].width = this.colWidth * colSpan
    this.cells[row][column].height = this.rowHeight * rowSpan

    for (var i = row; i < row + rowSpan; i++) {
      for (var j = column; j < column + colSpan; j++) {
        if (!(i == row && j == column)) {
          this.removeCell(i, j)
        }
      }
    }

    this.cells[row][column].addControl(childControl)
  }
  removeCell(row, col) {
    this.cancelControl(this.cells[row][col])
    this.cells[row][col] = null
  }
}

module.exports = Grid