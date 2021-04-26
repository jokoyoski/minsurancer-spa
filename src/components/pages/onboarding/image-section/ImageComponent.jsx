import React from 'react'
import './image.styles.scss';
import '../../../../'

export const ImageComponent = () => {
    return (
        <div className='picture-section'>
            <div style={{ backgroundImage: 'url(' + require('../../../../assets/images/autorepair.jpeg') + ')', height: '700px', width: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <p style={{ display: 'inline-block',fontWeight:'900',margin: '390px 0px 30px 80px', fontSize: '1.9rem' ,color:'white' }}>A Cloud Based Business Platform</p></div>
        </div>
    )
}


export default ImageComponent