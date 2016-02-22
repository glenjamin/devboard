import devcards from '../';
import React from 'react';

import { sourceLink } from './misc';

var devcard = devcards.ns('Datatypes');

sourceLink(devcard, __dirname, __filename);

var mdn = 'https://developer.mozilla.org/en-US/docs/Web/Javascript';

devcard(`
  The body of a card can be many different things,
  here are some examples:
`);

devcard('string',
  `Strings are rendered as CommonMark`,
  `
   * [Strings](${mdn}/Reference/Global_Objects/String)
   * [CommonMark](http://commonmark.org/)

  ***

  # ⚡️ TADA ⚡️ #
  `
);

devcard('number',
  `Numbers are rendered as – unsuprisingly – *numbers*`,
  42
);

devcard('function',
  `Functions get called, and their result rendered

  > TODO: functions can also have state
  `,
  function() {
    return `
~~~js
function() { return 'an example'; }
~~~
    `;
  }
);

devcard('function with state',
  `Functions can also receive a \`card\` argument, which allows
  them to hold some state like a React component.

  * \`card.state\` - the current value of the card's state
  * \`card.setState()\` - update the card's state.

  The initial state can be passed using the \`initial\` option.

  To pretty-print the current value, enable the \`inspect\` option.

  ~~~jsx
  function(card) {
    return (
      <div>
        <button onClick={() => card.setState({ n: 0 })}>
          ZERO
        </button>
        <button onClick={() => card.setState(s => ({ n: s.n + 1 }))}>
          INC
        </button>
        <button onClick={() => card.setState(s => ({ n: s.n - 1 }))}>
          DEC
        </button>
        <p>
          The current value of <kbd>n</kbd> is <kbd>{card.state.n}</kbd>
        </p>
      </div>
    );
  },
  {
    initial: { n: 0 },
    inspect: true
  }
  ~~~

  `,
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
    initial: { n: 0 },
    inspect: true
  }
);

devcard('RegExp',
  `Regular expressions also get displayed neatly.

  If you type into the box, you can test what it matches.`,
  /^([de]{2}v)(ca|rd){2}s/
);

devcard('Date',
  `Javascript date objects get converted to a readable form`,
  new Date()
);

devcard(
  `Datatype rendering is powered by [inspect-x]. This handles most built-in
  Javascript datatypes, as well as any custom types which implement their own
  \`inspect()\` method.

  [inspect-x]: https://github.com/Xotic750/inspect-x
  `
);

devcard('Array',
  `Arrays get displayed neatly with some colour`,
  [ 5, 6, 7, 8 ]
);

devcard('object',
  `Ordinary JS objects also get displayed neatly with some colour`,
  { a: 1, b: 2, c: 3 }
);

if (typeof Set === 'function') {
  devcard('ES6 Set',
    `ES6 Sets get displayed neatly with some colour`,
    new Set([5, 7, 11, 13, 17])
  );
}

if (typeof Map === 'function') {
  devcard('ES6 Map',
    `ES6 Maps get displayed neatly with some colour`,
    new Map([['a', 1], ['b', 2], [3, 'c']])
  );
}

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

devcard('React',
  `Any ReactElement is rendered into the card`,
  <ListToggle />
);
