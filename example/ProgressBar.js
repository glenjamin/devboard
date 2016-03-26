import React from 'react';

var ProgressBar = React.createClass({
  propTypes: {
    n: React.PropTypes.number.isRequired,
    label: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    animated: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      'success',
      'info',
      'warning',
      'danger'
    ])
  },
  render() {
    var {n, label, striped, animated, type} = this.props;
    return (
      <div className="progress">
        <div
          className={[
            "progress-bar",
            striped ? "progress-bar-striped" : "",
            type ? "progress-bar-" + type : "",
            animated ? "active" : ""
          ].join(" ")}
          role="progressbar"
          aria-valuemin="0" aria-valuemax="100"
          aria-valuenow={n}
          style={{ width: n + "%", minWidth: "2em" }}
        >
          {label ? n + "%" :
            <span className="sr-only">{n + "%"}</span>}
        </div>
      </div>
    );
  }
});

export default ProgressBar;
