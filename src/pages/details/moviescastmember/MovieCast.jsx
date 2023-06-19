import React from 'react'
import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png"
import Wrappercomponent from "../../../components/wrapcomponent/Wrappercomponent"
import Img from '../../../components/lazyloadimage/Img';

import "./moviecast.scss"


const MovieCast = ({ data, loading }) => {

    const { url } = useSelector((state) => state.home)

    // console.log("cast url", url)
    // console.log("cast data", data)
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    // let imgUrl = cst.profile_path ? url.profilepic + cst.profile_path : avatar;

    return (
        <div className="castSection">
            <Wrappercomponent>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profilepic + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) :(
                        <div className="castSkeleton">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>

                    )}


            </Wrappercomponent>

        </div>
    )
}

export default MovieCast
