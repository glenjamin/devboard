# Devcards

Devcards aims to provide an interactive visual feedback tool for developing user interface code. It is a port of the [ClojureScript project of the same name][devcards-cljs].

Devcards builds on top of hot reloading tooling to provide a framework-like API for displaying and running small portions of your application at a time.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Say what now?](#say-what-now)
- [Installation & Setup](#installation-&-setup)
  - [Webpack](#webpack)
  - [kotatsu](#kotatsu)
- [Usage](#usage)
- [Example](#example)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Say what now?

The best explanation of this approach, and its benefits, comes from [Bruce Hauman][bruce] - the original creator of the ClojureScript version in [his Strange Loop talk][devcards-strangeloop].

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

### Webpack

> TODO

### kotatsu

> TODO

## Usage

## Example

One of the best ways to see what Devcards is about is to experience it.

You can see the hosted example at http://glenjamin.github.io/devcards-js/ - each page has a link to the source which generates it.

However, the real power is the feedback when making live changes. To see this in action you can run the example on your local machine

```sh
cd example
npm install
npm start
```

## License

Copyright 2015 Glen Mailer.

MIT Licened.
