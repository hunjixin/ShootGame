import EObject from '../../EObject.js'
import util from '../../common/util.js'
import resource from '../../common/resource.js'
import context from '../../common/context.js'

/**
 * 子弹
 */
class Shot  extends EObject
{
  constructor(){
   super()
   this.speedX = 0
   this.type = 'common'
   this.attack = 1 // 攻击力
   this.belong = 0
  }
}

export default Shot
module.exports =Shot