import React from 'react'
import { useSelector } from "react-redux"

const Generas = ({ generaid }) => {

    const { geners } = useSelector((state) => state.home)
    // console.log("geners col", geners)

    return (
        <div className='genres'>
            {generaid?.map((gid, ind) => {
                if (!geners[gid]?.name) return;
                return (<div key={ind} className="genre" style={{ color: "red" }}>
                    {geners[gid]?.name}
                </div>)
            })}

        </div>
    )
}

export default Generas
