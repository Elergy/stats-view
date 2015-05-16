var React = require('react');
var LineChart = require('react-d3').LineChart;
var dispatcher = require('./../dispatcher.es6');

var Graph = React.createClass({
  updateGraph() {
    dispatcher.handleViewAction({
      actionType: 'get-graph',
      data: {
        title: this.props.title,
        table: this.props.table
      }
    })
  },

  changeGraph() {
    this.props.changeGraph(this.props.title);
  },

  validateChartData(chartData) {
    var good = false;
    if (chartData && chartData.length) {
      good = !chartData.some((data) => {
        return !data.name || !data.values || !data.values.some((item) => {
            return !item || !item.hasOwnProperty('x') || item.hasOwnProperty('y');
          });
      });
    }

    return good;
  },

  render() {
    var chart;
    if (this.validateChartData(this.props.data)) {
      chart = <LineChart legend={true}
                         data={this.props.data}
                         width={700}
                         height={400}
        />;
    }

    return (<div className='col-md-9'>
      <h1>{this.props.title}</h1>
      {chart}
      <button type="button" className="btn btn-default" onClick={this.changeGraph}>Изменить график</button>
    </div>);
  }
});

module.exports = Graph;