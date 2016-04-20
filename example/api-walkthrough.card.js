import devboard from '../';
import React from 'react';

import { sourceLink } from './misc';

var definecard = devboard.ns('1. API Walkthrough');

sourceLink(definecard, __dirname, __filename);

definecard('A card',
  `A simple card comprises a name, then markdown documentation
  via [commonmark](http://commonmark.org/), followed by a body.

  ~~~~jsx
  definecard(name, doc, body);

  // for example...
  definecard('A card',
    \`
    A simple card comprises a name, then markdown documentation
    via [commonmark](http://commonmark.org/), followed by a body.

    ~~~js
    definecard(name, doc, body);
    ~~~
    \`,
    <div className="alert alert-info">
      <p>
        A body can be <big><strong>all</strong></big> kinds of things,
        this one is made of React elements.
      </p>
      <p>
        See <a href="#/2. Datatypes">the Datatypes page</a> for examples of
        what kinds of things are supported.
      </p>
    </div>
  );
  ~~~~
  `,
  <div className="alert alert-info">
    <p>
      A body can be <big><strong>all</strong></big> kinds of things,
      this one is made of React elements.
    </p>
    <p>
      See <a href="#/2. Datatypes">the Datatypes page</a> for examples of
      what kinds of things are supported.
    </p>
  </div>
);

definecard.anon(
  `
  Cards don't have to have names.

  When they don't have a name, they don't usually display like cards -
  there's no frame.

  ~~~js
  definecard.anon(doc, body)
  ~~~

  The quote below is the body of this card.
  `,
  <blockquote>What's in a name, anyway?</blockquote>
);

definecard.anon(
  `
  If you don't want a name, but you do want the frame -
  you can pass an option to turn it on.

  ~~~js
  definecard.anon(doc, body, { frame: true })
  ~~~
  `,
  <blockquote>I feel safer with a fence up!</blockquote>,
  { frame: true }
);

definecard(
  `
  Frameless cards are quite useful when you only want to do some docs.

  This card doesn't even have a body!

  ~~~js
  definecard(doc)
  ~~~

  When there's only one argument, you don't need to use
  \`definecard.anon\`. We'll figure it out.
  `
);

definecard(
  `
  You can also have a card which is only a body

  ~~~jsx
  ${require('!!raw!part?token=body-only!' + __filename)}
  ~~~
  `
);

// body-only
definecard(
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
// body-only

definecard('Flexibility',
  `
  There's a lot of flexibility in this API.

  Pretty much every useful combination of name, docs, body
  and options is available.

  ~~~js
  definecard(doc)
  definecard(body)
  definecard(name, body)
  definecard(name, doc)
  definecard(name, doc, body)
  definecard(name, doc, body, options)
  definecard.anon(doc)
  definecard.anon(body)
  definecard.anon(doc, body)
  definecard.anon(body, options)
  definecard.anon(doc, body, options)
  definecard.off(body)
  definecard.off(name, doc)
  definecard.off(name, doc, body)
  definecard.off(name, doc, body, options)
  ~~~
  `
);

definecard('Syntax Highlighting',
  `
  As you may have noticed, the markdown code blocks are syntax highlighted.

  The highlighting is provided by [PrismJS](http://prismjs.com/).

  You can see it in action here on some meaty JavaScript.
  ~~~js
  const string = 'Hello World!';
  function sayHello(greeting) {
    console.log(greeting);
  }
  sayHello(string);
  var object = { one: 1, two: 2 };
  ~~~

  It can also handle JSX
  ~~~jsx
  class Button extends Component {
    render() {
      return <button role="button">Click Me!</button>;
    }
  }
  ~~~

  And many other common (and uncommmon) languages
  ~~~apacheconf
  RewriteCond %{HTTP_HOST} !^$
  RewriteCond %{HTTP_HOST} !^subdomain\.domain\.tld$ [NC]
  RewriteRule ^/(.*)$ http://subdomain.domain.tld/$1 [L,R=301]
  ~~~
  ~~~erlang
  P = {adam,24,{july,29}}.
  M1 = #{name=>adam,age=>24,date=>{july,29}}.
  M2 = maps:update(age,25,M1).
  io:format("{~p,~p}: ~p~n", [?MODULE,?LINE,X]).
  ~~~
  ~~~haskell
  factorial :: (Eq a, Num a) => a -> a
  factorial 0 = 1
  factorial n = n * factorial (n - 1)
  ~~~
  ~~~scheme
  (defcard-rg jamming
    [:div {:style {:border "10px solid blue" :padding "20px"}}
      [:h1 "Composing Reagent Hiccup on the fly"]
      [:p "adding arbitrary hiccup"]])
  ~~~

  The full list of languages can be found in the [prism docs], setting a
  language is done via the info string of a code fence.
  ~~~~markdown
  ~~~js
  // Code goes here
  ~~~
  ~~~~

  [prism docs]: http://prismjs.com/#languages-list
  `
);
