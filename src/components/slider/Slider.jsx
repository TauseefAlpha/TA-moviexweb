import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import noposter from "../../assets/no-poster.png"
import Img from "../lazyloadimage/Img"
import Ratingcom from '../ratingbar/Ratingcom';
import Generas from '../generas/Generas';
import dayjs from "dayjs";

import "./slidercs.scss"


const Slider = ({ data, loading, endpoint, title }) => {
    const navigate = useNavigate()

    const { url } = useSelector((state) => state.home)
    const refslidercontainer = useRef()

    // console.log("refslidercontainer.current", refslidercontainer.current)

    const navigathandler = (direction) => {
        const container = refslidercontainer.current;
        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
        console.log("scrollamount", scrollAmount)
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const skeletonfun = () => {
        return (<div className="skeletonItem">
            <div className="posterBlock skeleton">
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        </div>)
    }
    return (
        <div className="carousel" >
            <div className="wrapcomponent">

                {title ? <div className="Title">{title}</div> : <div className="Title">{endpoint}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigathandler("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigathandler("right")}
                />
                {!loading ? (<div className='carouselItems' ref={refslidercontainer}>
                    {data?.map((itm, ind) => {
                        const posterUrl = itm.poster_path ? url.posterpic + itm.poster_path : noposter;

                        return (
                            <div className="carouselItem" key={ind}>
                                <div className="posterBlock" onClick={() => { navigate(`${itm.media_type || endpoint}/${itm.id}`) }}>
                                    <Img src={posterUrl} />
                                    <Ratingcom rating={
                                        itm.vote_average.toFixed(1)
                                    } />
                                    <Generas generaid={itm.genre_ids.slice(0, 2)} />
                                </div>

                                <div className="textBlock">
                                    <span className="title">
                                        {itm.title || itm.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(itm.release_date || itm.first_air_date).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>) : (
                    <div className="loadingSkeleton">
                        {skeletonfun()}
                        {skeletonfun()}
                        {skeletonfun()}
                        {skeletonfun()}
                        {skeletonfun()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Slider
