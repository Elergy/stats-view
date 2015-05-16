var Dispatcher = require('flux').Dispatcher;

var dispatcher = new Dispatcher();

dispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'ACTION',
    action: action
  });
};

module.exports = dispatcher;