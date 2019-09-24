import React, { Component, Fragment } from 'react';
import ChartHistogram from './Chart/ChartHistogram';
import ChartLine from './Chart/ChartLine';
import Footer from './Footer';
import matrix from '../data/matrix';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0;
`;

const ChartsWrapper = styled.div`
  height: 100vh;
`;

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
    const averageLineData = hoursDetails.map((singleData) => singleData.averageValue);
    const rangeData = hoursDetails.map((singleData, index) => {
      return [index, singleData.minValue, singleData.maxValue];
    });
    const histogramChart = data.matrix;

    return {
      averageLineData,
      rangeData,
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
    };

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
    this.showHistogramWithDelay(this.currMouseOverEl, 500);
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
      <Fragment>
        <div className="container">
          <Title>This is a visualization of data from the matrix.js file</Title>
          <ChartsWrapper>
            <ChartLine
              chartAverageLineData={this.chartData.averageLineData}
              chartRangeData={this.chartData.rangeData}
              onMouseOver={this.handleMouseOver}
            />
            {
              this.state.histogramChartHour !== null
              && <ChartHistogram
                chartData={this.chartData.histogramChart}
                minAxisX={this.chartData.minAxisX}
                maxAxisX={this.chartData.maxAxisX}
                hour={this.state.histogramChartHour} />
            }
          </ChartsWrapper>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
