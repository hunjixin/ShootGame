import React from 'react'
import ReactDOM from 'react-dom'

import AssemblyView from './component/assemblyView.jsx'
import ClassTreeView from './component/classTreeView.jsx'

import Config from './config.js'

class CodeView extends React.Component {

   constructor(props) {
       super(props)
       // this.props.height=props.Config.height*0.8
    }
  render () {
    return (
      <div>
        <AssemblyView height={this.props.Config.height*0.8} content='dssssssssssssss' />
        <ClassTreeView height={this.props.Config.height*0.2} content='gggggggggggggggg' />
      </div>
    )
  }
}

ReactDOM.render(<CodeView  Config={Config}/>,document.getElementById('app'))