import React, {
  Component
} from 'react';
import TreeShapeItem from './TreeShapeItem'

class TreeShape extends Component {
  constructor(props) {
    super(props);

    this.itemBgcolors = this.getNodeBgcolors()
  }

  recursiveGenerate(nodes, epoch) {
    if (nodes && nodes.length) {
      return nodes.map(node => <TreeShapeItem 
        label={node.label} epoch={epoch} bgcolors={this.itemBgcolors}
      >
        {this.recursiveGenerate(node.children, epoch + 1)}
      </TreeShapeItem>)
    } else {
      return null
    }
  }

  // get nodes levels
  getNodesMaxEpoches(nodes, max) {
    if (nodes && nodes.length) {
      max += 1
      return nodes.map(
        node => this.getNodesMaxEpoches(node.children, max)
      ).reduce((prev, cur) => Math.max(prev, cur), max)
    } else {
      return max
    }
  }

  getNodeBgcolors() {
    let {nodes} = this.props
    let maxEpoches = this.getNodesMaxEpoches(nodes, 0)
    let maxColorEnd = 0xee
    let minColorEnd = 0x99
    let colorLevels = maxColorEnd - minColorEnd + 1
    let colorGap = Math.floor(colorLevels / maxEpoches)
    let itemColors = []
    for (let i = 0; i < maxEpoches - 1; i++) {
      itemColors.push(this.numCovertToRGB(minColorEnd + i * colorGap))
    }
    itemColors.push(this.numCovertToRGB(maxColorEnd))
    return itemColors.map(rgb => `#${rgb}`)
  }

  numCovertToRGB(num) {
    return num.toString(16).repeat(3)
  }

  render() {
    let {nodes} = this.props
    return (
      <ul>{this.recursiveGenerate(nodes, 0)}</ul>
    );
  }
}

export default TreeShape;
