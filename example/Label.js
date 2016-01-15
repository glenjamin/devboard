import React from 'react';

var Label = React.createClass({
  render() {
    const {
      children,
      kind = 'default'
    } = this.props;

    const cls = `label label-${kind}`;

    return (
      <span className={cls}>
        {children}
      </span>
    );
  }
});

export default Label;
