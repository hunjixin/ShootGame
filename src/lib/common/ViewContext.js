class ViewContext {
  constructor () {
    this.view
  }
  GameObjectToView (position) {
    return {
      x: this.XGameObjectToView(position.x),
      y: this.YGameObjectToView(position.y)
    }
  }
  XGameObjectToView (x) {
    return this.view.gameWorldOffset.x + x + this.view.stage.position.x
  }
  YGameObjectToView (Y) {
    return this.view.gameWorldOffset.y + Y + this.view.stage.position.y
  }
  ViewToGameWorld (position) {
    return {
      x: this.XViewToGameWorld(position.x),
      y: this.YViewToGameWorld(position.y)
    }
  }
  XViewToGameWorld (x) {
    return x - this.view.stage.position.x + this.view.gameWorldOffset.x
  }
  YViewToGameWorld (y) {
    return y - this.view.stage.position.y + this.view.gameWorldOffset.y
  }
}
export default ViewContext
module.exports = ViewContext
