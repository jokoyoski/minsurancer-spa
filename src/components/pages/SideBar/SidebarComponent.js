import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { SideBarData } from './SideBarData';
import { connect } from "react-redux";
import IconBurger from '../../../assets/icons/icon-burger';
import Logo from '../../../assets/images/miniinsurance.png';
import '../SideBar/side-menu.styles.scss';
import { SubMenu } from './SubMenu';
const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 19
    },
    container: {
        backgroundColor: 'rgb(54, 55, 64) !important',
        width: 255,
        paddingTop: 32,
        minHeight: '600px',
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 255,
        minHeight: '775px',
        maxHeight: '775px',
        zIndex: 901
    },
    mainContainer: {
        height: '100%',
        minHeight: '100vh'
    },
    mainContainerMobile: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh',
    },
    menuItemList: {
        marginTop: 52
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
});

class SidebarComponent extends React.Component {


    state = { expanded: false };
    
   

    isMobile = () => window.innerWidth <= 768;

    toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    renderBurger = () => {
        return <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
            <IconBurger />
        </div>
    }

    render() {
         var i=0;

        const { expanded } = this.state;
        console.log(expanded)
        const isMobile = this.isMobile();
        var roles = JSON.parse(localStorage.getItem("roles"))
        return (
            <div style={{ position: 'relative', maxHeight: '700px' }}>
                <Row className='mainContainer-menu' breakpoints={{ 768: css(styles.mainContainerMobile, (expanded && styles.mainContainerExpanded)) }}>
                    {(isMobile && !expanded) && this.renderBurger()}
                    <Column style={{ backgroundColor: 'rgb(54, 55, 64) !important', overflowX: 'scroll' }} className={css(styles.container)} breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
                        <div style={{ paddingLeft: '20px', backgroundColor:'white' ,width:'90%' ,margin:'0 auto' }}>
                            <img alt={"logo"}  src={Logo} />
                        </div>
                        <Column className={css(styles.menuItemList)}>
                           {SideBarData.map((value) => {
                                if (value.role.split(",").includes(roles[0])) {
                                    return <SubMenu {...value} key={value.title} />
                                }
                            }
                            )}
                        </Column>
                    </Column>
                    {(isMobile && expanded) && <div className={css(styles.outsideLayer)} onClick={this.toggleMenu}></div>}
                </Row>
            </div>
        );
    };
}
export default SidebarComponent

