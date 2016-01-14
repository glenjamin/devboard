import React, {Component, PropTypes} from 'react';
import DevCard from './DevCard.jsx';

const style = {
  app: {
    backgroundColor: '#fff',
    margin: '0',
    maxWidth: '600px',
    paddingBottom: '100px'
  },
  heading: {
    margin: 0,
    padding: '20px 10px'
  }
}

export default class DevCards extends Component {
  render() {
    const {catalog} = this.props;

    return (
      <div style={style.app}>
        <h1 style={style.heading}>DevCards</h1>
        {Object.keys(catalog).map(m => {
          return (
            <div key={m}>
              <h2>{m}</h2>
              {catalog[m].map((props, i) => {
                return <DevCard key={i} {...props} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

DevCards.propTypes = {
  catalog: PropTypes.object.isRequired
};
