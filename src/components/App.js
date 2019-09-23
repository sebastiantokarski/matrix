import React, { Component } from 'react';
import HistogramChart from './HistogramChart';
import AverageLineChart from './AverageLineChart';
import matrix from '../data/matrix.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      histogramChartHour: null,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.showHistogramWithDelay = this.showHistogramWithDelay.bind(this);
    this.performDataProcessing = this.performDataProcessing.bind(this);
    this.getHourDetails = this.getHourDetails.bind(this);
    this.prepareChartData = this.prepareChartData.bind(this);

    this.matrixData = this.performDataProcessing(matrix);
    this.chartData = this.prepareChartData(this.matrixData);
    this.currMouseOverEl = null;
  }

  prepareChartData(data) {
    const hoursDetails = data.hoursDetails;
    const averageLineChart = hoursDetails.map((singleData) => singleData.averageValue);
    const histogramChart = data.matrix;

    return {
      averageLineChart,
      histogramChart,
      minAxisX: data.minValue,
      maxAxisX: data.maxValue,
    };
  }

  getHourDetails(hourArr) {
    const getSum = (a, b) => a + b;
    const firstEl = hourArr[0];
    const details = {
      minValue: firstEl,
      maxValue: firstEl,
      averageValue: hourArr.reduce(getSum, 0) / hourArr.length,
    }

    return hourArr.reduce((details, currValue) => {
      details.minValue = Math.min(details.minValue, currValue);
      details.maxValue = Math.max(details.maxValue, currValue);

      return details;
    }, details);
  }

  performDataProcessing(matrix) {
    const hoursDetails = [];
    const hoursLength = matrix.length;
    const firstEl = matrix && matrix[0] && matrix[0][0];
    let minValue = firstEl;
    let maxValue = firstEl;
  
    for (let i = 0; i < hoursLength; i++) {
      const singleHour = matrix[i];
      const singleHourDetails = this.getHourDetails(singleHour);

      minValue = Math.min(minValue, singleHourDetails.minValue);
      maxValue = Math.max(maxValue, singleHourDetails.maxValue);

      hoursDetails.push(singleHourDetails);
    }

    return {
      hoursDetails,
      minValue,
      maxValue,
      hoursLength,
      matrix,
    };
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

  render() {
    return (
      <div className="container">
        <AverageLineChart
          chartData={this.chartData.averageLineChart}
          onMouseOver={this.handleMouseOver}
        />
        {
          this.state.histogramChartHour !== null
          && <HistogramChart
            chartData={this.chartData.histogramChart}
            minAxisX={this.chartData.minAxisX}
            maxAxisX={this.chartData.maxAxisX}
            hour={this.state.histogramChartHour} />
        }
      </div>
    );
  }
}
