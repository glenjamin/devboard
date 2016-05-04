import React from 'react';

var Accordion = React.createClass({
  getInitialState() {
    var n = React.Children.count(this.props.children);
    var i = Math.floor(Math.random() * n);
    console.log(`Selected ${i} as Accordion initial`);
    return { i };
  },
  toggle(i) {
    this.setState({ i });
  },
  render() {
    const { children } = this.props;

    return (
      <div className="panel-group">
        {React.Children.map(children, (child, i) =>
          React.cloneElement(child, {
            collapse: i != this.state.i,
            onHeading: () => this.toggle(i)
          })
        )}
      </div>
    );
  }
});

export default Accordion;
