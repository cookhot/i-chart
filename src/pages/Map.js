import React, { Component } from 'react'
import Chart from '../components/Chart'
import config from '../config'
import * as d3 from 'd3'

import json from '../geo/shanghai'

const path = d3.path()

console.log(json)

window.d3 = d3

export default class Map extends Component {
  
  constructor(props) {
    super(props)
    this.init()
  }
  
  init () {
    const { width, height, margin } = config
    const c_w = width - margin.left - margin.right
    const c_h = height - margin.top - margin.bottom
    // const properties = json.features[18].properties
    
    this.projection = d3.geoMercator().center([121.479102, 31.23212])
      .scale(22000)
      .translate([c_w / 2, c_h / 2])
  }
  
  getPath(feature) {
    const { projection } = this
    let _path = ''
    const coordinates = feature.geometry.coordinates[0]
    coordinates.forEach((coordinate) => {
      _path += projection(coordinate) + ' '
    })
    
    return _path
  }
  
  render () {
    const { features } = json
    const { projection } = this
    
    return (
      <div className={'container'} style={{margin: '30px'}}>
        <Chart {...config} className={'i-map'}>
          <g className={'g-maps'}>
            {
              features.map((feature, key) => {
                let _path = this.getPath(feature)
                return (
                  <polygon key={key} points={_path} style={{fill: '#cccccc', stroke: '#000000', 'strokeWidth': 1}}/>
                )
              })
            }
          </g>
          
          <g className={'g-points'}>
            {
              features.map((feature) => {
                const { properties } = feature
                console.log(properties)
                const [cx, cy] = projection(properties.cp)
                return (
                  <g transform={`translate(${cx}, ${cy})`}>
                    <circle cx={0} cy={0} r={3} fill={'#FF0000'}></circle>
                    {/*<text fontSize={12}>{properties.name}</text>*/}
                  </g>
                  
                )
              })
            }
            
          </g>
          
          <g>
            <text ></text>
          </g>
        </Chart>
      </div>
    )
  }
}