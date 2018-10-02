import React from 'react'
import CSSModules from 'react-css-modules'

import PaginatorContext from './paginator-context'
import styles from './paginator.css'

export default class ItemsPerPage extends React.Component {
  render () {
    let itemsPerPage = ({
      total, 
      optionalItemsPerPage, 
      defaultItemsPerPage,
      notifyItemsPerPageChange
    }) => {
      let options = optionalItemsPerPage.map(val => <option value={val} key={val}>{val}</option>)
      return <div>
        共 <span>{total}</span> 条记录
        每页显示
        <select 
          name="countPerPage" 
          styleName="count-per-page" 
          defaultValue={defaultItemsPerPage}
          onChange={notifyItemsPerPageChange}
        >
          {options}
        </select>
        条
      </div>
    }
    itemsPerPage = CSSModules(itemsPerPage, styles)
    return <PaginatorContext>
      {itemsPerPage}
    </PaginatorContext>
  }
}
