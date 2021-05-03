import React from 'react';
import './stat.styles.scss';
import { connect } from "react-redux";
export const StatComponent = ({firstName}) => {
    return (
        <div>
            <div className='name-section'>
                <p style={{ marginTop: '100px', marginLeft: '10px', fontWeight: '700', fontSize: '1.5rem', }}>Hi, {firstName}</p>
                <p style={{ marginTop: '20px', marginLeft: '10px' }}>Welcome to your dashboard</p>
                <div className='first-box'></div>
                <div className='second-box'></div>
                <div className='third-box'></div>
                <div className='fourth-box'></div>
                <div className='fifth-box'></div>
                <div className='sixth-box'></div>
                <div className='seventh-box'></div>
                <div className='eight-box'></div>
                <div className='nineth-box'></div>
            </div>
            <div className='stat-area'>
                <div className='stat-box'>
                    <p style={{fontSize:'0.7rem',color:'gray',fontFamily:'Roboto'}}>TOTAL NO OF CUSTOMER</p>
                    <p style={{fontWeight:'800'}}>{localStorage.getItem("totalUser")}</p>
                </div>
                <div className='stat-box'>
                    <p style={{fontSize:'0.7rem',color:'gray',fontFamily:'Roboto'}}>TOTAL NO OF LOCATIONS</p>
                    <p style={{fontWeight:'800'}}>{localStorage.getItem("totalLocation")}</p>
                </div>
                <div className='stat-box'>
                    <p style={{fontSize:'0.7rem',color:'gray',fontFamily:'Roboto'}}>TOTAL NO OF PRODUCTS</p>
                    <p style={{fontWeight:'800'}}>{localStorage.getItem("totalProduct")}</p>
                </div>
                <div className='stat-box'>
                    <p style={{fontSize:'0.7rem',color:'gray',fontFamily:'Roboto'}}>TOTAL  PRODUCT CATEGORY</p>
                    <p style={{fontWeight:'800'}}>{localStorage.getItem("totalProductCategory")}</p>
                </div>

            </div>



        </div>

    )
}


function mapStateToProps(state) {
    return {
        firstName: state.userReducer.firstName,
    };
}
const mapDispatchToProps = (dispatch) => ({

    UpdateUser(payload) {
        dispatch({ type: "UPDATE_USER", payload });
    },

    LoadUsers(payload) {
        dispatch({ type: "LOAD_USERS", payload });
    },
    AddUser(payload) {
        dispatch({ type: "ADD_USER", payload });
    },

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatComponent);
