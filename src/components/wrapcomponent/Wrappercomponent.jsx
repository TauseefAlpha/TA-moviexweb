import React from 'react'
import "./wrappercomponent.scss"

const Wrappercomponent = ({children}) => {
    return (
        <div className='wrap'>
             {children}
        </div>
    )
}

export default Wrappercomponent
