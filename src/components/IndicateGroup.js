import React, { Component } from 'react';
import Indicate from './Indicate'

export default class IndicateGroup extends Component {
  
  render () {
    let { speed } = this.props
    let indicates = []
    while(speed > 0) {
      indicates.unshift(speed % 10)
      speed = Math.floor(speed / 10)
    }
    
    for(let start = indicates.length; start < 3; start++) {
      indicates.unshift(0)
    }
    
    return (
      <>
        {
          indicates.map((number, i) => {
            return (
              <g key={i} transform={`translate(${30 * i} , 0)`}>
                <Indicate number={number} size={10} gap={4} ></Indicate>
              </g>
            )
          })
        }
      </>
    )
  }
}
