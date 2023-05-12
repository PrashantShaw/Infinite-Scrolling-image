import React, { useEffect, useRef, useState } from 'react'
import { OLD_QUERIES_KEY } from '../constants/constants'

function SearchArea({ handleQueryChange }) {
  const [oldQueries, setOldQueries] = useState([])
  const [showOldQueries, setShowOldQueries] = useState(false)
  const inputRef = useRef(null)

  // on click handler
  const handleSearchOnClick = () => {
    setShowOldQueries(false)
    const value = inputRef.current.value
    handleQueryChange(value)
    // set to local storage as well
    const prevQueries = JSON.parse(localStorage.getItem(OLD_QUERIES_KEY))
    if (!prevQueries) {
      localStorage.setItem(OLD_QUERIES_KEY, JSON.stringify([value]))
      setOldQueries([value])
    }
    else {
      const newList = prevQueries.includes(value) ? prevQueries : [...prevQueries, value]
      localStorage.setItem(OLD_QUERIES_KEY, JSON.stringify(newList))
      setOldQueries(newList)
    }
  }

  // clear old queries handler
  const handleClearOldQueries = () => {
    localStorage.clear()
    setOldQueries([])
    setShowOldQueries(false)
  }

  // old query select handler
  const handleOldQuerySelect = (selectedQuery) => {
    inputRef.current.value = selectedQuery
    setShowOldQueries(false)
  }
  useEffect(() => {
    let prevQueries = JSON.parse(localStorage.getItem(OLD_QUERIES_KEY))
    prevQueries && setOldQueries(prevQueries)
  }, [])

  return (
    <div className='search-area'>
      <input
        type="text"
        placeholder='Search Images here'
        ref={inputRef}
        onClick={() => { setShowOldQueries(prev => !prev) }}
      />
      <button className='search-btn' onClick={handleSearchOnClick}>Search</button>
      {(showOldQueries && oldQueries.length > 0) &&
        <div className="prev-queries">
          {oldQueries.map((query, idx) => <p className='query' key={idx} onClick={() => handleOldQuerySelect(query)}>{query}</p>)}
          <div><button onClick={handleClearOldQueries}>Clear</button></div>
        </div>}
    </div>
  )
}

export default SearchArea