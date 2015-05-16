var React = require('react');

require('./workers/data-loader.es6');
var GraphManager = require('./components/graph-manager.jsx');

React.render(<GraphManager />, document.querySelector('.container'));
