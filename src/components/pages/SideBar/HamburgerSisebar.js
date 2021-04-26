import { slide as Menu } from 'react-burger-menu'
import React from 'react';
import './side-menu.styles.scss';
import history from '../../../router/browserrouter';
import {Link} from 'react-router-dom';

class HamburgerSideBar extends React.Component {
    showSettings(event) {
        event.preventDefault();
        history.push("/main/dashboard")
    }

    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu>
            
                <div className="dropdown">
                    <button className="dropbtn">Admin
            <i class="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link  to="/main/dashboard">Main</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Admin2
            <i class="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="/">Link 1</a>
                        <a href="/">Link 2</a>
                        <a href="/">Link 3</a>
                    </div>
                </div>

            </Menu>
        );
    }
}

export default HamburgerSideBar;
