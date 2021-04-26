import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import IconSearch from '../../../assets/icons/icon-search';
import IconBellNew from '../../../assets/icons/icon-bell-new';
import { connect } from "react-redux";
import history from '../../../router/browserrouter';
import './header.styles.scss';

function logout() {
    localStorage.clear();
    history.push("/user/login")

}
function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    return (
        <Row style={{ height: '60px', backgroundColor: 'white' }} vertical="center" horizontal="space-between" {...otherProps}>
            <span className='title'></span>
            
            <Row vertical="center">
            <i className="fas fa-user-tie"></i>
            <nav style={{marginRight:'2rem'}} role="navigation">
                <ul>
                    <li><a href="#">{props.firstname}</a>
                        <ul className="dropdown">
                            <li><a onClick={()=>logout()}>Log out</a></li>
                        </ul>
                    </li>
                </ul>
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

