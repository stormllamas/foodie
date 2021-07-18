import React from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types'

const Pagination = ({ data, setPage, pageSize, currentPage, updateQuery }) => {
  const history = useHistory()

  // Number of total pages
  const pageTotal = Math.ceil(data.count/pageSize)

  // Array of pages
  const pageRange = [...Array(pageTotal).keys()]


  return (
    <ul className="pagination">
      <li className={`${parseInt(currentPage) === 1 ? 'active' : ''} ${parseInt(currentPage) > 1 || parseInt(currentPage) === 1 && 'waves-effect'}`}>
        <Link to={'?page=1'} onClick={() => {setPage(1), history.push({ search: `?page=1`})}} >First</Link>
      </li>

      <li className={`waves-effect ${data.previous == null ? 'disabled' : ''}`}>
        {data.previous == null ? (
          <a>&laquo;</a>
        ) : (
          <Link to={`?page=${parseInt(currentPage)-1}`} onClick={() => {setPage(parseInt(currentPage)-1), history.push({ search: `?page=${parseInt(currentPage)-1}`})}} >&laquo;</Link>
        )}
      </li>

      {pageRange.map(page => {
        const pageNum = page+1
        if (pageNum > (parseInt(currentPage)-6) === true && pageNum < (parseInt(currentPage)+6) === true) {
          return (
            <li key={`page-${pageNum}`} className={`waves-effect ${pageNum === parseInt(currentPage) && 'active'}`}>
              {/* <Link to={`?page=${pageNum}`} onClick={() => {setPage(pageNum), history.push({ search: `?page=${pageNum}`})}} >{pageNum}</Link> */}
              <Link to={`?page=${pageNum}`} onClick={() => setPage(pageNum)} >{pageNum}</Link>
            </li>
          )
        }
      })}

      <li className={`waves-effect ${data.next == null ? 'disabled' : ''}`}>
        {data.next == null ? (
          <a>&raquo;</a>
        ) : (
          <Link to={`?page=${parseInt(currentPage)+1}`} onClick={() => setPage(parseInt(currentPage)+1)} >&raquo;</Link>
        )}
      </li>

      <li className={`${parseInt(currentPage) === pageTotal && 'active'} ${parseInt(currentPage) > pageTotal || parseInt(currentPage) === pageTotal && 'waves-effect'}`}>
        {parseInt(currentPage) == pageTotal ? (
          <a>Last</a>
        ) : (
          <Link to={`?page=${pageTotal}`} onClick={() => setPage(pageTotal)} >Last</Link>
        )}
      </li>
    </ul>
  )
}

Pagination.propTypes = {
  data: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.any.isRequired,
}

export default Pagination;