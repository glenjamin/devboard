import devboard from '../';
import single from 'webpack-hmr-singleton';
import React from 'react';

import { sourceLink } from './misc';

var definecard = devboard.ns('2. Datatypes');

sourceLink(definecard, __dirname, __filename);

var mdn = 'https://developer.mozilla.org/en-US/docs/Web/Javascript';

definecard(`
  The body of a card can be many different things,
  here are some examples:
`);

definecard('string',
  `Strings are rendered as CommonMark`,
  `
   * [Strings](${mdn}/Reference/Global_Objects/String)
   * [CommonMark](http://commonmark.org/)

  ***

  # ⚡️ TADA ⚡️ #
  `
);

definecard('number',
  `Numbers are rendered as – unsuprisingly – *numbers*`,
  42
);

definecard('function',
  `Functions get called, and their result rendered`,
  function() {
    return `
~~~js
function() { return 'an example'; }
~~~
    `;
  }
);

definecard('function with state',
  `Functions can also receive a \`card\` argument, which allows
  them to hold some state like a React component.

  * \`card.state\` - the current value of the card's state
  * \`card.setState(fn)\` - update the card's state.

  The initial state can be passed using the \`state\` option.

  To pretty-print the current value, enable the \`inspect\` option.

  ~~~jsx
  ${require('!!raw!./source-loader?token=func-state&indent=2!' + __filename)}
  ~~~
  `,
  // func-state
  function(card) {
    return (
      <div>
        <p>
          <button onClick={() => card.setState({ n: 0 })}>
            ZERO
          </button>
          <button onClick={() => card.setState(s => ({ n: s.n + 1 }))}>
            INC
          </button>
          <button onClick={() => card.setState(s => ({ n: s.n - 1 }))}>
            DEC
          </button>
        </p>
        <p>
          The current value of <kbd>n</kbd> is <kbd>{card.state.n}</kbd>
        </p>
      </div>
    );
  },
  {
    state: { n: 0 },
    inspect: true
  }
  // func-state
);

definecard('State and Timers',
  `When a card has state, you can also supply options for a function that will
  be called at set intervals which can modify the state.

  This is most useful for automatically showing the transition between two
  states of rendering. A button to disable the tick will get added into the
  footer of the card.

  * \`onTick(card)\` - a function to be called each tick, receives card with:
    * \`card.state\` - the current value of the card's state
    * \`card.setState(fn)\` - update the card's state.
  * \`tickInterval\` - the time between ticks in ms, defaults to 2s.
  * \`tickAutoplay\` - should the timer autoplay, defaults to true

  ~~~jsx
  ${require('!!raw!./source-loader?token=state-timer&indent=2!' + __filename)}
  ~~~

  `,
  // state-timer
  function(card) {
    var bg = ['#333', '#ccc'][card.state];
    return (
      <div style={{
        width: 100, height: 50,
        lineHeight: '50px',
        margin: '0 auto',
        textAlign: 'center',
        border: '1px solid black',
        transition: 'background-color 3s',
        backgroundColor: bg,
        color: 'white'
      }}>
        {bg}
      </div>
    );
  },
  {
    state: 0,
    onTick: function(card) { card.setState(n => (n + 1) % 2); },
    tickInterval: 3000, tickAutoplay: false
  }
  // state-timer
);

definecard('***********');

var ListToggle = React.createClass({
  getInitialState() { return { current: 'Cuddly Toy' }; },
  render() {
    var current = this.state.current;
    var options = [
      'Food Processor', 'Fondue Set', 'Cuddly Toy', 'Dinner Service'
    ];
    return (
      <ul className="list-group">
        {options.map(o =>
          <li
            key={o}
            className={`list-group-item ${current == o ? 'active' : ''}`}
            onClick={() => this.setState({ current: o })}
          >
            {o}
          </li>
        )}
      </ul>
    );
  }
});

definecard('React',
  `Any ReactElement is rendered into the card

  ~~~jsx
  <ListToggle />
  ~~~
  `,
  <ListToggle />
);

definecard('DOM Elements',
  `If you're not using React, you can still make cards with Devboard.

  You can use the \`DOMNode\` wrapper for this. You pass a function, and
  you'll be given a DOM Node you can do whatever you want to. If you pass a
  second argument, you can use it to perform any clean up tasks.

  ~~~js
  ${require('!!raw!./source-loader?token=dom-node&indent=2!' + __filename)}
  ~~~
  `,
  // dom-node
  devboard.DOMNode(
    function render(node) {
      node.innerHTML = '<h1>Who needs React anyway?</h1>';
    },
    function cleanUp() {

    }
  )
  // dom-node
);

definecard('DOM Elements with State',
  `You can also combine the DOM Node helper with a function for state.

  It's up to you to make sure this function is able to cleanly update from one
  state to the next.

  ~~~js
  ${require('!!raw!./source-loader?token=dom-state&indent=2!' + __filename)}
  ~~~
  `,
  // dom-state
  function(card) {
    return devboard.DOMNode(
      function render(node) {
        node.innerHTML = (
          '<button>I can count to: ' +
          card.state +
          '</button>'
        );
        node.onclick = () => card.setState(n => n + 1);
      }
    );
  },
  { state: 0 }
  // dom-state
);

definecard('***********');

definecard('RegExp',
  `Regular expressions also get displayed neatly.

  If you type into the box, you can test what it matches.`,
  /^([de]{2}v)(c|bo|ard){2}s?/
);

definecard('Date',
  `Javascript date objects get converted to a readable form`,
  new Date()
);

definecard(
  `Datatype rendering is powered by [inspect-x]. This handles most built-in
  Javascript datatypes, as well as any custom types which implement their own
  \`inspect()\` method.

  [inspect-x]: https://github.com/Xotic750/inspect-x
  `
);

definecard('Array',
  `Arrays get displayed neatly with some colour`,
  [ 5, 6, 7, 8 ]
);

definecard('object',
  `Ordinary JS objects also get displayed neatly with some colour`,
  { a: 1, b: 2, c: 3 }
);

if (typeof Set === 'function') {
  definecard('ES6 Set',
    `ES6 Sets get displayed neatly with some colour`,
    new Set([5, 7, 11, 13, 17])
  );
}

if (typeof Map === 'function') {
  definecard('ES6 Map',
    `ES6 Maps get displayed neatly with some colour`,
    new Map([['a', 1], ['b', 2], [3, 'c']])
  );
}

definecard('***********');

definecard(
  `Devboard can also work with data which changes, it uses [js-atom]
  as the wrapper to co-ordinate these changes.

  To help make things easier the \`createAtom\` function is exposed
  on the \`devboard\` module:

  ~~~js
  var atom = devboard.atom({ stuff: 123 });
  ~~~

  [js-atom]: https://github.com/cjohansen/js-atom
  `
);

// make-atom
var atom1 = single(module, 'atom1', () => {
  var atom = devboard.atom({ tick: 0 });
  setInterval(
    () => atom.swap(a => ({ tick: a.tick + 1 })),
    1000
  );
  return atom;
});
// make-atom

definecard('atom',
  `[Atoms][js-atom] can be rendered directly, which will attach a
  subscription and re-render whenever the value changes.

  This is done via duck typing on the \`deref()\`, \`addWatch()\` and
  \`removeWatch()\` methods, so anything that looks like an atom
  should work.

  ~~~js
  ${require('!!raw!./source-loader?token=make-atom&indent=2!' + __filename)}
  definecard('atom', '... description ...', atom1);
  ~~~

  [js-atom]: https://github.com/cjohansen/js-atom
  `,
  atom1
);

definecard('sharing atoms',
  `Atoms can be shared between cards. This can be very useful to
  create an ad-hoc control panel for another card.

  When the \`state\` option is detected to be an atom, the card
  will subscribe to changes. This can also be combined with \`inspect\`

  ~~~jsx
  var single = require('webpack-hmr-singleton');
${require('!!raw!./source-loader?token=shared-atoms&indent=2!' + __filename)}
  ~~~
  `
);

// shared-atoms
var sharedAtom = single(module, 'sharedAtom', () => devboard.atom(0));

definecard('shared-atom', sharedAtom);
definecard('shared-atom-render', ({ state }) => (
  <h1>Value: {state.deref()}</h1>
), { state: sharedAtom, inspect: true });
definecard('shared-atom-inc', ({ state }) => (
  <button onClick={() => state.swap(n => n + 1)}>INC</button>
), { state: sharedAtom });
definecard('shared-atom-dec', ({ state }) => (
  <button onClick={() => state.swap(n => n - 1)}>DEC</button>
), { state: sharedAtom });
// shared-atoms
