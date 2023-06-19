import React from 'react'
import { useSelector } from "react-redux"
import noposter from "../../assets/no-poster.png"
import { useNavigate } from 'react-router-dom'
import dayjs from "dayjs";



const Cardbootstrap = ({ data, fromSearch, component, media_type }) => {
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)


    const imgurl = data?.poster_path ? url.posterpic + data.poster_path : noposter


    return (

        <div className="card m-2"
            onClick={() => navigate(`/${data.media_type || media_type}/${data.id}`)}
            style={{
                backgroundColor: "transparent", width: "17rem", cursor: "pointer", borderRadius: '15px', border: "none", backgroundSize: "cover", margin: "4px 3px", boxShadow: "8px 8px 3px 0px rgb(49,53,140)"
            }} >
            <img className="card-img-top" src={imgurl} alt="Card image cap" style={{ objectFit: "cover", objectposition: "center" }} />
            <div className="card-body flex flex-col">
                {component && data?.vote_average && <div style={{ width: "50px", height: '50px', border: "4px solid white", padding: "10px 10px", margin: 'auto', borderRadius: '50px', alignItems: 'center' }} ><span style={{ color: 'white' }} >{data?.vote_average}</span></div>}


                <span className="title text-white">{data.title || data.name}</span> <br />
                <span className="date text-white">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    )
}

export default Cardbootstrap
