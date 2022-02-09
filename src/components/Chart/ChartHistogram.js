import React from 'react'
import PropTypes from 'prop-types'
import { Chart, Highcharts, HighchartsReact } from './Chart'

export default class ChartHistogram extends Chart {
  constructor(props) {
    super(props)

    this.state = {
      showLoading: true,
    }

    this.chart = React.createRef()
  }

  static getDerivedStateFromProps(props) {
    if (props.hour !== null && props.hour !== undefined) {
      return {
        showLoading: false,
      }
    }
    return null
  }

  render() {
    const _this = this
    const options = {
      title: {
        text:
          this.props.hour !== null
            ? `Data from ${this.props.hour + 1} hour`
            : '',
      },
      xAxis: [
        {
          visible: false,
        },
        {
          title: {
            text: 'values',
          },
          alignTicks: false,
          min: this.props.minAxisX,
          max: this.props.maxAxisX,
        },
      ],
      yAxis: [
        {
          title: {
            enabled: false,
          },
          max: this.props.maxAxisX,
        },
        {
          visible: false,
        },
      ],
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false,
        },
      },
      tooltip: {
        pointFormatter(pointFormat) {
          pointFormat = pointFormat
            .replace('x: ', 'Index: ')
            .replace('y: ', 'Value: ')
            .replace('{point.x}', this.x)
            .replace('{point.x2}', this.x2)
            .replace('{point.y}', this.y ? this.y.toFixed(2) : this.y)
            .replace('{series.name}', this.series.name)

          return pointFormat
        },
      },
      series: [
        {
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          baseSeries: 'singleValue',
          binWidth: 1,
          zIndex: -1,
        },
        {
          name: 'Single value',
          type: 'scatter',
          data: this.props.chartData,
          id: 'singleValue',
          marker: {
            radius: 1.5,
          },
        },
      ],
      chart: {
        events: {
          load() {
            if (_this.state.showLoading) {
              this.showLoading()
            }
          },
          redraw() {
            if (_this.state.showLoading) {
              this.showLoading()
            } else {
              this.hideLoading()
            }
          },
        },
      },
      lang: {
        loading:
          document.ontouchstart === undefined
            ? 'Hover on chart above to see hour histogram'
            : 'Pinch the chart above to see hour histogram',
      },
      loading: {
        labelStyle: {
          fontWeight: 'normal',
          fontSize: '22px',
        },
      },
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        ref={(ref) => (this.chart = ref)}
        options={options}
        // For animating on update
        key={this.props.hour}
      />
    )
  }
}

ChartHistogram.propTypes = {
  chartData: PropTypes.array,
  hour: PropTypes.number,
}

ChartHistogram.defaultProps = {
  chartData: [],
}
