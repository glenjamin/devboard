import React from 'react';

var Button = React.createClass({
  getInitialState() {
    return {};
  },
  render() {
    const {
      children,
      kind = 'default'
    } = this.props;

    const cls = `btn btn-${kind}`;

    return (
      <button className={cls} role="button"
        onClick={() => this.setState(s => ({ toggle: !s.toggle }))}
        style={{ fontSize: this.state.toggle ? '20px' : '10px'}}
      >
        {children}
      </button>
    );
  }
});

export default Button;
