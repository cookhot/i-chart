import React, { Component } from 'react';
import config from './config';
import * as d3 from 'd3';
import IndicateGroup from './components/IndicateGroup';
import Chart from './components/Chart';

const scale = d3.scaleLinear().domain([0, 200]).range([150, 360 + 30])
const ticks = scale.ticks(100)

function LArc(props) {
  const { start, end, color } = props
  
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
    
    this.accelerate = this.accelerate.bind(this)
    this.decelerate = this.decelerate.bind(this)
    
    this.state = {
      speed: 0
    }
  }
  
  accelerate() {
    const range = scale.domain()
    let { speed } = this.state
    if (speed < range[1]) {
      speed += 2
      this.setState({
        speed
      })
    }
  }
  
  decelerate() {
    const range = scale.domain()
    let { speed } = this.state
    if (range[0] < speed) {
      speed -= 2
      this.setState({
        speed
      })
    }
  }
  
  render() {
    const { speed } = this.state
    return (
      <div className={'container'}>
        <div>
          <button onClick={this.accelerate}>加速</button>
          <button onClick={this.decelerate}>减速</button>
        </div>
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
            <path d={`M-20, 5L-20, -5L130, 0Z`} transform={`rotate(${scale(speed)})`}>
              <animateTransform ></animateTransform>
            </path>
            <g transform={`translate(-62, 60)`}>
              <IndicateGroup speed={speed}>
              </IndicateGroup>
              <text x={90} y={25} fontSize={24}>KM</text>
            </g>
          </g>
        </Chart>
        
      </div>
    )
  }
}