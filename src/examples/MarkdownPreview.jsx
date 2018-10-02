import React from 'react'
import Prism from 'prismjs'
import CSSModules from 'react-css-modules'
import styles from './assets/css/index.css'

import MarkdownParser from '@components/web/MarkdownParser'

export class MarkdownPreview extends React.Component {
  constructor (props) {
    super(props)
    this.getCompileResult = this.getCompileResult.bind(this)

    this.state = {
      mdCompileResult: ''
    }
  }
  componentDidMount() {
    import('./assets/css/md-preview-default.css')
  }
  getCompileResult (result) {
    this.setState({
      mdCompileResult: result
    }, () => {
      // console.log(this.preview.innerHTML)
      Prism.highlightAll()
    })
  }
  render () {
    let {mdCompileResult} = this.state
    
    return <div styleName="md-preview">
      <div styleName="mdp__parser">
        <h3 styleName="mdp__title">Type markdown here</h3>
        <MarkdownParser notifyCompileResult={this.getCompileResult} />
      </div>
      <div styleName="mdp__result-wrapper">
        <h3 styleName="mdp__title">Parse result</h3>
        <div 
          className="mdp__result"
          dangerouslySetInnerHTML={{__html: mdCompileResult}}
          ref={ele => this.preview = ele}
        ></div>
      </div>
    </div>
  }
}

export default CSSModules(MarkdownPreview, styles)
