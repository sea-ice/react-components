import React from 'react'
import CSSModules from 'react-css-modules'

import ItemsPerPage from './ItemsPerPage'
import PaginatorButtons from './PaginatorButtons'
import PaginatorContext from './paginator-context'
import styles from './paginator.css'

class Paginator extends React.Component {
  constructor (props) {
    super(props)
    let {
      total = 0,
      defaultItemsPerPage,
      optionalItemsPerPage = [10, 20, 50],
      maxPageButtons = 5,
      intitalPage = 1,
      pageUpdate = () => {}
    } = props
    if (total === 0) throw new Error('Illegal prop `total` on component `Paginator`!')
    if (!defaultItemsPerPage) defaultItemsPerPage = optionalItemsPerPage[0]
    let totalPages = Math.ceil(total / defaultItemsPerPage)
    this.state = {
      total,
      itemsPerPage: defaultItemsPerPage,
      defaultItemsPerPage,
      totalPages,
      maxPageButtons,
      optionalItemsPerPage,
      currentPage: intitalPage,
      notifyItemsPerPageChange: this.notifyItemsPerPageChange.bind(this)
    }
    this.turnToPage = this.turnToPage.bind(this)
  }
  notifyItemsPerPageChange (e) {
    let itemsPerPage = parseInt(e.target.value)
    let {total, currentPage} = this.state
    let totalPages = Math.ceil(total / itemsPerPage)
    currentPage = itemsPerPage > this.state.itemsPerPage ? Math.min(
      totalPages, currentPage
    ) : currentPage
    this.props.pageUpdate({
      itemsPerPage,
      currentPage
    })
    this.setState({
      totalPages,
      itemsPerPage,
      currentPage
    })
  }
  turnToPage (page) {
    let {itemsPerPage} = this.state
    this.props.pageUpdate({
      itemsPerPage,
      currentPage: page
    })
    this.setState({
      currentPage: page
    })
  }
  componentDidMount () {
    let {
      currentPage, 
      itemsPerPage
    } = this.state
    // 初始化页面
    this.props.pageUpdate({
      currentPage, 
      itemsPerPage
    })
  }
  render () {
    return <PaginatorContext.Provider value={this.state}>
      <div styleName="paginator">
        <ItemsPerPage></ItemsPerPage>
        <PaginatorButtons 
          {...this.state}
          turnToPage={this.turnToPage}
        ></PaginatorButtons>
      </div>
    </PaginatorContext.Provider>
  }
}

export default CSSModules(Paginator, styles)
