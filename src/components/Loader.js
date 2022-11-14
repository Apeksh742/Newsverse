import React, { Component } from 'react'
import './../loader.css'
export class Loader extends Component {
 
  render() {
    return (
        <div className="text-center"><div className="lds-facebook"><div></div><div></div><div></div></div></div>
    )
  }
}

export default Loader
