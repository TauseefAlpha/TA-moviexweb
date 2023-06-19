import React from 'react'

import { CircularProgressbar,buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';
import "./rating.scss"

const Ratingcom = ({ rating }) => {
    return (
        <div className='Rating'>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default Ratingcom
