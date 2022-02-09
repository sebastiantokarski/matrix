import React from 'react'
import PropTypes from 'prop-types'
import { Chart, Highcharts, HighchartsReact } from './Chart'
import styled from 'styled-components'

const StyledHighChartsReact = styled(HighchartsReact)`
  margin-top: 2rem;
`

export default class ChartLine extends Chart {
  constructor(props) {
    super(props)
  }
  render() {
    const options = {
      title: {
        text: 'Average and range values for every hour',
      },
      subtitle: {
        text:
          document.ontouchstart === undefined
            ? 'Click and drag in the plot area to zoom in'
            : 'Pinch the chart to zoom in',
      },
      yAxis: {
        title: {
          enabled: false,
        },
      },
      xAxis: {
        title: {
          text: 'Hour',
        },
        min: 0,
        labels: {
          enabled: true,
          formatter() {
            return this.value + 1
          },
        },
      },
      tooltip: {
        headerFormat:
          '<span style="font-size: 10px">Hour %point.key%</span><br/>',
        formatter(tooltip) {
          const defaultTooltip = tooltip.defaultFormatter.call(this, tooltip)

          defaultTooltip[0] = defaultTooltip[0].replace(
            '%point.key%',
            this.key + 1
          )

          return defaultTooltip
        },
        pointFormatter(pointFormat) {
          pointFormat = pointFormat
            .replace('{point.y}', this.y ? this.y.toFixed(2) : this.y)
            .replace('{point.low}', this.low ? this.low.toFixed(2) : this.low)
            .replace(
              '{point.high}',
              this.high ? this.high.toFixed(2) : this.high
            )
            .replace('{series.name}', this.series.name)

          return pointFormat
        },
      },
      series: [
        {
          name: 'Average value',
          data: this.props.chartAverageLineData,
          zIndex: 1,
        },
        {
          name: 'Range values',
          data: this.props.chartRangeData,
          type: 'arearange',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0,
        },
      ],
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver: this.props.onMouseOver,
            },
          },
        },
      },
      chart: {
        zoomType: 'x',
      },
    }

    return <StyledHighChartsReact highcharts={Highcharts} options={options} />
  }
}

ChartLine.propTypes = {
  chartAverageLineData: PropTypes.array,
  chartRangeData: PropTypes.array,
  onMouseOver: PropTypes.func,
  unitType: PropTypes.string,
}
