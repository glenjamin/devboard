# Devcards

Devcards aims to provide an interactive visual feedback tool for developing user interface code. It is a port of the [ClojureScript project of the same name][devcards-cljs].

Devcards builds on top of hot reloading tooling to provide a framework-like API for displaying and running small portions of your application at a time.

[![npm version](https://img.shields.io/npm/v/devcards.svg)](https://www.npmjs.com/package/devcards) [![Build Status](https://img.shields.io/travis/glenjamin/devcards-js/master.svg)](https://travis-ci.org/glenjamin/devcards-js) ![MIT Licensed](https://img.shields.io/npm/l/devcards.svg)

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
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Say what now?

The best explanation of this approach, and its benefits, comes from [Bruce Hauman][bruce] - the original creator of the ClojureScript version in [his Strange Loop talk][devcards-strangeloop]. There is also a great write-up on the GitHub page for [the original devcards][devcards-cljs].

The general idea is for you to define a series of **cards**, which the tooling will organise for you in a browsable way. Each card represents some small portion of your program that executes and renders some result. When used within a hot-reloading environment these cards form a working space you can use as a scratchpad to try out small portions of your code.

Devcards is intended to be run within the context of your application, and the cards primarily to focus on the UI components.

Traditionally, when adding a UI component to your application you'll build it in one of the places its intended to end up. Commonly there'll only be one version on the page, and so it has to be in one of its possible states. Every time you make a change (even with hot reloading), you'd have to interact with it to see what the result is on the other states.

When dealing with much of the code in our applications, this is the point where we'd make use of unit tests, to exercise the relevant code automatically with a variety of inputs and states. This can be quite difficult with UI code - especially when it comes to verifying visual properties.

With devcards, you'd create a few cards to display your component in different states, and build up the UI in isolation. You're able to see the result of your changes to all of these states at once. Hopefully this will lead to a better, more independent component, and also be a much nicer way to work.

[devcards-cljs]: https://github.com/bhauman/devcards
[bruce]: https://github.com/bhauman/
[devcards-strangeloop]: https://www.youtube.com/watch?v=G7Z_g2fnEDg

## Installation & Setup

For a more guided introduction that makes some tooling choices for you, see the [Quick Start Guide](#) (this doesn't exist yet).

Firstly you'll need devcards itself.

```sh
npm install devcards --save-dev
```

And then you'll need wire it into your application / build system. The module itself aims to remain agnostic of build systems, so you do need a bit of plumbing here. As the system matures perhaps it will make sense to wrap these up into additional related modules.

The following section needs work, for now refer to the [Example](#example) for help.

### Webpack

> TODO: flesh this out more

If you're already using webpack, you can extend your existing config to also create a devcards bundle.

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
  * Create basic index.html to load new entrypoint

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

When we declare a namespace, the return value is a `devcard` function which can be used to add cards into that namespace.

```js
var devcards = require('devcards');
var devcard = devcards.ns('A bunch of cards');
```

#### Creating cards

Now that we have a devcard function, we can begin adding cards.

A card is made up of one or more of:

  * A name
  * Markdown documentation
  * A body
  * Some options

To define a card, call the function with some combination of these, the list below shows the combinations that are possible.

```js
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
```

Hopefully when you start using it, these combinations should begin to feel natural.

See the example site for [a walkthrough](http://glenjamin.github.io/devcards-js/#/API Walkthrough/) of what you can do with cards.

#### Card bodies

Part of the power of devcards is the heavily polymorphic nature of the `body` parameter. There are plans to make it easy for users to extend the set of things which can be rendered in the body, but the current list is quite substantial. It is still possible to extend by wrapping the `devcard` function with your own transforms.

The example site has a [datatypes](http://glenjamin.github.io/devcards-js/#/Datatypes/) page which showcases many of the supported types.

## API Docs

> TODO: See http://glenjamin.github.io/devcards-js/ for now

## Example

One of the best ways to see what Devcards is about is to experience it.

You can see the hosted example at http://glenjamin.github.io/devcards-js/ - each page has a link to the source which generates it.

However, the real power is the feedback when making live changes. To see this in action you can run the example on your local machine after cloning this repository.

```sh
cd example
npm install
npm start
```

## License

Copyright 2015 Glen Mailer.

MIT Licened.
