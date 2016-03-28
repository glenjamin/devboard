/* eslint-disable */
import devboard from '../';
import single from 'webpack-hmr-singleton';
import React from 'react';
import Color from 'color-js';

var definecard = devboard.ns('Sheffield.JS');

definecard('intro', `
  Hello Sheffield JS!
`,
  <img
    width="100" height="100"
    src="https://pbs.twimg.com/profile_images/378800000571273047/acc33eb2917943e83574de91e0ff41f8.png"
  />
);

var Thermometer = React.createClass({
  render() {
    var { temp } = this.props;
    temp = restrict(temp, -50, 150);
    var percentage = calcPercent(temp, -50, 150);
    var size = percentage * 2;
    var color = colourPoint('#66f', '#900', percentage * 1.5);
    return (
      <div style={{ width: 40 }}>
        <div style={{ position: 'relative', height: 200 }}>
          <div style={{
            position: 'absolute',
            bottom: 0, left: 5,
            width: 30, height: 202,
            background: 'white',
            borderTop: '1px solid black',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            borderBottom: '1px solid ' + color,
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            overflow: 'hidden'
          }}>
            <div style={{
              background: color,
              width: 28,
              transition: 'height 1s, margin-top 1s',
              height: size,
              marginTop: 200 - size,
            }} />
          </div>
        </div>
        <div style={{
          marginTop: -7,
          width: 40, height: 40,
          background: color,
          borderRadius: 100,
          border: '1px solid black'
        }} />
        <p style={{ textAlign: 'center' }}>
          {temp}
        </p>
      </div>
    );
  }
});

var Row = function({ children }) {
  return <div style={{ overflow: 'hidden' }}>
    {React.Children.map(children, child => (
      <div style={{
        float: 'left', border: '1px solid #ccc', padding: 20, margin: 10
      }}>{child}</div>
    ))}
  </div>
}

definecard(
  'Thermometer demo',
  `Things are hotting up!`,
  ({state}) => <div>
    <Row>
      <Thermometer temp={-30} />
      <Thermometer temp={50} />
      <Thermometer temp={state.deref().ticking - 50} />
      <div>
        <Thermometer temp={state.deref().temp} />
        <input
          type="text" size="4" value={state.deref().temp}
          onChange={({target}) => state.swap(set('temp', target.value))} />
      </div>
    </Row>
  </div>,
  {
    state: devboard.atom({ temp: 0, ticking: 0 }),
    onTick: ({state}) => state.swap(set('ticking', t => (t+5) % 200)),
    tickInterval: 200
  }
)

function restrict(n, min, max) {
  if (n < min) n = min;
  if (n > max) n = max;
  return n;
}

function calcPercent(n, min, max) {
  return ((n - min) / (max - min)) * 100;
}

function colourPoint(a, b, percentage) {
  return Color(a).blend(Color(b), percentage / 100).toString();
}

function set(key, val) {
  return obj => Object.assign(
    {}, obj,
    { [key]: (typeof val === 'function') ? val(obj[key]) : val }
  );
}
