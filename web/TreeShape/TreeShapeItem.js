import React, { Component, PropTypes } from 'react';

class TreeShapeItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      closed: true
    }
  }

  render() {
    let {label, children} = this.props
    if (children && children.length) {
      children = <ul>{children}</ul>
    } else {
      children = null
    }
    return (
      <li className="tree-shape-item">
        <label>{label}</label>
        {children}
      </li>
    );
  }
}

export default Component;
