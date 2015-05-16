// jscs:disable disallowTrailingWhitespace
var React = require('react');
var _ = require('lodash');

var graphStore = require('./../stores/graph-store.es6');
var conversionStore = require('./../stores/conversion-store.es6')

var Graph = require('./graph.jsx');
var Conversion = require('./conversion.jsx');
var GraphQuery = require('./graph-query.jsx');

var GraphManager = React.createClass({
  getInitialState() {
    return {
      graphs: graphStore.getGraphs(),
      conversions: conversionStore.getConversions(),
      currentGraph: null,
      currentConversion: null,
      status: null
    }
  },

  componentDidMount() {
    graphStore.on('change', () => {
      this.setState({
        graphs: graphStore.getGraphs()
      })
    });
    conversionStore.on('change', () => {
      this.setState({
        graphs: graphStore.getGraphs()
      })
    });
  },

  addGraph() {
    this.setState({
      status: 'add',
      type: 'graph',
      graph: null,
      conversion: null
    });
  },

  addConversion(conversionTitle) {
    this.setState({
      status: 'add',
      type: 'conversion',
      conversion: null,
      graph: null
    });
  },

  graphQueryDone() {
    this.setState({
      status: null,
      graph: null,
      conversion: null
    });
  },

  changeGraph(graphTitle) {
    this.setState({
      status: 'add',
      type: 'graph',
      graph: _.find(this.state.graphs, (graph) => graph.title === graphTitle),
      conversion: null
    });
  },

  changeConversion(conversionTitle) {
    this.setState({
      status: 'add',
      type: 'conversion',
      conversion: _.find(this.state.conversions, (conversion) => conversion.title === conversionTitle),
      graph: null
    });
  },

  render() {
    var graphQuery;
    var graphs, conversions;

    if (this.state.status === 'add') {
      graphQuery = <GraphQuery done={this.graphQueryDone}
                               graph={this.state.graph}
                               conversion={this.state.conversion}
                               type={this.state.type}
        />;
    } else {
      graphs = this.state.graphs.map((graph) => {
        return <Graph title={graph.title}
                      changeGraph={this.changeGraph}
                      data={graph.data}
          />;
      });
      conversions = this.state.conversions.map((conversion) => {
        return <Conversion title={conversion.title}
                           changeConversion={this.changeConversion}
                           data={conversion.data}
          />;
      });
    }

    return (<div>
      <button type='button' className='btn btn-default add-graph' onClick={this.addGraph}>Добавить график</button>
      <button type='button' className='btn btn-default add-graph' onClick={this.addConversion}>Добавить конверсию
      </button>
      <div>
        {conversions}
      </div>
      {graphs}
      {graphQuery}
    </div>);
  }
});

module.exports = GraphManager;