import React, { Component, Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addHistogramModule from 'highcharts/modules/histogram-bellcurve';
import matrix from './data/matrix.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.matrixData = matrix;

    this.state = {
      histogramChartHour: null,
    };

    addHistogramModule(Highcharts);

    this.getAverage = this.getAverage.bind(this);
    this.getRoundValuesForEveryHour = this.getRoundValuesForEveryHour.bind(this);
    this.getRoundValuesForEveryHour = this.getRoundValuesForEveryHour.bind(this);
  }

  getSum(a, b) {
    return a + b;
  }

  getAverage(arr) {
    return arr.reduce(this.getSum, 0) / arr.length;
  }

  getAverageForEveryHour() {
    const averageData = [];

    for (let i = 0; i < this.matrixData.length; i++) {
      averageData.push(this.getAverage(this.matrixData[i]));
    }

    return averageData;
  }

  getRandomColor() {
    const rgb = [];

    for (let i = 0; i < 3; i++) {
      rgb.push(Math.floor(Math.random() * 255));
    }

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .8)`;
  }

  getRoundValuesForEveryHour() {
    const hours = [];

    for (let i = 0; i < this.matrixData.length; i++) {
      hours.push(this.matrixData[i].map((x) => Math.round(x)));
    }

    return hours;
  }

  render() {
    const _this = this;
    const averageValueForEveryHour = this.getAverageForEveryHour();
    const roundValuesForEveryHour = this.getRoundValuesForEveryHour();

    return (
      <div className="container">
        <HighchartsReact
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
            legend: {
              enabled: false,
            },
            series: [{
              name: 'Average value',
              data: averageValueForEveryHour,
            }],
            plotOptions: {
              series: {
                point: {
                  events: {
                    click: function(e) {
                      _this.setState({
                        histogramChartHour: this.x,
                      });
                    },
                  },
                },
              },
            },
          }}
        />
        {
          this.state.histogramChartHour !== null
          && <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: 'Highcharts Histogram',
              },
              xAxis: [{
                title: { text: 'Data' },
                alignTicks: false,
              }, {
                title: { text: 'Histogram' },
                alignTicks: false,
                opposite: true,
              }],
              yAxis: [{
                title: { text: 'Data' },
              }, {
                title: { text: 'Histogram' },
                opposite: true,
              }],
              series: [{
                name: 'Histogram',
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 'singleValue',
                zIndex: -1,
              }, {
                name: 'Single value',
                type: 'scatter',
                data: roundValuesForEveryHour[this.state.histogramChartHour],
                id: 'singleValue',
                marker: {
                  radius: 1.5,
                },
              }],
            }}
          />
        }
      </div>
    );
  }
}
