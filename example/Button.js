import React, {Component} from 'react';

export default class Button extends Component {
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
}
