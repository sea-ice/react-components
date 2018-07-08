import React from 'react'
import Prism from 'prismjs'
import CSSModules from 'react-css-modules'
import styles from './app.css'

import Paginator from '../web/paginator'
import MarkdownParser from '../web/MarkdownParser'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.pageUpdate = this.pageUpdate.bind(this)
    this.getCompileResult = this.getCompileResult.bind(this)

    this.state = {
      pageTitle: '',
      mdCompileResult: ''
    }
  }
  componentDidMount() {
    import('./assets/mdPreview/md-preview-default.css')
    console.log(Prism)
  }
  pageUpdate ({currentPage}) {
    this.setState({
      pageTitle: `Here is page ${currentPage}`
    })
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
    let {pageTitle, mdCompileResult} = this.state
    return <div>
      <fieldset>
        <legend>Paginator</legend>
        <main><h2>{pageTitle}</h2></main>
        <Paginator 
          total={242}
          pageUpdate={this.pageUpdate}
        ></Paginator>
      </fieldset>
      <fieldset>
        <legend>Markdown Parser</legend>
        <div styleName="md-priview">
          <div styleName="md-priview__parser">
            <MarkdownParser notifyCompileResult={this.getCompileResult} />
          </div>
          <div 
            styleName="md-preview__result"
            className="md-preview__result"
            dangerouslySetInnerHTML={{__html: mdCompileResult}}
            ref={ele => this.preview = ele}
          ></div>
        </div>
      </fieldset>
    </div>
  }
}

export default CSSModules(App, styles)
