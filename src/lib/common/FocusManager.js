import context from './context.js'

class FocusManager
{
    constructor(){

    }
    add(control){
        context.focusUI.push(control)
    }
}

export default FocusManager