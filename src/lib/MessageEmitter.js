import util from './common/util.js'

/**
 * simple message event
 */
class MessageEmitter {

  constructor () {
    //messsage container
    this.eventContainer = {}
  }

  /**
   * add a func to listen message
   * @param {消息键} key 
   * @param {消息触发函数} func 
   */
  on (key, func) {
    if (!key) return
    if (!func || !(func instanceof Function)) return
    if (this.eventContainer[key] && -1 === this.eventContainer[key].indexOf(func)) {
      this.eventContainer[key].push(func)
    }else {
      this.eventContainer[key] = [func]
    }
  }

  /**
   * trigger a message with parameter
   * @param {event key triggered} key 
   * @param {trigger parameters} args 
   */
  emit (key, ...args) {
    if (!key) return
    if (!this.eventContainer[key]) return
    this.eventContainer[key].forEach(func => {
      func.apply(null, args)
    })
  }

 /**
  * remove a event
  * @param {the event need to be removed} key 
  * @param {certain func removed} func 
  */
  off (key, func) {
    if (!key) return
    if (func) {
      if (func instanceof Function) {
        util.removeArr(this.eventContainer[key], func)
      }
    }else {
      this.clear(key)
    }
  }

  /**
   * clear event 
   * if a key gived ,will only remove the certain message
   * if none key gived ,will remove all message
   * @param {the event message need to be remove} key 
   */
  clear (key) {
    if (!key) {
      this.eventContainer = {}
    }else {
      delete this.eventContainer[key]
    }
  }
}

export default MessageEmitter
module.exports = MessageEmitter
