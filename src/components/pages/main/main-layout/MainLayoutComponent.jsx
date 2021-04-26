
import React from 'react'
import Employees from '../employee/Employees'
import './main.styles.scss';
import HeaderComponent from '../../header/HeaderComponent'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SidebarComponent from '../../SideBar/SidebarComponent'

export const MainLayoutComponent = props => {
   
    return (
        <div className='main-layout'>
            <div className='first'>
            <SidebarComponent />
            </div>
          
            <div className='main-area' >
             <HeaderComponent />
                {props.children}
            </div>
        </div>
    )
}


export default MainLayoutComponent