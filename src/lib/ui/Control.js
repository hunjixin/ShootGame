import util from '../common/util.js'
import resource from '../common/resource.js'
import context from '../common/context.js'
import EObject from '../EObject.js'
class Control extends EObject
{
    constructor(option)
    {
         super(option)
         this.on('click',function(params){
            // option.cancel()
         })
    }
    
}

module.exports = Control