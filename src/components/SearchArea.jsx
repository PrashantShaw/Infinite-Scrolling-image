import React, { useRef } from 'react'

function SearchArea({ handleQueryChange }) {
  const inputRef = useRef(null)
  const handleSearchOnClick = () => {
    const value = inputRef.current.value
    let prevQueries = JSON.parse(localStorage.getItem('prevQueries'))
    console.log(prevQueries)
    if (!prevQueries) {
      const queries = JSON.stringify([value])
      localStorage.setItem('prevQueries', queries)
    }
    else {
      prevQueries = JSON.stringify([...prevQueries, value])
      localStorage.setItem('prevQueries', prevQueries)
    }
    handleQueryChange(value)
  }
  return (
    <div className='search-area'>
      <input type="text" placeholder='Search Images here' ref={inputRef} />
      <button className='search-btn' onClick={handleSearchOnClick}>Search</button>
    </div>
  )
}

export default SearchArea