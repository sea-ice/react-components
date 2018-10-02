import {createContext} from 'react'

const ctx = createContext({
  total: 0,
  itemsPerPage: 0,
  totalPages: 0,
  maxPageButtons: 5,
  currentPage: 1,
  notifyItemsPerPageChange: () => {}
})

export default ctx
