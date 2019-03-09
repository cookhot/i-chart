import React, { Component } from 'react';
import * as d3 from 'd3';
import config from '../config';
import Chart from '../components/Chart'

window.d3 = d3

const data = {
  name: 'root',
  children: [{
    name: 'child1',
    children: [{
      name: 'child11'
    }, {
      name: 'child12'
    }, {
      name: 'child13'
    }]
  }, {
    name: 'child2',
    children: [{
      name: 'child21',
      children: [
        {name: 'child211'}
      ]
    }, {
      name: 'child22'
    }
    ]
  }]
}

export default class Tree extends Component {
  constructor(props) {
    super(props)
    const tree = this.init()
    this.state = {
      tree
    }
  }
  
  init () {
    const tree = d3.hierarchy(data)
    // console.log(tree.sum)
    tree.count((d) => 1) // 每一个节点等量分配
    // console.log(tree)
    const { width, height, margin } = config
    let c_width = width - margin.left - margin.right
    let c_height = height - margin.top - margin.bottom
    
    tree.x0 = 0
    tree.y0 = 0
    tree.x1 = c_width
    tree.y1 = c_height
    
    
    // 广度遍历
    tree.each((node) => {
      if (!node.children) return
      
      d3.treemapDice(node, node.x0, node.y0, node.x1, node.y1)
    })
    
    // range => [0, ..., height]
    // 按照深度分配节点高度
    this.heightScale = d3.scalePoint().domain(d3.range(0, tree.height + 1, 1)).range([0, c_height])
    
    return tree
  }
  
  
  getCenterId(node) {
    const {x0, x1, depth} = node
    
    const { heightScale } = this
    
    return [Math.floor(x0 + ( x1 - x0) / 2), heightScale(depth)]
  }
  
  getCurveLine(link) {
    const { source, target } = link
    const path = d3.path()
    const sourceCenterId = this.getCenterId(source)
    const targetCenterId = this.getCenterId(target)
    path.moveTo(...sourceCenterId)
    path.lineTo(...targetCenterId)
    return path
    
  }
  
  render() {
    const { tree } = this.state
    
    let nodes = tree.descendants()
    
    let links = tree.links()
    
    this.getCurveLine(links[0])
    
    return (
      <div className={'container'} style={{margin: '30px'}}>
        <Chart {...config} className={'i-tree'}>
          <g className={'i-lines'}>
            {
              links.map((link, i) => {
                const _path = this.getCurveLine(link)
                return (
                  <path d={_path} className={'i-line'} key={i}></path>
                )
              })
            }
          </g>
          
          <g className={'i-circles'}>
            {
              nodes.map((node, i) => {
                const [cx, cy] = this.getCenterId(node)
                return (
                  <g transform={`translate(${cx}, ${cy})`} key={i}>
                    <circle cx={0} cy={0} r={10} className={'i-circle'} ></circle>
                    <text textAnchor={'start'} x={5} dx={'.5em'} dominantBaseline={'middle'}>{node.data.name}</text>
                  </g>
                )
              })
            }
          </g>
        </Chart>
      </div>
    )
  }
}