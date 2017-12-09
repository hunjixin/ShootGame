import GameObject from '../../lib/GameObject.js'

/**
 * 子弹
 */
class Shot extends GameObject {
  constructor() {
    super()
    this.speedX = 0
    this.type = 'common'
    this.attack = 1 // 攻击力
    this.belong = 0
  }
}

export default Shot
module.exports = Shot