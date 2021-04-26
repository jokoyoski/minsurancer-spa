import React from 'react';
import Logo from '../../../../assets/images/miniinsurance.png'

export const ApprecationComponent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '300px',justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '90%' }}>
                <img alt={"logo"} height={'50px'} width={'80px'} src={Logo} />
            </div>
            <p>Thank you for Registering with us, Please Proceed to Login</p><a href="/user/login">Login</a>
        </div>
    )
}


export default ApprecationComponent;