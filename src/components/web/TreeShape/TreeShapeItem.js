import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import styles from './tree-shape.css'

class TreeShapeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick() {
    let {closed} = this.state
    this.setState({
      closed: !closed
    })
  }

  render() {
    let {label, epoch, bgcolors, children} = this.props,
        {closed} = this.state,
        hasChildren = children && children.length
    let subNodes = hasChildren ? <ul>{children}</ul> : null
    let icon = subNodes ? <i styleName={closed ? 'arrow-up' : 'arrow-down'}></i> : null
    
    return (
      <li 
        styleName={`${closed ? 'closed-item' : 'tree-shape-item'}`} 
        style={{backgroundColor: bgcolors[epoch]}}
      >
        <div styleName="label-wrapper" onClick={this.handleItemClick}>
          <label styleName="item-label" style={{marginLeft: epoch * 20}}>{label}</label>
          {icon}
        </div>
        {subNodes}
      </li>
    );
  }
}

export default CSSModules(TreeShapeItem, styles);
