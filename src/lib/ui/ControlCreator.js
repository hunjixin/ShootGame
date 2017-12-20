/**
 * EObject Creator
 */
class ControlCreator {
  constructor () {
    /**
     * creator cache
     */
    this.creators = {}
  }
  /**
   * new  EObject api
   * @param {*EObject config} config 
   */
  newInstance () {
    var config = arguments[0]
    if (!config)
      console.error('config is needed')
    if (arguments.length == 2) {
      var parent = arguments[1]
    }
    if (config instanceof Array) {
      return config.map(a => {
        if (!a.parameter)
          console.error('parameter is needed')
        if (!a.type)
          console.error('type is needed')
        return this._newSingleInstance(a, parent)
      })
    }else {
      return this._newSingleInstance(config, parent)
    }
  }
  /**
   * new single EObject
   * @param {EObject config} config 
   * @param {parent object} parent 
   */
  _newSingleInstance (config, parent) {
    if (parent) {
      // add some relative properties
      config.parameter.viewContext = parent.viewContext
      if (!(config.parameter.zIndex && config.parameter.zIndex > parent.zIndex)) {
        config.parameter.zIndex = parent.zIndex + 1
      }
    }
    var control = this._createControl(config)
    if (parent) {
      // build parent and child 
      parent.addChild(control)
    }
    return control
  }
  /**
   * create a single EObject
   * @param {create control EObject} config 
   */
  _createControl (config) {
    var type = config.type
    if (!type) return
    var parameter = this._mergeParaters(config)
    var children = config.children
    if (children) {
      var childrenControl = children.map(a => {
        if (!a.parameter)
          console.error('parameter is needed')
        if (!a.type)
          console.error('type is needed')
        a.parameter.viewContext = config.parameter.viewContext
        if (!(a.parameter.zIndex && a.parameter.zIndex > config.zIndex)) {
          a.parameter.zIndex = config.parameter.zIndex + 1
        }
        return this._createControl(a)
      })
      return this._creator(type, parameter, childrenControl)
    }else {
      return this._creator(type, parameter)
    }
  }
  _mergeParaters (config) {
    var parameter = [config.parameter]
    var optional = config.optional
    if (!optional) return parameter
    if (optional instanceof Array) {
      parameter.push.apply(parameter, optional)
    }else {
      parameter.push(optional)
    }
    return parameter
  }
  /**
   * check the creator if not create it
   * @param {EObject type} type 
   * @param {new parameters} parameters 
   * @param {the EObject's children} children 
   */
  _creator (type, parameters, children) {
    if (!this.creators[type]) {
      var createEval = `
            var parameters=arguments[0]
            var children=arguments[1]
            var control =new this.type(parameters[0],parameters[1],parameters[2],parameters[3])
            if(children&&children instanceof Array){
                    for(var i=0;i<children.length;i++){
                        control.addChild(children[i]) 
                    }
            }
            return control
       `

      this.creators[type] = {
        creatorStr: createEval,
        getInstance: Function.call({type: type}, createEval)
      }
    }
    return this.creators[type].getInstance.bind({type: type})(parameters, children)
  }

}

module.exports = ControlCreator
