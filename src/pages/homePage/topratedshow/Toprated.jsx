import React, { useState } from 'react'
import Wrappercomponent from '../../../components/wrapcomponent/Wrappercomponent'
import Switchbtn from '../../../components/switchbutton/Switch'
import useFetchdata from '../../../customhook/useFetchdata'
import Slider from '../../../components/slider/Slider'


const Toprated = () => {
    const [endpoint, setEndpoint] = useState("tv")
    const { data, loading, error } = useFetchdata(`/${endpoint}/top_rated`)


    const onChangehandler = (value) => {
        setEndpoint(value)
    }
    return (
        <div className='position-relative mb-6'>
            <div className=" container d-flex justify-content-between align-items-center mb-1">
                <span className='fs-4 text-white fw-normal'>TopRated</span>
                <Switchbtn data={["tv", "movie"]} onChangehandler={onChangehandler} />
            </div>
            <Slider data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Toprated

