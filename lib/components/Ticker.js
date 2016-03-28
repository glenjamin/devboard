var React = require('react');

var $ = React.createElement;

var Ticker = React.createClass({
  displayName: 'Ticker',
  propTypes: {
    onTick: React.PropTypes.func.isRequired,
    interval: React.PropTypes.number.isRequired,
    autoplay: React.PropTypes.bool.isRequired,
  },
  getInitialState: function() {
    return { playing: !!this.props.autoplay };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    var props = this.props;
    var state = this.state;
    return (
      props.interval !== nextProps.interval
      ||
      props.onTick !== nextProps.onTick
      ||
      state.playing !== nextState.playing
    );
  },
  componentDidMount: function() {
    this.setupTick();
  },
  componentDidUpdate: function() {
    this.setupTick();
  },
  componentWillUnmount: function() {
    this.clearTick();
  },
  setupTick: function() {
    this.clearTick();
    if (!this.state.playing) return;
    this.props.onTick();
    this.timer = setInterval(this.props.onTick, this.props.interval);
  },
  clearTick: function() {
    clearInterval(this.timer);
  },
  toggle: function() {
    this.setState(function(s) { return { playing: !s.playing }; });
  },
  render: function() {
    return (
      $('div', {},
        $('button', { onClick: this.toggle },
          this.state.playing ? 'Stop Ticking' : 'Start Ticking'
        )
      )
    );
  }
});

module.exports = Ticker;
