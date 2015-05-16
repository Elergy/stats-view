var $ = require('jquery');

var dispatcher = require('./../dispatcher.es6');

var loader = {
  init() {
    dispatcher.register((payload) => {
      var action = payload.action;

      if (payload.source === 'ACTION') {
        if (action.actionType === 'get-graph') {
          this.loadData('fitness', action.data.table, JSON.parse(action.data.query))
            .then((data) => {
              dispatcher.handleAction({
                actionType: 'graph-data',
                data: {
                  name: action.data.title,
                  data: data
                }
              });
            });
        }
      }
    });
  },

  loadData(project, table, query) {
    return $.get(`http://localhost:8081/${project}/${table}/${JSON.stringify(query)}`).then(function(data) {
      return data.data;
    });
  }
};

loader.init();

module.exports = loader;