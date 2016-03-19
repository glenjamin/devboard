/* eslint-env mocha */
var expect = require('chai').expect;

var devcardApi = require('../lib/devcard-api');

describe('devcard()', function() {
  var body = { card: 'body' };
  var added;
  beforeEach(function() {
    added = null;
  });
  var devcard = devcardApi(function(card) {
    added = card;
  });

  it('accepts devcard(doc)', function() {
    devcard("Some documentation...");
    expect(added).to.eql({
      name: null,
      doc: "Some documentation...",
      body: null,
      options: {}
    });
  });

  it('accepts devcard(body)', function() {
    devcard(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: {}
    });
  });

  it('accepts devcard(name, body)', function() {
    devcard('fred', body);
    expect(added).to.eql({
      name: 'fred',
      doc: null,
      body: body,
      options: {}
    });
  });

  it('accepts devcard(name, doc)', function() {
    devcard('fred', "Some docs...");
    expect(added).to.eql({
      name: 'fred',
      doc: "Some docs...",
      body: null,
      options: {}
    });
  });

  it('accepts devcard(name, body, options)', function() {
    devcard('fred', body, { an: 'option' });
    expect(added).to.eql({
      name: 'fred',
      doc: null,
      body: body,
      options: { an: 'option' }
    });
  });

  it('accepts devcard(name, doc, body)', function() {
    devcard('name', "Some documentation...", body);
    expect(added).to.eql({
      name: 'name',
      doc: "Some documentation...",
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts devcard(name, doc, body, options)', function() {
    devcard('name', "Some documentation...", body, { an: 'option' });
    expect(added).to.eql({
      name: 'name',
      doc: "Some documentation...",
      body: body,
      options: { an: 'option' }
    });
    expect(added.body).to.equal(body);
  });

  it('accepts devcard.anon(doc)', function() {
    devcard.anon("Some docs");
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: null,
      options: {}
    });
  });

  it('accepts devcard.anon(body)', function() {
    devcard.anon(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts devcard.anon(doc, body)', function() {
    devcard.anon("Some docs", body);
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts devcard.anon(body, options)', function() {
    devcard.anon(body, { options: 'are great' });
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: { options: 'are great' }
    });
    expect(added.body).to.equal(body);
  });

  it('accepts devcard.anon(doc, body, options)', function() {
    devcard.anon("Some docs", body, { some: 'option' });
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: body,
      options: { some: 'option' }
    });
    expect(added.body).to.equal(body);
  });

  it('sets devcard.off(body) to hidden', function() {
    devcard.off(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: { hidden: true }
    });
  });

  it('sets devcard.off(name, doc) to hidden', function() {
    devcard.off('fred', "Some docs...");
    expect(added).to.eql({
      name: 'fred',
      doc: "Some docs...",
      body: null,
      options: { hidden: true }
    });
  });

  it('sets devcard.off(name, doc, body) to hidden', function() {
    devcard.off('name', 'some docs', body);
    expect(added).to.eql({
      name: 'name',
      doc: 'some docs',
      body: body,
      options: { hidden: true }
    });
    expect(added.body).to.equal(body);
  });

  it('sets devcard.off(name, doc, body, options) to hidden', function() {
    devcard.off('name', 'some docs', body, { an: 'option' });
    expect(added).to.eql({
      name: 'name',
      doc: 'some docs',
      body: body,
      options: { an: 'option', hidden: true }
    });
    expect(added.body).to.equal(body);
  });

});
