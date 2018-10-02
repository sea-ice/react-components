import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './assets/css/index.css'
import TreeShape from '@components/web/TreeShape'

export class TreeShapeUsage extends React.Component {
  render () {
    let treeNodes = [{
      label: 'hello',
      children: [{
        label: 'world'
      }, {
        label: 'front',
        children: [{
          label: 'end'
        }]
      }]
    }]
    return <div styleName="tree-shape-wrapper">
      <TreeShape nodes={treeNodes} />
    </div>
  }
}

export default CSSModules(TreeShapeUsage, styles)
