import React from 'react';

var ListToggle = React.createClass({
  options: ['Food Processor', 'Fondue Set', 'Cuddly Toy', 'Dinner Service'],
  getInitialState() {
    var n = parseInt(this.props.default);
    return { current: n >= 0 ? n : 2 };
  },
  render() {
    var current = this.state.current;
    return (
      <ul className="list-group">
        {this.options.map((o, i) =>
          <li
            key={i}
            className={`list-group-item ${current == i ? 'active' : ''}`}
            onClick={() => this.setState({ current: i })}
          >
            {o}
          </li>
        )}
      </ul>
    );
  }
});

export default ListToggle;
