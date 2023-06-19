import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchdata from '../../../customhook/useFetchdata'
import { useSelector } from "react-redux"
import Img from '../../../components/lazyloadimage/Img'
import dayjs from 'dayjs'

import noposterimage from "../../../assets/no-poster.png"
import Wrappercomponent from '../../../components/wrapcomponent/Wrappercomponent'
import Ratingcom from '../../../components/ratingbar/Ratingcom'
import Generas from '../../../components/generas/Generas'
import { PlayIcon } from "../Playbtn"
import Videomodal from '../../../components/videomodalpopup/Videomodal'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./detailban.scss"




const Detailbanner = ({ videodata, castmember }) => {
    const [show, setShow] = useState(false)
    const [videoidentity, setVideoIdentity] = useState(null)

    const { url } = useSelector((state) => (state.home));
    const { media_type, id } = useParams()
    const { data, loading, error } = useFetchdata(`/${media_type}/${id}`)


    const Producer = castmember?.filter((cst, ind) => (cst.job === "Director"))
    const writer = castmember?.filter((cst, ind) => (cst.job === "Story" || cst.job === "Screenplay"))
    console.log("genresdata.Producer", Producer)
    console.log("genresdata.writer", writer)
    const generaid = data?.genres.map((val) => (val.id))
    console.log("genresdata.genres id", generaid)

    return (
        <div className='detailsBanner'>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backedrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <div className='posterwrapper'>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (

                                            <LazyLoadImage
                                                height={"480px"}
                                                className="posterImg "
                                                // width={"80vw"}
                                                effect="blur"
                                                src={url.backedrop + data.backdrop_path}
                                            />
                                        ) : (
                                            <LazyLoadImage
                                                className="posterImg"
                                                // height={"500px"}
                                                // width={"80vw"}
                                                effect="blur"
                                                src={noposterimage}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Generas generaid={generaid.slice(0, 2)} />

                                        <div className="rows">
                                            <div className="col-sm-2">  <Ratingcom
                                                rating={data.vote_average.toFixed(1)}

                                            /></div>
                                            <div className="col-sm-3">
                                                <div
                                                    className="playbtn"
                                                    onClick={() => {
                                                        setShow(true);
                                                        setVideoIdentity(videodata.key);
                                                    }}
                                                >
                                                    <PlayIcon />
                                                    <span className='text'>
                                                        Trailer
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ========= */}

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>


                                        <div className="info">
                                            {data.status && (<div className="infoItem">
                                                <span className="text bold">
                                                    Status:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.status}
                                                </span>
                                            </div>)}

                                            {data.release_date && (<div className="infoItem">
                                                <span className="text bold">
                                                    Release_date:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.release_date}
                                                </span>
                                            </div>)}

                                            {data.runtime && (<div className="infoItem">
                                                <span className="text bold">
                                                    Runtime:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.runtime}minutes
                                                </span>
                                            </div>)}
                                        </div>

                                        {/* ===producer====== */}

                                        <div className="info">
                                            {Producer?.length > 0 && (<div className="infoItem">
                                                <span className="text bold">
                                                    Producer {" "}
                                                </span>
                                                <span className="text ">
                                                    {Producer?.map((prod, ind) => (
                                                        <span key={ind}>{prod.name} </span>
                                                    ))}
                                                </span>
                                            </div>)}
                                        </div>

                                        {/* ===writer====== */}
                                        <div className="info">
                                            {writer?.length > 0 && (<div className="infoItem">
                                                <span className="text bold">
                                                    writer {" "}
                                                </span>
                                                <span className="text ">
                                                    {writer?.map((writ, ind) => (
                                                        <span key={ind}>{writ.name}
                                                            {writer.length - 1 !== ind && ", "}</span>
                                                    ))}
                                                </span>
                                            </div>)}
                                        </div>


                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}


                                    </div>
                                </div>
                            </div>

                            <Videomodal
                                show={show}
                                setShow={setShow}
                                videoId={videoidentity}
                                setVideoId={setVideoIdentity}
                            />

                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <div className='contentWrapper'>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default Detailbanner
