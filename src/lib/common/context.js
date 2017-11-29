import util from './util.js'

class ShapeElementManager
{
    constructor(){
        this.uiRoot=[]
    }
    addElement(element){
        this.uiRoot.push(element)
    }
    removeElement(element){
        if(!element) return
        element.destroy()
        util.removeArr(this.uiRoot,element)
    }
    forEach(func){
        for (var index = 0; index < this.uiRoot.length; index++) {
            func(this.uiRoot[index])
        }
    }
}

let context= {
    objectManager:new ShapeElementManager(),
    tick:0
}
export default context
module.exports = context
