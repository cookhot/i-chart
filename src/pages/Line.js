import React, { Component } from 'react';
import * as d3 from 'd3';
import config from '../config';
import Axis from '../components/Axis';

const option = {
  title: {
    text: '折线图堆叠'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一','周二','周三','周四','周五','周六','周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name:'邮件营销',
      type:'line',
      stack: '总量',
      data:[120, 132, 101, 134, 90, 230, 210]
    },
    {
      name:'联盟广告',
      type:'line',
      stack: '总量',
      data:[220, 182, 191, 234, 290, 330, 310]
    },
    {
      name:'视频广告',
      type:'line',
      stack: '总量',
      data:[150, 232, 201, 154, 190, 330, 410]
    },
    {
      name:'直接访问',
      type:'line',
      stack: '总量',
      data:[320, 332, 301, 334, 390, 330, 320]
    },
    {
      name:'搜索引擎',
      type:'line',
      stack: '总量',
      data:[820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};



class App extends Component {
  render() {
    const { width, height, margin, c_w, c_h } = config
    const { title, xAxis, series } = option
    
    const maxValue = d3.max(series, (serie) => {
      return d3.max(serie.data, (d) => d)
    })
    
    const xScale = d3.scalePoint().domain(xAxis.data).range([0, c_w])
    const yScale = d3.scaleLinear().domain([maxValue, 0]).range([0, c_h])
    
    return (
      <div className="App">
        <div>{title.text}</div>
        
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className={'axis x-axis'} transform={`translate(0, ${c_h})`}>
              <Axis scale={xScale} ticks={xScale.domain()}></Axis>
            </g>
            <g className={'axis y-axis'} transform={'rotate(90)'}>
              <Axis scale={yScale} ticks={yScale.ticks()}/>
            </g>
            
            <g className={'lines'}>
              {
                series.map((serie) => {
                  let _line = d3.line().x((val, i) => {
                    return xScale(xAxis.data[i])
                  }).y((v) => yScale(v))(serie.data)
                  return (
                    <g className={'line'} key={serie.name}>
                      <path d={_line} stroke={'#eee'} fill={'none'}></path>
                    </g>
                  )
                })
              }
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
