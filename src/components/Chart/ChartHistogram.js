import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Highcharts, HighchartsReact } from './Chart';

export default class ChartHistogram extends Chart {
  constructor(props) {
    super(props);
  }
  render() {
    return <HighchartsReact
      highcharts={Highcharts}
      options={{
        title: {
          text: this.props.hour ? `Data from ${this.props.hour} hour` : '',
        },
        xAxis: [{
          visible: false,
          alignTicks: false,
        }, {
          title: { text: 'values' },
          alignTicks: false,
          min: this.props.minAxisX,
          max: this.props.maxAxisX,
        }],
        yAxis: [{
          title: { text: 'Number of values' },
          max: this.props.maxAxisX,
        }, {
          visible: false,
        }],
        plotOptions: {
          column: {
            groupPadding: 0,
          },
        },
        tooltip: {
          pointFormatter(pointFormat) {
            pointFormat = pointFormat
                .replace('x: ', 'Index: ')
                .replace('y: ', 'Value: ')
                .replace('{point.x}', this.x)
                .replace('{point.x2}', this.x2)
                .replace('{point.y}', this.y.toFixed(2))
                .replace('{series.name}', this.series.name);

            return pointFormat;
          },
        },
        legend: {
          enabled: false,
        },
        series: [{
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          baseSeries: 'singleValue',
          binWidth: 1,
          zIndex: -1,
        }, {
          name: 'Single value',
          type: 'scatter',
          data: this.props.chartData[this.props.hour],
          id: 'singleValue',
          marker: {
            radius: 1.5,
          },
        }],
      }}
    />;
  }
}

ChartHistogram.propTypes = {
  chartData: PropTypes.array,
  hour: PropTypes.number,
};
