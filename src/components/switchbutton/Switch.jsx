import React, { useState } from 'react'
import "./switch.scss"

const Switchbtn = ({ data, onChangehandler }) => {
    const [Tab, setTab] = useState(0);
    const [left, setLeft] = useState(0);


    const tabactive = (tab, indx) => {
        setLeft(indx * 100);
        console.log("left value", left)
        setTimeout(() => {
            setTab(indx);
        }, 300);
        onChangehandler(tab, indx)
    }
    return (
        <div className='switchingTabs'>
            <div className='Items'>
                {data.map((val, ind) => (
                    <span
                        key={ind}
                        className={`Item ${Tab === ind ? "active" : ""}`}
                        onClick={() => tabactive(val, ind)}
                    >{val} </span>
                ))}
                <span className="changeBg" style={{ left ,background:"orange"}} />
            </div>
        </div>
    )
}

export default Switchbtn
