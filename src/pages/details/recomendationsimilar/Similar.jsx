import React from 'react'
import Slider from "../../../components/slider/Slider"
import useFetchdata from '../../../customhook/useFetchdata'

const Similar = ({ media_type, id }) => {
    // console.log("similar component id", id)
    // console.log("similar component mediatype", media_type)

    const { data, loading, error } = useFetchdata(`/${media_type}/${id}/similar`)
    console.log("similar component data mediatype", media_type)

    const title = media_type === "movie" ? "Similar Movies" : "Similar Tv Shows"

    return (
        <div>
            <Slider
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={media_type}
            />
        </div>
    )
}

export default Similar
