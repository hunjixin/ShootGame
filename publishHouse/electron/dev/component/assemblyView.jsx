import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Alert, Col } from 'react-bootstrap'

class AssemblyView extends React.Component {
  render () {
    return (
      <div style={{width: '99%',margin: '0px',padding: '0px',height: this.props.height}}>
        <textarea defaultValue={this.props.content} style={{width: '100%',margin: '0px',padding: '0px',borderWidth: '0px',resize: 'none'}}></textarea>
      </div>
    )
  }
}

export default AssemblyView
