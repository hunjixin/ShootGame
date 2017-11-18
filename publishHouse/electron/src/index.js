import React from 'react'
import ReactDOM from 'react-dom'
import Engine from './engine.js'

class CodeView extends React.Component {

   constructor(props) {
       super(props)
    }
  render () {
    return (
      <canvas id="myCanvas" margin="auto" > {"Your browser does not support the HTML5 canvas tag."}</canvas>
    );
  };
}

ReactDOM.render(<CodeView />,document.getElementById('app'))