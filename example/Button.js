import React from 'react';

var Button = React.createClass({
  render() {
    const {
      children,
      kind = 'default'
    } = this.props;

    const cls = `btn btn-${kind}`;

    return (
      <button className={cls} role="button">
        {children}
      </button>
    );
  }
});

export default Button;
