import { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addMoreHighcharts from 'highcharts/highcharts-more';
import addHistogramModule from 'highcharts/modules/histogram-bellcurve';

class Chart extends Component {
  constructor(props) {
    super(props);

    addMoreHighcharts(Highcharts);
    addHistogramModule(Highcharts);

    this.setHighchartsConfig();
  }

  setHighchartsConfig() {
    Highcharts.setOptions({
      plotOptions: {
        arearange: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.1).get('rgba')],
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
    });
  }
}

export {
  Chart,
  Highcharts,
  HighchartsReact,
};
