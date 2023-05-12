import { useEffect, useState } from 'react'
import { API_URL } from '../constants/constants';

function useGetDefaultImgs() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, settError] = useState(null)
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setData((prev) => [...prev, ...data.photos.photo]);
            }).catch(err => {
                settError(err)
            })
    }, [page]);

    return { data, loading, error, setPage }
}

export default useGetDefaultImgs