# Changelog

## Unreleased Changes

## v0.7.1

 * Bump version of history dependency
 * Allow use with React 0.14 via peerDependencies

## v0.7.0

 * Added option to display table-of-contents on namespace pages
 * Improve formatting of large objects when used as a card body
 * Add `resettable` option, to display a button that remounts the card body

## v0.6.2

 * Republish using Node LTS to avoid npm bug that sometimes leaves out files

## v0.6.1

 * Fix unitless CSS warning introduced in React 15

## v0.6.0

 * New function `devboard.customRender(fn: (el: ReactElement) => ReactElement)` which allows wrapping the root component with something custom. Created with React-hot-loader v3 in mind.
 * Now depends on React 15.1+

## v0.5.0

 * Added a `title` option to cards which allows you to hide the card title.

## v0.4.0

 * Added `devboard.Row` helper for layout out small components horizontally on a card
