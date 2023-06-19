import React, { useState } from 'react'
import Wrappercomponent from '../../../components/wrapcomponent/Wrappercomponent'
import Img from '../../../components/lazyloadimage/Img'
import Videomodal from '../../../components/videomodalpopup/Videomodal'
import { PlayIcon } from "../Playbtn"

import "./videostyle.scss"

const Videosection = ({ data, loading }) => {

    const [show, setShow] = useState(false)
    const [videoidentity, setVideoIdentity] = useState(null)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className='videosSection'>
            <Wrappercomponent>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (<div className="videos">
                    {data?.results?.map((vid, ind) => (
                        <div key={vid.id} className="videoItem">
                            <div className="videoThumbnail">
                                <Img
                                    src={`https://img.youtube.com/vi/${vid.key}/mqdefault.jpg`}
                                />
                                <div onClick={() => {
                                    setShow(true);
                                    setVideoIdentity(vid.key);
                                }}><PlayIcon /> </div>
                            </div>

                            <div className="videoTitle">{vid.name}</div>
                        </div>
                    ))
                    }

                </div>) : (<div className="videoSkeleton">
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                </div>)}
            </Wrappercomponent>


            <Videomodal
                show={show}
                setShow={setShow}
                videoId={videoidentity}
                setVideoId={setVideoIdentity}
            />
        </div>
    )
}

export default Videosection
