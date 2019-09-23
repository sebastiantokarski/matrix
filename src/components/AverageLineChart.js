import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class AverageLineChart extends Component {
  render() {
    return <HighchartsReact
      highcharts={Highcharts}
      options={{
        title: {
          text: 'Average values for every hour',
        },
        subtitle: {
          text: 'Source: matrix.js',
        },
        yAxis: {
          title: {
            text: 'Value',
          },
        },
        xAxis: {
          title: {
            text: 'Hour',
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size: 10px">Hour: {point.key}</span><br/>',
        },
        legend: {
          enabled: false,
        },
        series: [{
          name: 'Average value',
          data: this.props.data,
        }],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.props.onMouseOver,
              },
            },
          },
        },
      }}
    />;
  }
}

AverageLineChart.propTypes = {
  data: PropTypes.array,
  onMouseOver: PropTypes.func,
};
