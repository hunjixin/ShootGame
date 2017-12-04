import util from './util.js'

class UiObjectManager {
    constructor() {
        this.uiRoot = []
    }
    addView(element) {
        this.uiRoot.push(element)
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
    tick: 0
}
export default context
module.exports = context