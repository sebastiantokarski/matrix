import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addHistogramModule from 'highcharts/modules/histogram-bellcurve';

export default class HistogramChart extends Component {
  constructor(props) {
    super(props);

    addHistogramModule(Highcharts);
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
                .replace('{point.y}', this.y.toFixed(2))

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

HistogramChart.propTypes = {
  chartData: PropTypes.array,
  hour: PropTypes.number,
};
