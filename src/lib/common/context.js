import util from './util.js'

class UiObjectManager {
    constructor() {
        this.uiRoot = []
    }
    addView(element) {
        this.uiRoot.push(element)
        this.uiRoot.sort((a,b)=>a.zIndex-b.zIndex)
    }
    removeView(element) {
        if (!element) return
        element.destroy()
        util.removeArr(this.uiRoot, element)
    }
    forEach(func) {
        for (var index = 0; index < this.uiRoot.length; index++) {
            func(this.uiRoot[index])
        }
    }
}

let context = {
    UiObjectManager: new UiObjectManager(),
    tick: 0,
    currentStage:"",
}
export default context
module.exports = context