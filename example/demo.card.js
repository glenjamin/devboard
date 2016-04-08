import devboard from '../';
import React from 'react';
import Color from 'color-js';
import { combine } from '../lib/utils';

var definecard = devboard.ns('4. Thermometer demo');

definecard(`
This demo is of a component which was built iteratively using devboard.

Unfortunately, because you're looking at a static page, you can only see the
end product. I'm planning to re-work this demo to show all of the intermediary
stages at some point, ideally also with an associated screencast.
`);

var style = {
  container: { width: 50 },
  stickWrapper: { position: 'relative', height: 200 },
  stick: {
    position: 'absolute',
    boxSizing: 'content-box',
    top: -1, bottom: 0, left: 15, right: 5,
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

var Thermometer = React.createClass({
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
          {range(-40, 140, 10).map(t => (
            <span style={combine(
              style.marking,
              { bottom: t + 50 }
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

definecard(
  'Thermometer demo',
  `Things are hotting up!`,
  ({state}) => <div>
    <devboard.Row>
      <Thermometer temp={-30} />
      <Thermometer temp={50} />
      <Thermometer temp={state.deref().ticking - 50} />
      <div>
        <Thermometer temp={state.deref().temp} />
        <input
          type="text" size="4" value={state.deref().temp}
          onChange={({target}) => state.swap(set('temp', target.value))} />
      </div>
    </devboard.Row>
  </div>,
  {
    state: devboard.atom({ temp: 0, ticking: 0 }),
    onTick: ({state}) => state.swap(set('ticking', t => (t + 5) % 200)),
    tickInterval: 200, tickAutoplay: false
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
