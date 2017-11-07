
import events from 'events'
import PEReader from './PEReader.js'
class EmitManager
{
    constructor(win)
    {
       this.emitter = new events.EventEmitter();
       this.windows=win;

       this.emitter.on('openFile', (finename)=>this._openFile(finename))
    }

    Trigger(eventName,...args)
    {
        this.emitter.emit('openFile', ...args)
    }

    _openFile(fileName){
        this.windows.setTitle(`${fileName}  IL DASM`)
        var reader=new PEReader(fileName);
    }
}
export default EmitManager
module.exports.EmitManager = EmitManager
