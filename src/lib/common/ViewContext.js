class ViewContext {
  constructor (option) {
    this.view
    this.id= option.id,
    this.canvas= option.canvas,
    this. screenWidth= option.canvas.width,
    this. screenHeight= option.canvas.height,
    this. drawContext= option.drawContext
    this.losEvent=option.losEvent
  }
}
export default ViewContext
module.exports = ViewContext
