import React, {
  Component
} from 'react';
import TreeShapeItem from './TreeShapeItem'

class TreeShape extends Component {
  constructor(props) {
    super(props);
  }

  recursiveGenerate(nodes, epoch) {
    if (nodes && nodes.length) {
      return nodes.map(node => <TreeShapeItem label={node.label} epoch={epoch}>
        {this.recursiveGenerate(node.children, epoch + 1)}
      </TreeShapeItem>)
    } else {
      return null
    }
  }

  render() {
    // [{
    //   label: '',
    //   children: [{}]
    // }]
    let {nodes} = this.props
    return (
      <ul>{this.recursiveGenerate(nodes, 0)}</ul>
    );
  }
}

export default TreeShape;
