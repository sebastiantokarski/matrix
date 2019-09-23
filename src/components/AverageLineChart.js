import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class AverageLineChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <HighchartsReact
      highcharts={Highcharts}
      options={{
        title: {
          text: 'Average values for every hour',
        },
        subtitle: {
          text: document.ontouchstart === undefined
            ? 'Click and drag in the plot area to zoom in'
            : 'Pinch the chart to zoom in',
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
          labels: {
            enabled: true,
          },
        },
        tooltip: {
          crosshairs: true,
          headerFormat: '<span style="font-size: 10px">Hour {point.key}</span><br/>',
          pointFormatter(pointFormat) {
            pointFormat = pointFormat
                .replace('{point.y}', this.y.toFixed(2))
                .replace('{series.name}', this.series.name);

            return pointFormat;
          },
        },
        legend: {
          enabled: false,
        },
        series: [{
          type: 'area',
          name: 'Average value',
          data: this.props.chartData,
        }],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.props.onMouseOver,
              },
            },
          },
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        chart: {
          zoomType: 'x',
        },
      }}
    />;
  }
}

AverageLineChart.propTypes = {
  chartData: PropTypes.array,
  onMouseOver: PropTypes.func,
  unitType: PropTypes.string,
};
