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
        }],
        yAxis: [{
          title: { text: 'Number of values' },
        }, {
          visible: false,
        }],
        plotOptions: {
          column: {
            groupPadding: 0,
          },
        },
        series: [{
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          baseSeries: 'singleValue',
          binWidth: 0.5,
          zIndex: -1,
        }, {
          name: 'Single value',
          type: 'scatter',
          data: this.props.data,
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
  data: PropTypes.array,
  hour: PropTypes.number,
};
