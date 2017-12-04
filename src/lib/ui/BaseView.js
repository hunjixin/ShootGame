import Control from './Control.js'
import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'

class BaseView extends Control {
    constructor(option) {
        super(option)
        this.worldOffset = {
            x: 0,
            y: 0
        }
    }
}

module.exports = BaseView