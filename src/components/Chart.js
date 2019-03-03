import React from 'react';

// chart
function Chart(props) {
  const { width, height, margin, className } = props
  return (
    <svg width={width} height={height} className={className}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          props.children
        }
      </g>
    </svg>
  )
}

export default Chart