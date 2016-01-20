/* eslint-env mocha */
var expect = require('chai').expect;

var routes = require('../lib/routes');
var createHref = routes.createHref;

describe('createHref()', function() {

  it('accepts createHref()', function() {
    expect(createHref()).to.eql('/#/');
  });

  it('accepts createHref(namespace)', function() {
    expect(createHref('buttons')).to.eql('/#/buttons');
  });

  it('accepts createHref(namespace, card)', function() {
    expect(createHref('buttons', 'loading')).to.eql('/#/buttons/loading');
  });

  it('should handle URI components', function() {
    expect(createHref('Fancy buttons', 'Loading button')).to.eql(
      '/#/Fancy%20buttons/Loading%20button'
    );
  });
});
