
class ViewProvider{
    constructor(){
    this.creator={}
    }
    register(name,viewCreaator){
       this.creator[name]=viewCreaator
    }
    //default first now
    getView(viewName,...args){
        var viewName=Object.keys(this.creator)[0]
        return this.creator[viewName].apply(null,args);
    }
}

export default ViewProvider
module.exports = ViewProvider