import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types'

const {number, object, string, oneof, array, func } = PropTypes;

console.log(PropTypes)

const styles = {
  stroke: '#000',
  fill: 'none'
}

class Axis extends Component{
  constructor(props) {
    super(props)
  }
  
  static defaultProps = {
    ticks: []
  }
  
  render() {
    const { scale, ticks } = this.props
    const [x1, x2] = scale.range()
    
    return (
      <g>
        <line className={'i-line'} x1={x1} y1={0} x2={x2} y2={0} {...styles} ></line>
        {
          ticks.map((tick) => {
            return (
              <g key={tick} transform={`translate(${scale(tick)}, 0)`}>
                <line className={'i-line'} x1={0} x2={0} y1={0} y2={8} {...styles}></line>
                <text textAnchor={'middle'} fontSize={'12px'} y={10} dominantBaseline={'hanging'}>{tick}</text>
              </g>
            )
          })
        }
      </g>
    )
  }
}

Axis.propTypes = {
  scale: func.isRequired,
  ticks: array
}

export default Axis;