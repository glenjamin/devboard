import devcards from '../';
import React from 'react';

var devcard = devcards.ns('Datatypes');

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

devcard('Array',
  `Arrays get displayed neatly with some colour`,
  [ 5, 6, 7, 8 ]
);

devcard('object',
  `Ordinary JS objects also get displayed neatly with some colour`,
  { a: 1, b: 2, c: 3 }
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
