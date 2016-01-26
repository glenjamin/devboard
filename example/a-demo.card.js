import devcards from '../';
import React from 'react';

var devcard = devcards.ns('API Walkthrough');

devcard('A devcard',
  `
  A simple card comprises a name, then
  [markdown](http://commonmark.org/) documentation,
  followed by a body.
  ~~~js
  devcard(name, doc, body);
  ~~~
  `,
  <div className="alert alert-info">
    <p>
      A body can be <big><strong>all</strong></big> kinds of things,
      this one is made of React elements.
    </p>
  </div>
);

devcard.anon(
  `
  Cards don't have to have names.

  When they don't have a name, they don't usually display like cards -
  there's no frame.

  ~~~js
  devcard.anon(doc, body)
  ~~~

  The quote below is the body of this card.
  `,
  <blockquote>What's in a name, anyway?</blockquote>
);

devcard.anon(
  `
  If you don't want a name, but you do want the frame -
  you can pass an option to turn it on.

  ~~~js
  devcard.anon(doc, body, { frame: true })
  ~~~
  `,
  <blockquote>I feel safer with a fence up!</blockquote>,
  { frame: true }
);

devcard(
  `
  Frameless cards are quite useful when you only want to do some docs.

  This card doesn't even have a body!

  ~~~js
  devcard(doc)
  ~~~

  When there's only one argument, you don't need to use
  \`devcard.anon\`. We'll figure it out.
  `
);

devcard(
  `
  You can also have a card which is only a body

  ~~~js
  devcard(body)
  ~~~
  `
);

devcard(
  <ul className="list-group">
    <li className="list-group-item">This</li>
    <li className="list-group-item">card</li>
    <li className="list-group-item">is</li>
    <li className="list-group-item">body</li>
    <li className="list-group-item">
      only
      <span className="badge">42</span>
    </li>
  </ul>
);

devcard('Flexibility',
  `
  There's a lot of flexibility in this API.

  Pretty much every useful combination of name, docs, body
  and options is available.

  ~~~js
  devcard(doc)
  devcard(body)
  devcard(name, body)
  devcard(name, doc)
  devcard(name, doc, body)
  devcard(name, doc, body, options)
  devcard.anon(doc)
  devcard.anon(body)
  devcard.anon(doc, body)
  devcard.anon(body, options)
  devcard.anon(doc, body, options)
  devcard.off(body)
  devcard.off(name, doc)
  devcard.off(name, doc, body)
  devcard.off(name, doc, body, options)
  ~~~
  `
);

devcard('Syntax Highlight',
  `
  Code is obviously highlighted.

  ~~~js
  const string = 'Hello World!';

  function sayHello(greeting) {
    console.log(greeting);
  }

  sayHello(string);

  const object = {
    one: 1,
    two: 2
  };
  ~~~

  And JSX works outside of the box.

  ~~~jsx
  class Button extends Component {
    render() {
      return <button role="button">Click Me!</button>;
    }
  }
  ~~~

  And this is code not highlighted but escaped nonetheless.

  ~~~
  <button role="button">Click Me!</button>
  ~~~
  `
);
