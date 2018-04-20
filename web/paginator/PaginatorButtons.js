import React from 'react'
import CSSModules from 'react-css-modules'

import PaginatorContext from './paginator-context'
import styles from './paginator.css'

export default class PaginatorButtons extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageButtons: this.updatePageRange(props)
    }
    this.turnToPage = this.turnToPage.bind(this)
  }
  componentWillUpdate (newProps) {
    console.log(this.props.totalPages)
    console.log(newProps.totalPages)
    // 此钩子方法中接收到的newProps为新的props，this.props则仍保存着原来的props
    if (this.props.totalPages > newProps.totalPages) {
      this.setState({
        pageButtons: this.updatePageRange(newProps)
      })
    }
    return true
  }
  componentDidUpdate (oldProps, oldState) {
    // 此钩子方法则正好和componentWillUpdate钩子相反，接收的oldProps参数为更新前的props，this.props则为更新后的props
  }
  updatePageRange ({totalPages, currentPage, maxPageButtons}) {
    let pageRange, pageButtons = []
    if (maxPageButtons > totalPages) {
      pageRange = [1, totalPages]
    } else if (currentPage >= Math.ceil(maxPageButtons / 2)
        && currentPage <= totalPages - Math.floor(maxPageButtons / 2)) {
      pageRange = [currentPage - Math.floor(
        maxPageButtons / 2 - 0.5
      ), currentPage + Math.floor(
        maxPageButtons / 2
      )]
    } else if (currentPage < Math.ceil(maxPageButtons / 2)) {
      pageRange = [1, maxPageButtons]
    } else {
      pageRange = [totalPages - maxPageButtons + 1, totalPages]
    }
    for (let start = pageRange[0], end = pageRange[1]; start <= end; start++) {
      pageButtons.push(start)
    }
    return pageButtons
  }
  turnToPage (e) {
    let page, {currentPage} = this.props
    console.log(e.target.dataset.clickType)
    switch(e.target.dataset.clickType) {
      case "prev-page":
        page = currentPage - 1
        break
      case "next-page":
        page = currentPage + 1
        break
      case "page-button":
        page = parseInt(e.target.innerText)
        break
      case "confirm-button":
        page = parseInt(this.pageInput.value)
        break
      default:
        break
    }
    if (page) {
      if (
        page === currentPage
        || page > this.props.totalPages
        || page < 1
      ) return
      let pageButtons = this.updatePageRange({
        ...this.props, 
        currentPage: page
      })
      this.props.turnToPage(page)
      this.setState({
        pageButtons
      })
    }
  }
  render () {
    // styleName中必须只能为一个类，不能同时指定多个类
    // styleName指定的类必须在对应的样式文件中定义
    let paginatorButtons = ({
      totalPages, 
      currentPage, 
      togglePageContinuously
    }) => {
      let pageButtons = this.state.pageButtons.map(page => <a 
        href="javascript:void(0);" 
        onClick={this.turnToPage}
        data-click-type="page-button"
        styleName={
          currentPage === page ? 
          "page-button__focus" 
          : "page-button"
        }
      >{page}</a>)
      return <p>
        <a 
          href="javascript:void(0);" 
          data-click-type="prev-page"
          onClick={this.turnToPage}
          styleName={
            currentPage === 1 ? 
            'paginator-button__disabled' 
            : 'prev-page'
          }
        >上一页</a>
        {pageButtons}
        <a 
          href="javascript:void(0);" 
          data-click-type="next-page"
          onClick={this.turnToPage}
          styleName={
            (currentPage === totalPages) ?
            'paginator-button__disabled' 
            : "next-page"
          }
        >下一页</a>
        共 <span>{totalPages}</span> 页
        到
        <input type="text" styleName="page-input" ref={ele => this.pageInput = ele} />
        页
        <a 
          href="javascript:void(0);" 
          styleName="confirm-btn"
          data-click-type="confirm-button"
          onClick={this.turnToPage}
        >确定</a>
      </p>
    }
    paginatorButtons = CSSModules(paginatorButtons, styles)
    return <PaginatorContext.Consumer>
      {paginatorButtons}
    </PaginatorContext.Consumer>
  }
}
