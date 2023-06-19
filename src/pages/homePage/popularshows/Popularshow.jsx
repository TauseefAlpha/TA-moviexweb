import React, { useState } from 'react'
import Wrappercomponent from '../../../components/wrapcomponent/Wrappercomponent'
import Switchbtn from '../../../components/switchbutton/Switch'
import useFetchdata from '../../../customhook/useFetchdata'
import Slider from '../../../components/slider/Slider'


const Popularshow = () => {
    const [endpoint, setEndpoint] = useState("popular")
    const { data, loading, error } = useFetchdata(`/movie/${endpoint}`)


    const onChangehandler = (value) => {
        setEndpoint(value)
    }
    return (
        <div className='position-relative mb-6'>
            <div className=" container d-flex justify-content-between align-items-center mb-1">
                <span className='fs-4 text-white fw-normal'>Popular show</span>
                <Switchbtn data={["popular", "upcoming"]} onChangehandler={onChangehandler} />
            </div>
            <Slider data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Popularshow