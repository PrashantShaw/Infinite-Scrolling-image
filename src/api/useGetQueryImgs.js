import { useEffect, useState } from 'react'
import { SEARCH_API_URL } from '../constants/constants';

function useGetQueryImgs() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, settError] = useState(null)
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    
    const handleQueryChange = (newQuery)=>{
        setData([])
        setPage(1)
        setQuery(newQuery)
    }

    useEffect(() => {
        if (!query) return
        setLoading(true);
        fetch(`${SEARCH_API_URL}&text=${query}&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setData((prev) => [...prev, ...data.photos.photo]);
            }).catch(err => {
                settError(err)
            })
    }, [page, query]);

    return { data, loading, error, setPage, query, handleQueryChange }
}

export default useGetQueryImgs