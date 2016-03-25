/* eslint-env mocha */
var expect = require('chai').expect;

var createDefinecard = require('../lib/definecard');

describe('definecard()', function() {
  var body = { card: 'body' };
  var added;
  beforeEach(function() {
    added = null;
  });
  var definecard = createDefinecard(function(card) {
    added = card;
  });

  it('accepts definecard(doc)', function() {
    definecard("Some documentation...");
    expect(added).to.eql({
      name: null,
      doc: "Some documentation...",
      body: null,
      options: {}
    });
  });

  it('accepts definecard(body)', function() {
    definecard(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: {}
    });
  });

  it('accepts definecard(name, body)', function() {
    definecard('fred', body);
    expect(added).to.eql({
      name: 'fred',
      doc: null,
      body: body,
      options: {}
    });
  });

  it('accepts definecard(name, doc)', function() {
    definecard('fred', "Some docs...");
    expect(added).to.eql({
      name: 'fred',
      doc: "Some docs...",
      body: null,
      options: {}
    });
  });

  it('accepts definecard(name, body, options)', function() {
    definecard('fred', body, { an: 'option' });
    expect(added).to.eql({
      name: 'fred',
      doc: null,
      body: body,
      options: { an: 'option' }
    });
  });

  it('accepts definecard(name, doc, body)', function() {
    definecard('name', "Some documentation...", body);
    expect(added).to.eql({
      name: 'name',
      doc: "Some documentation...",
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts definecard(name, doc, body, options)', function() {
    definecard('name', "Some documentation...", body, { an: 'option' });
    expect(added).to.eql({
      name: 'name',
      doc: "Some documentation...",
      body: body,
      options: { an: 'option' }
    });
    expect(added.body).to.equal(body);
  });

  it('accepts definecard.anon(doc)', function() {
    definecard.anon("Some docs");
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: null,
      options: {}
    });
  });

  it('accepts definecard.anon(body)', function() {
    definecard.anon(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts definecard.anon(doc, body)', function() {
    definecard.anon("Some docs", body);
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: body,
      options: {}
    });
    expect(added.body).to.equal(body);
  });

  it('accepts definecard.anon(body, options)', function() {
    definecard.anon(body, { options: 'are great' });
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: { options: 'are great' }
    });
    expect(added.body).to.equal(body);
  });

  it('accepts definecard.anon(doc, body, options)', function() {
    definecard.anon("Some docs", body, { some: 'option' });
    expect(added).to.eql({
      name: null,
      doc: "Some docs",
      body: body,
      options: { some: 'option' }
    });
    expect(added.body).to.equal(body);
  });

  it('sets definecard.off(body) to hidden', function() {
    definecard.off(body);
    expect(added).to.eql({
      name: null,
      doc: null,
      body: body,
      options: { hidden: true }
    });
  });

  it('sets definecard.off(name, doc) to hidden', function() {
    definecard.off('fred', "Some docs...");
    expect(added).to.eql({
      name: 'fred',
      doc: "Some docs...",
      body: null,
      options: { hidden: true }
    });
  });

  it('sets definecard.off(name, doc, body) to hidden', function() {
    definecard.off('name', 'some docs', body);
    expect(added).to.eql({
      name: 'name',
      doc: 'some docs',
      body: body,
      options: { hidden: true }
    });
    expect(added.body).to.equal(body);
  });

  it('sets definecard.off(name, doc, body, options) to hidden', function() {
    definecard.off('name', 'some docs', body, { an: 'option' });
    expect(added).to.eql({
      name: 'name',
      doc: 'some docs',
      body: body,
      options: { an: 'option', hidden: true }
    });
    expect(added.body).to.equal(body);
  });

});
