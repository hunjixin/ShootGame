import React from 'react'
import ReactDOM from 'react-dom'
import Engine from './engine.js'

class ViewShell extends React.Component {

  constructor (props) {
    super(props)

    this.events={
      click:"",
      move:"",
      mouseDown:"",
      mouseUp:"",
      keyUp:""
    }
  }
  componentDidMount () {
    var en = new Engine()
    en.Create({
      id: 'myCanvas',
      attachEvent: this.events
    })
    en.Start()
  }
  render () {
    return (
      <canvas id='myCanvas'
       onClick={(event)=>{console.log(event);console.log(event["[[target]]"]);this.events.click(event)}}
       onMouseMove={(event)=>{console.log(event);console.log(event["[[target]]"]);this.events.move(event)}}
       onMouseDown={(event)=>{console.log(event);console.log(event["[[target]]"]);this.events.mouseDown(event)}}
       onMouseUp={(event)=>{console.log(event);console.log(event["[[target]]"]);this.events.mouseUp(event)}}
       onKeyUp={(event)=>{console.log(event);console.log(event["[[target]]"]);this.events.keyUp(event)}}
       >
        {"Your browser does not support the HTML5 canvas tag."}
      </canvas>
    )
  }
}

ReactDOM.render(<ViewShell />, document.getElementById('app'))
