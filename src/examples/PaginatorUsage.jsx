import React from 'react'

import Paginator from '@components/web/Paginator'

export default class PaginatorUsage extends React.Component {
  constructor (props) {
    super(props)

    this.pageUpdate = this.pageUpdate.bind(this)
    this.state = {
      pageTitle: ''
    }
  }
  pageUpdate ({currentPage}) {
    this.setState({
      pageTitle: `Here is page ${currentPage}`
    })
  }
  render () {
    let {pageTitle} = this.state
    return <div>
      <main><h2>{pageTitle}</h2></main>
      <Paginator 
        total={242}
        pageUpdate={this.pageUpdate}
      ></Paginator>
    </div>
  }
}