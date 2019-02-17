import React, { Component } from  'react';
import PropTypes from 'prop-types';

const selectedStyles = {
  stroke: '#FF0000'
}


function buildLines(size, gap = 5) {
  let results = []
  for (let i = 0; i < 3; i++) {
    let _line = {p1: [gap, i * (gap * 2 + size)], p2: [gap + size, i * (gap * 2 + size)]}
    results.push(_line)
  }
  
  for (let i = 0; i < 2; i++) {
    let _line = {p1: [i * (gap * 2 + size), gap], p2: [i * (gap * 2 + size), gap  + size]}
    results.push(_line)
  }
  
  for (let i = 0; i < 2; i++) {
    let _line = {p1: [i * (gap * 2 + size), gap * 3 + 1 * size], p2: [i * (gap * 2 + size), gap * 3 + 2 * size]}
    results.push(_line)
  }
  
  return results
}

const NUMBERS = [
                  [0, 2, 3, 4, 5, 6], [4, 6], [0, 4, 1, 5, 2],
                  [0, 4, 1, 6, 2], [3, 4, 1, 6], [0, 3, 1, 6, 2],
                  [0, 3, 1, 6, 2, 5], [0, 4, 6], [0, 1, 2, 3, 4, 5, 6],
                  [0, 3, 4, 1, 6, 2]
                ]

class Indicate extends Component {
  constructor(props) {
    super(props)
    const {size, gap} = props
    this.lines = buildLines(size, gap)
  }
  
  
  render() {
    const { number, gap } = this.props
    const { lines } = this
    let selectedLines = NUMBERS[number] || []
    
    return (
      <g stroke={'rgba(158, 158, 158, .5)'} strokeWidth={gap} strokeLinecap={'round'}>
        {
          lines.map((line, i) => {
            let styles = selectedLines.indexOf(i) >= 0 ? selectedStyles: {}
            return (
              <line key={i} x1={line.p1[0]} y1={line.p1[1]} x2={line.p2[0]} y2={line.p2[1]} {...styles}></line>
            )
          })
        }
      </g>
    )
  }
}

Indicate.propTypes = {
  number: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  size: PropTypes.number,
  gap: PropTypes.number
}

export default Indicate;