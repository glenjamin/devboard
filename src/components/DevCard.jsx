import React, {Component, PropTypes} from 'react';
import markdown2react from '../markdown2react.js';

const style = {
  card: {
    border: '1px solid #ddd',
    margin: '10px',
    backgroundColor: '#fff'
  },
  heading: {
    margin: 0,
    padding: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    color: '#666'
  },
  doc: {
    backgroundColor: '#fff'
  },
  body: {
    padding: '10px',
  }
};

export default class DevCard extends Component {
  render() {
    const {name, doc, body} = this.props;

    return (
      <div style={style.cardStyle}>
        <h3 style={style.headingStyle}>
          {name}
        </h3>
        <div style={style.docStyle}>
          {markdown2react(doc)}
        </div>
        <div style={style.bodyStyle}>
        {typeof body === 'function' ? body() : body}
        </div>
      </div>
    );
  }
}

DevCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  doc: React.PropTypes.string.isRequired,
  body: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node,
  ]).isRequired
};
