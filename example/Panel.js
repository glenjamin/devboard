import React from 'react';

var Panel = React.createClass({
  onHeading(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onHeading();
  },
  render() {
    const {
      children,
      title,
      collapse,
      kind = 'default',
    } = this.props;

    const expand = collapse ? '' : 'in';

    return (
      <div className={`panel panel-${kind}`}>
        <div className="panel-heading">
          <h4 className="panel-title">
            <a href="#" onClick={this.onHeading}>
              {title}
            </a>
          </h4>
        </div>
        <div className={`panel-collapse collapse ${expand}`}>
          <div className="panel-body">
            {children}
          </div>
        </div>
      </div>
    );
  }
});

export default Panel;
