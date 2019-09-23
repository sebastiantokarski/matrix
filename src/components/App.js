import React, { Component } from 'react';
import HistogramChart from './HistogramChart';
import AverageLineChart from './AverageLineChart';
import matrix from '../data/matrix.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.matrixData = matrix;
    this.currMouseOverEl = null;

    this.state = {
      histogramChartHour: null,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.showHistogramWithDelay = this.showHistogramWithDelay.bind(this);
    this.getAverageForEveryHour = this.getAverageForEveryHour.bind(this);
    this.getRoundValuesForEveryHour = this.getRoundValuesForEveryHour.bind(this);
  }

  /**
   * @param {number[]} arr
   * @return {number}
   */
  getAverage(arr) {
    const getSum = (a, b) => a + b;

    return arr.reduce(getSum, 0) / arr.length;
  }

  /**
   * @return {number[]}
   */
  getAverageForEveryHour() {
    const averageData = [];

    for (let i = 0; i < this.matrixData.length; i++) {
      averageData.push(this.getAverage(this.matrixData[i]));
    }

    return averageData;
  }

  /**
   * @return {number[]}
   */
  getRoundValuesForEveryHour() {
    const hours = [];

    for (let i = 0; i < this.matrixData.length; i++) {
      hours.push(this.matrixData[i].map((x) => Math.round(x)));
    }

    return hours;
  }

  handleMouseOver(e) {
    this.currMouseOverEl = e.target.x;
    this.showHistogramWithDelay(this.currMouseOverEl, 300);
  }

  /**
   * @param {number} hour
   * @param {number} delay
   */
  showHistogramWithDelay(hour, delay) {
    const timerId = setTimeout(() => {
      if (hour === this.currMouseOverEl) {
        this.setState({
          histogramChartHour: hour,
        });
      }
      clearTimeout(timerId);
    }, delay);
  }

  render() {
    const averageValueForEveryHour = this.getAverageForEveryHour();
    const roundValuesForEveryHour = this.getRoundValuesForEveryHour();

    return (
      <div className="container">
        <AverageLineChart
          data={averageValueForEveryHour}
          onMouseOver={this.handleMouseOver}
        />
        {
          this.state.histogramChartHour !== null
          && <HistogramChart
            data={roundValuesForEveryHour[this.state.histogramChartHour]}
            hour={this.state.histogramChartHour} />
        }
      </div>
    );
  }
}
