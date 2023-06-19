import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Img = ({ src, classNme }) => {
    return (
        <div>
            <LazyLoadImage
                className={classNme || ''}
                src={src}
                alt=""
                height=""
                width=""
                effect="blur"
            />

        </div>
    )
}

export default Img
