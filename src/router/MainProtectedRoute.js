import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MainLayoutComponent from '../components/pages/main/main-layout/MainLayoutComponent'

const MainProtectedRoute = ({ component: Component, isHaveCompany: isHaveCompany, isAuthenticated: isAuthenticated, ...rest }) => {

    return (

        <Route {...rest} render={props => {
            if (!isAuthenticated) {
                return (<Redirect to={{ pathname: "/user/login", state: { from: props.location } }} />)
            }
                return (<MainLayoutComponent>
                    <Component {...props} />
                </MainLayoutComponent>)
        }} />
    )
}

export default MainProtectedRoute