import devcards from '../';
import React from 'react';

var devcard = devcards.ns('API Walkthrough');

devcard(
  'A devcard',
  `
  A simple card comprises a name, then
  [markdown](http://commonmark.org/) documentation,
  followed by a body.
  \`\`\`js
  devcard(name, doc, body);
  \`\`\`
  `,
  <div>
    <hr />
    <p>
      A body can be <big><strong>all</strong></big> kinds of things,
      this one is made of React elements.
    </p>
  </div>
);

devcard.anon(
  `
  Cards don't have to have names
  \`\`\`js
  devcard.anon(doc, body)
  \`\`\`
  `,
  <h3>What's in a name, anyway?</h3>
);
