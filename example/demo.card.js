import devboard from '../';
import React from 'react';
import Color from 'color-js';
import { combine } from '../lib/utils';

var definecard = devboard.ns('Sheffield.JS');

var logoUrl = [
  "https://pbs.twimg.com/profile_images",
  "/378800000571273047",
  "/acc33eb2917943e83574de91e0ff41f8.png"
].join('');
definecard('intro', `
  Hello Sheffield JS!
`,
  <img width="100" height="100" src={logoUrl} />
);

var style = {
  container: { width: 50 },
  stickWrapper: { position: 'relative', height: 200 },
  stick: {
    position: 'absolute',
    bottom: 0, left: 15,
    width: 30, height: 201,
    background: 'white',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: 'hidden'
  },
  mercury: { width: 28 },
  marking: {
    position: 'absolute',
    fontSize: 6,
    boxSizing: 'border-box',
    width: 25,
    color: '#666',
    borderBottom: '1px solid #666',
  },
  bulb: {
    marginTop: -7,
    marginLeft: 10,
    width: 40, height: 40,
    borderRadius: 100,
    border: '1px solid black'
  },
  label: { textAlign: 'center' }
};

var ThermometerIMadeEarlier = React.createClass({
  render() {
    var { temp } = this.props;
    temp = restrict(temp, -50, 150);
    var percentage = calcPercent(temp, -50, 150);
    var size = percentage * 2;
    var color = colourPoint('#66f', '#900', percentage * 1.5);
    return (
      <div style={style.container}>
        <div style={style.stickWrapper}>
          <div style={style.stick}>
            <div style={combine(
              style.mercury,
              {
                background: color,
                transition: 'height 1s, margin-top 1s',
                height: size,
                marginTop: 200 - size,
              })}
            />
          </div>
          {range(-30, 140, 10).map(t => (
            <span style={combine(
              style.marking,
              { top: 150 - t }
            )}>{t}</span>
          ))}
        </div>
        <div style={combine(style.bulb, { background: color })} />
        <p style={style.label}>
          {temp}
        </p>
      </div>
    );
  }
});

var Row = function({ children }) {
  return (<div style={{ overflow: 'hidden' }}>
    {React.Children.map(children, child => (
      <div style={{
        float: 'left', border: '1px solid #ccc', padding: 20, margin: 10
      }}>{child}</div>
    ))}
  </div>);
};

definecard.off(
  'Thermometer demo',
  `Things are hotting up!`,
  ({state}) => <div>
    <Row>
      <ThermometerIMadeEarlier temp={-30} />
      <ThermometerIMadeEarlier temp={50} />
      <ThermometerIMadeEarlier temp={state.deref().ticking - 50} />
      <div>
        <ThermometerIMadeEarlier temp={state.deref().temp} />
        <input
          type="text" size="4" value={state.deref().temp}
          onChange={({target}) => state.swap(set('temp', target.value))} />
      </div>
    </Row>
  </div>,
  {
    state: devboard.atom({ temp: 0, ticking: 0 }),
    onTick: ({state}) => state.swap(set('ticking', t => (t + 5) % 200)),
    tickInterval: 200
  }
);

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

function range(start, end, step) {
  var arr = [];
  for (var i = start; i <= end; i += step) arr.push(i);
  return arr;
}
