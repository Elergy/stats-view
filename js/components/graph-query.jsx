var React = require('react');

var dispatcher = require('./../dispatcher.es6');

var GraphQuery = React.createClass({
  getInitialState() {
    return this.props.graph || this.props.conversion || {
        table: '',
        title: '',
        base: '0',
        query: '{}',
        func: 'function(data) {return data;}'
      }
  },

  onChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  },

  componentWillReceiveProps(props) {
    if ((props.graph || props.conversion) && !this.isMounted()) {
      this.setState(props.graph || props.conversion);
    }
  },

  save() {
    if (this.state.title && this.state.table && this.state.query && this.state.func) {
      dispatcher.handleViewAction({
        actionType: this.props.type === 'graph' ? 'new-graph' : 'new-conversion',
        data: {
          title: this.state.title,
          table: this.state.table,
          query: this.state.query,
          func: this.state.func,
          base: this.state.base
        }
      });
    }
    this.props.done();
  },

  close() {
    this.props.done();
  },

  render() {
    var conversionBaseField;
    if (this.props.type === 'conversion') {
      conversionBaseField = (<input type="text"
                                    className="form-control"
                                    placeholder="Базовая конверсия"
                                    onChange={this.onChange}
                                    name='base'
                                    value={this.state.base}>
      </input>);
    }

    return (<div className='col-md-6 add-query'>
      <div className='form-group'>
        <input type="text" className="form-control" placeholder="Название" onChange={this.onChange} name='title'
               value={this.state.title}></input>
      </div>
      <div className='form-group'>
        <input type="text" className="form-control" placeholder="Таблица для выборки" onChange={this.onChange}
               name='table' value={this.state.table}></input>
        <textarea className="form-control" rows="3" placeholder="Запрос" onChange={this.onChange} name='query'
                  value={this.state.query}></textarea>
        {conversionBaseField}

      </div>
      <div className='form-group'>
        <textarea className="form-control" rows="3" placeholder="Функция преобразования" onChange={this.onChange}
                  name='func' value={this.state.func}></textarea>
      </div>
      <div className='form-group'>
        <button type='button' className='btn btn-default btn-lg' onClick={this.save}>Сохранить</button>
        <button type='button' className='btn btn-default btn-lg' onClick={this.close}>Отмена</button>
      </div>
    </div>
    );
  }
});

module.exports = GraphQuery;