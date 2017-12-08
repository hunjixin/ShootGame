import util from './common/util.js'
import resource from './common/resource.js'
import context from './common/context.js'
import ViewProvider from './ViewProvider.js'

class ViewManager {
  constructor (option) {
    this.viewProvider = new ViewProvider()
    this.viewsConfig = [
      {
        icon: resource.bg.bg1
      },
      {
        icon: resource.bg.bg2
      },
      {
        icon: resource.bg.bg3
      }
    ]
    this.currentViewIndex = 0
  }
  /**
   * 判断关卡是否超时   单位s
   */
  isViewTimeOut () {
    return this.view.isViewTimeOut()
  }
  canGoNextView () {
    var isBossEsixt = this.view.enemies.indexOf(this.view.boss)
    return -1 === isBossEsixt && this.view.isViewTimeOut() && this.view.hasCreateBoss == true
  }
  init () {
    if (this.view) this.view.destroy()
    context.UiObjectManager.removeView(this.view)
    var view = this.viewProvider.getView(null,this.viewsConfig[0])
    view.isRunning = 0
    this.view = view
    context.UiObjectManager.addView(view)
  }
  next () {
    this.currentViewIndex++
    if (this.viewsConfig.length > this.currentViewIndex) {
      this.view.destroy()
      context.UiObjectManager.removeView(this.view)
      var view = this.viewProvider.getView(null,this.viewsConfig[this.currentViewIndex])
      this.view = view
      context.UiObjectManager.addView(view)
    }
  }
  reset () {
    this.currentViewIndex = 0
    context.UiObjectManager.removeView(this.view)
    var view = this.viewProvider.getView(null,this.viewsConfig[this.currentViewIndex])
    this.view = view
    context.UiObjectManager.addView(view)
  }
}

export default ViewManager
module.exports = ViewManager