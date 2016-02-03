var React = require('react');

var $ = React.createElement;

var Data = require('./Data');

// var styleGuide = require('../style-guide');
var style = {
  form: {
    margin: '20px 0'
  }
};

var RegExpBody = React.createClass({
  displayName: 'RegExpBody',
  propTypes: {
    children: React.PropTypes.instanceOf(RegExp).isRequired,
  },
  getInitialState: function() {
    return { input: '', match: false };
  },
  componentDidUpdate: function(oldProps) {
    if (this.props.children != oldProps.children) {
      this.updateMatch(this.state.input);
    }
  },
  updateMatch: function(val) {
    var match = false;
    if (val) {
      match = this.props.children.exec(val);
    }
    this.setState({ input: val, match: match });
  },
  updateInput: function(e) {
    var val = e.target.value;
    this.updateMatch(val);
  },
  render: function() {
    var regex = this.props.children;
    return $('div', {},
      $(Data, null, regex.toString()),
      $('form', { style: style.form },
        $('input', {
          type: 'text',
          value: this.state.input,
          onChange: this.updateInput
        }),
        this.state.match === null &&
          $('p', {}, 'No match'),
        this.state.match &&
          $('ol', { start: '0' },
            this.state.match.map(function(group, i) {
              return $('li', { key: i }, group);
            })
          )
      )
    );
  }
});

module.exports = RegExpBody;
