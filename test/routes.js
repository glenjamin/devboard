/* eslint-env mocha */
var expect = require('chai').expect;

var routes = require('../lib/routes');
var href = routes.href;
var path = routes.path;

describe('routes', function() {

  function route(pathname) {
    var match;
    routes.createRouter(function(_match) {
      match = _match;
    })(pathname);
    return match;
  }

  describe('path & href()', function() {
    it('accepts no args', function() {
      expect(href()).to.eql('#/');
      expect(route(path())).to.eql({});
    });

    it('accepts (namespace)', function() {
      expect(href('buttons')).to.eql('#/buttons');
      expect(route(path('buttons'))).to.eql({ namespace: 'buttons' });
    });

    it('accepts (namespace, card)', function() {
      expect(href('buttons', 'loading')).to.eql('#/buttons/loading');
      expect(route(path('buttons', 'loading'))).to.eql({
        namespace: 'buttons', card: 'loading'
      });
    });

    it('accepts (namespace, card, focus)', function() {
      expect(href('buttons', 'loading', 'focus'))
        .to.eql('#/buttons/loading/focus');
      expect(route(path('buttons', 'loading', 'focus'))).to.eql({
        namespace: 'buttons', card: 'loading', focus: true
      });
    });

    it('should handle URI components', function() {
      expect(href('Fancy buttons', 'Loading button')).to.eql(
        '#/Fancy%20buttons/Loading%20button'
      );
      expect(route(path('Fancy buttons', 'Loading button'))).to.eql({
        namespace: 'Fancy buttons', card: 'Loading button'
      });
    });
  });
  describe("routing", function() {
    it('should route / to {}', function() {
      expect(route('/')).to.eql({});
    });
    it('should route /abc to { namespace: abc }', function() {
      expect(route('/abc')).to.eql({ namespace: 'abc' });
    });
    it('should route /abc/123 to { namespace: abc, card: 123 }', function() {
      expect(route('/abc/123')).to.eql({ namespace: 'abc', card: '123' });
    });
    it('should route /abc/123/focus to ' +
       '{ namespace: abc, card: 123, focus: true }', function() {
      expect(route('/abc/123/focus'))
        .to.eql({ namespace: 'abc', card: '123', focus: true });
    });
    it('should route /not/a/thing to null', function() {
      expect(route('/not/a/thing')).to.eql(null);
    });
  });
});
