import React, { Component } from 'react';
import config from './config';
import * as d3 from 'd3';

// chart
function Chart(props) {
  const { width, height, margin } = props
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          props.children
        }
      </g>
    </svg>
  )
}

const scale = d3.scaleLinear().domain([0, 200]).range([150, 360 + 30])
const ticks = scale.ticks(100)

function LArc(props) {
  const { start, end, color } = props
  
  console.log(scale(start))
  let _arc = d3.arc()({
    innerRadius: 165,
    outerRadius: 185,
    startAngle: Math.PI * 2 * (scale(start) + 90) / 360,
    endAngle: Math.PI * 2 * (scale(end) + 90) / 360
  })
  
  return (
    <path d={_arc} fill={color}></path>
  )
}


export default class Meter extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className={'container'}>
        <Chart {...config}>
          <g transform={`translate(300, 300)`}>
            <circle cx={0} cy={0} r={204} fill={'rgba(158, 158, 158, .4)'}></circle>
            <circle cx={0} cy={0} r={196} fill={'#FFF'}></circle>
            <circle cx={0} cy={0} r={200} fill={'transparent'} stroke={'#000'}></circle>
  
            <LArc start={0} end={120} color={'#00FF00'}></LArc>
            <LArc start={120} end={160} color={'#FFFF00'}></LArc>
            <LArc start={160} end={200} color={'#FF0000'}></LArc>
            
            <g fill={'transport'} stroke={'#000000'}>
              {
                ticks.map((tick) => {
                  let IS_20_TIME = tick % 20 === 0
                  let title = IS_20_TIME ? <text x={160} dominantBaseline={'middle'} textAnchor={'end'}>{tick}</text> : ''
                  return (
                    <g transform={`rotate(${scale(tick)})`} key={tick}>
                      <path d={`M165, 0L185,0`} strokeWidth={IS_20_TIME ? 3 : 1}></path>
                      {title}
                    </g>
                  )
                })
              }
            </g>
            
            <circle cx={0} cy={0} r={10} fill={'#'}></circle>
            <path d={`M-20, 5L-20, -5L130, 0Z`} transform={`rotate(${scale(0)})`}>
              <animateTransform ></animateTransform>
            </path>
            
          </g>
        </Chart>
      </div>
    )
  }
}