import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import IconSearch from '../../../assets/icons/icon-search';
import IconBellNew from '../../../assets/icons/icon-bell-new';
import { connect } from "react-redux";
import history from '../../../router/browserrouter';
import './header.styles.scss';
import {Link} from "react-router-dom";

function logout() {
    localStorage.clear();
  
}
function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    return (
        <Row style={{ height: '60px', backgroundColor: 'white' }} vertical="center" horizontal="space-between" {...otherProps}>
            <span className='title'></span>
            
            <Row vertical="center">
            <i style={{margin:'2rem'}} className="fas fa-user-tie"></i>
            {props.firstname}
            <nav style={{margin:'2rem'}} role="navigation">
            <Link  onClick={()=>logout()}  style={{cursor:'pointer',color:'white',height:'30px',
            width:'60px',backgroundColor:'black',outlineColor:'black',
            borderRadius:'8px',display:'inline-block',textAlign:'center',paddingTop:'3px'}}   to={'/user/login'}>
             Logout
            </Link>
            </nav>
            <div className='seperator'></div>
            <div className='seperator'></div>
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};



function mapStateToProps(state) {
    return {
        firstname: state.userReducer.firstName,
    };
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

