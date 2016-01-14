import React, {Component} from 'react';

export default class Button extends Component {
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
}
