import { Circle, Rect,StrokeDrawer,FillDrawer } from './shape'

class Drawer {
  constructor (context, mode) {
    this.context = context,
    this.mode = mode // debug or not
  }
  drawShape (shape) {}

  fillRect (shape, color) {
    var drawer=new FillDrawer(this.context,{color})
    drawer.visitShape(shape)
  }

  strokeRect (shape,color) {
    var drawer=new StrokeDrawer(this.context,{color})
    drawer.visitShape(shape)
  }

  drawImage (shape, img) {
    var area=shape.getArea()
    this.context.drawImage(img,
      0, 0, img.width, img.height,
      area.x, area.y, area.width, area.height)
  }

  fillDebug (rect) {
    var drawer=new StrokeDrawer(this.context,{color:'blue'})
    drawer.visitShape(shape)
  }
}

export default Drawer
