import React from 'react'
import Paginator from '../web/paginator'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.pageUpdate = this.pageUpdate.bind(this)
  }
  pageUpdate ({currentPage}) {
    this.mainTitle.innerText = `Here is page ${currentPage}`
  }
  render () {
    return <div className="app-wrapper">
      <main><h2 ref={ele => this.mainTitle = ele}></h2></main>
      <Paginator 
        total={242}
        pageUpdate={this.pageUpdate}
      ></Paginator>
    </div>
  }
}
