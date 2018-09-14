import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import styles from './tree-shape.css'

class TreeShapeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true
    }
  }

  render() {
    let {label, children} = this.props,
        {closed} = this.state, icon
    if (children && children.length) {
      children = <ul>{children}</ul>
    } else {
      children = null
    }
    if (children) {
      icon = <i styleName={`icon arrow-icon${closed ? ' arrow-up' : ''}`}></i>
    } else {
      icon = null
    }
    return (
      <li styleName="tree-shape-item">
        <div styleName="label-wrapper">
          <label>{label}</label>
          {icon}
        </div>
        {children}
      </li>
    );
  }
}

export default CSSModules(TreeShapeItem, styles);
