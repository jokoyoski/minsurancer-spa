import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginComponent from '../components/pages/onboarding/login/LoginPageComponent';
import { connect } from "react-redux";
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import OnBoardingLayout from '../components/pages/onboarding/onboarding-layout/OnBoardingLayout';
import AddCompanyComponent from '../components/pages/onboarding/company/AddCompanyComponent';
import ProductCategory from '../components/pages/main/product-category/ProductCategory'
import Booking from '../components/pages/main/booking/Booking';
import Subscriptions from '../components/pages/main/subscription/Subscription'
import Service from '../components/pages/main/service/Service'
import ProtectedRoute from '../router/ProtectedRoute';
import LoadingOverlay from 'react-loading-overlay';
import MainProtectedRoute from '../router/MainProtectedRoute';
import EmployeeForm from '../components/pages/main/employee/EmployeeForm';
import Product from '../components/pages/main/product/Product';
import Location from '../components/pages/main/location/Location';
import  Order  from '../components/pages/main/order/Order';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


class App extends React.Component {
  state = { selectedItem: 'Tickets' };
   isAuthenticated = false;
  constructor(props) {

    super();

    if (props.roles.includes("System Admin")) {
      this.isAuthenticated=true
    } 
  }



  componentDidMount() {

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }


  resize = () => this.forceUpdate();

  render() {
    return (

      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/user" component={OnBoardingLayout} />
            <ProtectedRoute
              isAuthenticated={this.isAuthenticated}
              path="/add-company"
              component={AddCompanyComponent}
            />
            <LoadingOverlay
              active={this.props.spinner}
              spinner
            >
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/user' component={EmployeeForm} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/product-category' component={ProductCategory} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/product' component={Product} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/locations' component={Location} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/order' component={Order} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/bookings' component={Booking} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/subscriptions' component={Subscriptions} />
              <MainProtectedRoute isAuthenticated={this.isAuthenticated}  path='/main/services' component={Service} />
            </LoadingOverlay>

            <Route exact path="/" component={LoginComponent} />

          </Switch>
        </Router>
        <CssBaseline />
      </ThemeProvider>
    );
  }


}

function mapStateToProps(state) {
  return {
    roles: state.userReducer.roles,
    buttonloader: state.utilityReducer.buttonloader,
    spinner: state.utilityReducer.spinner
  };
}
const mapDispatchToProps = (dispatch) => ({

  SetLoader() {
    dispatch({ type: "LOADING_BUTTON_SPINNER", });
  },

})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);