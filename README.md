# Devboard

Devboard aims to provide an interactive visual feedback tool for developing user interface code. It's a bit like a development whiteboard. It is a port of the ClojureScript project [Devcards][devcards-cljs].

Devboard builds on top of hot reloading tooling to provide a framework-like API for displaying and running small portions of your application at a time.

[![npm version](https://img.shields.io/npm/v/devboard.svg)](https://www.npmjs.com/package/devboard) [![Build Status](https://img.shields.io/travis/glenjamin/devboard/master.svg)](https://travis-ci.org/glenjamin/devboard) ![MIT Licensed](https://img.shields.io/npm/l/devboard.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Say what now?](#say-what-now)
- [Installation & Setup](#installation-&-setup)
  - [Webpack](#webpack)
  - [kotatsu](#kotatsu)
- [Usage](#usage)
    - [Creating namespaces](#creating-namespaces)
    - [Creating cards](#creating-cards)
    - [Card bodies](#card-bodies)
- [API Docs](#api-docs)
- [Example](#example)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Say what now?

The best explanation of this approach, and its benefits, comes from [Bruce Hauman][bruce] - the original creator of the ClojureScript version in [his Strange Loop talk][devcards-strangeloop]. There is also a great write-up on the GitHub page for [the original devcards][devcards-cljs].

The general idea is for you to define a series of **cards**, which the tooling will organise for you in a browsable way. Each card represents some small portion of your program that executes and renders some result. When used within a hot-reloading environment these cards form a working space you can use as a scratchpad to try out small portions of your code.

Devboard is intended to be run within the context of your application, and the cards primarily to focus on the UI components.

Traditionally, when adding a UI component to your application you'll build it in one of the places its intended to end up. Commonly there'll only be one version on the page, and so it has to be in one of its possible states. Every time you make a change (even with hot reloading), you'd have to interact with it to see what the result is on the other states.

When dealing with much of the code in our applications, this is the point where we'd make use of unit tests, to exercise the relevant code automatically with a variety of inputs and states. This can be quite difficult with UI code - especially when it comes to verifying visual properties.

With Devboard, you'd create a few cards to display your component in different states, and build up the UI in isolation. You're able to see the result of your changes to all of these states at once. Hopefully this will lead to a better, more independent component, and also be a much nicer way to work.

[devcards-cljs]: https://github.com/bhauman/devcards
[bruce]: https://github.com/bhauman/
[devcards-strangeloop]: https://www.youtube.com/watch?v=G7Z_g2fnEDg

## Installation & Setup

I'm planning to write a more guided tutorial-style quick-start guide, but for now you'll have to make do with the guidance in this README.

Firstly you'll need Devboard itself.

```sh
npm install devboard --save-dev
```

And then you'll need wire it into your application / build system. The module itself aims to remain agnostic of build systems, so you do need a bit of plumbing here. As the system matures perhaps it will make sense to wrap these up into additional related modules.

The following section needs work, for now refer to the [Example](#example) for help.

### Webpack

> TODO: flesh this out more

If you're already using webpack, you can extend your existing config to also create a devboard bundle.

If you're not already using webpack, you can still use it to create a bundle, but you might find [kotatsu](#kotatsu) easier to get going with.

  * Create entrypoint which includes cards

  ```js
  var context = require.context('./', true, /\.card\.js$/);
  context.keys().forEach(function(moduleName) {
    context(moduleName);
  });
  module.hot.accept();
  ```
  * Add supporting settings to webpack config
    * Enable hot reloading
    * Enable the JSON loader
  * Add new entrypoint into build config
  * Create basic `index.html` to load new entrypoint

### kotatsu

> TODO: flesh this out more

  * Create entrypoint which includes cards

  ```js
  var context = require.context('./', true, /\.card\.js$/);
  context.keys().forEach(function(moduleName) {
    context(moduleName);
  });
  module.hot.accept();
  ```
  * Pass the appropriate settings to run this entrypoint

This is the approach used by [the example](./example), so you can refer to that for more information.

## Usage

We'll assume you've followed the setup guide above, so you can now create files ending in `.card.js` and they'll be loaded into the system.

#### Creating namespaces

First, we need to declare a namespace to put some cards in. This is mainly for organisation purposes. You can have as many of these as you want in a file, but it's probably easier to keep it one-to-one. If a namespace is re-declared it is emptied of cards, when combined with hot reloading this works to replace the namespace with the latest version of the cards.

When we declare a namespace, the return value is a `definecard` function which can be used to add cards into that namespace.

```js
var devboard = require('devboard');
var definecard = devboard.ns('A bunch of cards');
```

#### Creating cards

Now that we have a definecard function, we can begin defining cards.

A card is made up of one or more of:

  * `name` **string** - A name
  * `doc` **string** - Markdown documentation
  * `body` **anything** - What to render in the card
  * `options` **object** - Some options, see below

To define a card, call the function with some combination of these, the list below shows the combinations that are possible.

```js
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
defincard.off(...)
```

Hopefully when you start using it, these combinations should begin to feel natural.

See the example site for [a walkthrough](http://glenjamin.github.io/devboard/#/API Walkthrough/) of what you can do with cards.

##### Available options

  * `frame` **boolean** - show a border around the card, defaults to `true` if named
  * `state` **anything** - some initial state for the card
  * `inspect` **boolean** - show the state in the card footer, defaults to `false`
  * `hidden` **boolean** - hide the card, same as using `defincard.off`
  * `onTick(card)` **function** - will be called on every tick if set
  * `tickInterval` **number** - how often to tick in ms, defaults to `2000`
  * `tickAutoplay` **boolean** - start ticking automatically, defaults to `true`

#### Card bodies

Part of the power of Devboard is the heavily polymorphic nature of the `body` parameter. There are plans to make it easy for users to extend the set of things which can be rendered in the body, but the current list is quite substantial. It is still possible to extend by wrapping the `definecard` function with your own transforms.

The example site has a [datatypes](http://glenjamin.github.io/devboard/#/Datatypes/) page which showcases many of the supported types.

## API Docs

The main entrypoint for devboard is the `ns` method.

##### devboard.ns(name) => definecard

* `name` **string**

See [Creating namespaces](#creating-namespaces)

##### definecard(...)

See [Creating cards](#creating-cards) for a full description of this function.

See [Card bodies](#card-bodies) for a help on what can be rendered in a `body`.

********

The other methods are all helpers to make it easier to write expressive cards succinctly.

##### devboard.atom() => js-atom

[[example](http://glenjamin.github.io/devboard/#/2.%20Datatypes/Working%20with%20atoms)]

A convenience re-export of the [createAtom](https://github.com/cjohansen/js-atom#createatomval-options) function from the [js-atom](https://github.com/cjohansen/js-atom) project.

##### devboard.Row Component

[[example](http://glenjamin.github.io/devboard/#/2.%20Datatypes/React%20Row)]

A React component which renders each of its children in a box floated left with some healthy spacing between them.

Useful if you have a small component and you want to render a bunch of them in a row on your card.

##### devboard.DOMNode(render, cleanUp) => DOMNodeBody

[[example](http://glenjamin.github.io/devboard/#/2.%20Datatypes/DOM%20Elements)]

* `render(node)` **function** - called on initial mount and then every update
* `cleanUp(node)` **function** - called when about to be removed

A helper function for working with non-React systems. The `render` function is passed a DOM node which you can modify however you want. If the card state changes it will be called again. When the card is being removed, the `cleanUp` function will be called to let you tidy up.

```js
definecard('Just DOM',
  devboard.DOMNode(function render(node) {
    node.innerHTML = '<p>Who needs React anyway?</p>';
  })
)
```

You could then use another wrapper around this to plug in whatever templating language or component tool you're using.

## Example

One of the best ways to see what Devboard is about is to experience it.

You can see the hosted example at http://glenjamin.github.io/devboard/ - each page has a link to the source which generates it.

However, the real power is the feedback when making live changes. To see this in action you can run the example on your local machine after cloning this repository.

```sh
cd example
npm install
npm start
```

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

Copyright 2016 Glen Mailer.

MIT Licened.
