var React = require('react');

var Conversion = React.createClass({
  render() {
    var credibleLabel =  <span className="label label-default">Неизвестно</span>;
    if (this.props.data) {
      if (this.props.data.isCredible) {
        credibleLabel = <span className="label label-success">Да</span>;
      } else {
        credibleLabel = <span className="label label-danger">Нет</span>;
      }
    }

    return (<div className="well conversion">
      <h3>{this.props.title}</h3>
      <h5>Конверсия <span className="label label-default">{(this.props.data && this.props.data.value) * 100 + '%'}</span></h5>
      <h5>Доверительный интервал <span className="label label-default">{(this.props.data && this.props.data.interval) * 100 + '%'}</span></h5>
      <h5>Пользователей <span className="label label-default">{this.props.data && this.props.data.n}</span></h5>
      <h5>Статистическая достоверность {credibleLabel} </h5>
      <button type="button" className="btn btn-default" onClick={this.props.changeConversion.bind(this, this.props.title)}>Изменить конверсию</button>
    </div>
    );
  }
});

module.exports = Conversion;