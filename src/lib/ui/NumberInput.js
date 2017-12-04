import util from '../common/util.js'
import resource from '../common/resource.js'
import context from './../common/context.js'
import Input from './Input.js'

class NumberInput extends Input {
  constructor(option) {
    super(option)
  }
  _getInput(eventParams) {
    if (isNaN(parseInt(this.text + eventParams.key))) {
      this.text = this.text + eventParams.key
    }
  }
}

module.exports = NumberInput