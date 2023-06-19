import React from 'react'
import useFetchdata from '../../../customhook/useFetchdata'
import Slider from '../../../components/slider/Slider'

const Recomendation = ({ media_type, id }) => {

    const { data, loading, error } = useFetchdata(`/${media_type}/${id}/recommendations`)
    console.log("recomndation component data mediatype", media_type)

    const title = media_type === "movie" ? "Recommend Movies" : "Recommend TvShows"
    return (

        <Slider
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={media_type}
        />
    )
}

export default Recomendation
