import devcards from '../';
import React from 'react';

var devcard = devcards.ns('API Walkthrough');

devcard(
  'A devcard',
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

devcard(
  'Alignement',
  `
  Cards can also align their body using the \`align\` option.
  `,
  <div>I am centered</div>,
  {align: 'center'}
);
