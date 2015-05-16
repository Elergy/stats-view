var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var dispatcher = require('./../dispatcher.es6');

var graphStore = {
  _graphs: [],

  init() {
    this.on('change', this.save.bind(this));
    this.on('change-graph', this.updateGraphs.bind(this));
    this.load();

    dispatcher.register((payload) => {
      var action = payload.action;

      if (payload.source === 'VIEW_ACTION') {
        if (action.actionType === 'new-graph') {
          this._graphs = this._graphs.filter((graph) => graph.title !== action.data.title);
          this._graphs.push(action.data);
          this.emit('change');
          this.emit('change-graph');
        }
      } else if (payload.source === 'ACTION') {
        if (action.actionType === 'graph-data') {
          var graph = _.find(this._graphs, (graph) => graph.title === action.data.name);
          if (graph) {
            var func = new Function(`return ${graph.func}`)();
            graph.data = func(action.data.data);
            console.log(graph.data);
            this.emit('change');
          }
        }
      }
    });
  },

  load() {
    this._graphs = JSON.parse(localStorage.getItem('graphs')) || [];
    this.updateGraphs();
    this.emit('change');
    this.emit('change-graph');
  },

  updateGraphs() {
    setTimeout(() => {
      this._graphs.forEach((graph) => {
        dispatcher.handleAction({
          actionType: 'get-graph',
          data: graph
        });
      });
    });
  },

  save() {
    localStorage.setItem('graphs', JSON.stringify(this._graphs));
  },

  getGraphs() {
    return this._graphs;
  }
};

graphStore = _.extend(graphStore, EventEmitter.prototype);
graphStore.init();

module.exports = graphStore;