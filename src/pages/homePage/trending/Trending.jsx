import React, { useState } from 'react'
import Wrappercomponent from '../../../components/wrapcomponent/Wrappercomponent'
import Switchbtn from '../../../components/switchbutton/Switch'
import useFetchdata from '../../../customhook/useFetchdata'
import Slider from '../../../components/slider/Slider'


const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")
    const { data, loading, error } = useFetchdata(`/trending/all/${endpoint}`)
    // console.log("your data", data)

    const onChangehandler = (value) => {
        setEndpoint(value)
    }
    return (
        <div className='position-relative mb-6'>
            <div className=" container d-flex justify-content-between align-items-center mb-1">
                <span className='fs-4 text-white fw-normal'>Trending</span>
                <Switchbtn data={["day", "week"]} onChangehandler={onChangehandler} />
            </div>
            <Slider data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Trending
