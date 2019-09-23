import React, { Component } from 'react';
import HistogramChart from './HistogramChart';
import AverageLineChart from './AverageLineChart';
import matrix from '../data/matrix.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histogramChartHour: null,
      averageChartUnitType: 'value',
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.showHistogramWithDelay = this.showHistogramWithDelay.bind(this);
    this.getAverageForEveryHour = this.getAverageForEveryHour.bind(this);
    this.getRoundValuesForEveryHour = this.getRoundValuesForEveryHour.bind(this);
    this.onUnitTypeChartChange = this.onUnitTypeChartChange.bind(this);

    this.matrixData = matrix;
    this.currMouseOverEl = null;

    this.averageValueForEveryHour = this.getAverageForEveryHour();
    this.roundValuesForEveryHour = this.getRoundValuesForEveryHour();
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

  /**
   * @param {Event} e
   */
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

  onUnitTypeChartChange(e) {
    this.setState({
      averageChartUnitType: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="chart-unit">
          <fieldset className="type">
            <input
              type="radio"
              name="type"
              value="value"
              id="chart-unit-value"
              onChange={this.onUnitTypeChartChange}
              defaultChecked />
            <label
              htmlFor="chart-unit-value">Show values</label>
            <input
              type="radio"
              name="type"
              value="percent"
              id="chart-unit-percent"
              onChange={this.onUnitTypeChartChange} />
            <label
              htmlFor="chart-unit-percent">Show percent</label>
          </fieldset>
        </div>
        <AverageLineChart
          data={this.averageValueForEveryHour}
          unitType={this.state.averageChartUnitType}
          onMouseOver={this.handleMouseOver}
        />
        {
          this.state.histogramChartHour !== null
          && <HistogramChart
            data={this.matrixData[this.state.histogramChartHour]}
            hour={this.state.histogramChartHour} />
        }
      </div>
    );
  }
}
