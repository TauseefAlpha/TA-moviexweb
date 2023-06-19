import React, { useEffect, useState } from 'react'
import { fetchdata } from "../utilis/data"

const useFetchdata = (url) => {
    const [loading, setloading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setloading("loading....")
        setError(null)
        setData(null)

        fetchdata(url).then((res) => {
            setloading(false)
            setData(res)
        }).catch((error) => {
            setloading(false)
            setError("something went wrong")
        })

    }, [url])

    return { data, loading, error }
}

export default useFetchdata
