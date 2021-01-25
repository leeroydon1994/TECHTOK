import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../Component/Navbar/Navbar";
import { connect } from "react-redux";

// import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import Nasdaq100Page from "./Nasdaq100Page";
import RatingsPage from "./RatingsPage";
import FavouritePage from "./FavouritePage";
import CurrencyPage from "./CurrencyPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import BlogPage from "./BlogPage";
import NewsPage from "./NewsPage";
// import Footer from "../Component/Navbar/NavbarFooter";

export default class LandingPage extends React.Component {
  render() {
    // const array = ["Apples", "Bananas", "Carrots"];

    const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
      const Component = component;
      if (Component != null) {
        return (
          <Route
            {...rest}
            render={(props) =>
              isAuthenticated ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              )
            }
          />
        );
      } else {
        return null;
      }
    };

    const PrivateRoute = connect((state) => ({
      isAuthenticated: state.authStore.isAuthenticated,
    }))(PurePrivateRoute);

    return (
      <div>
        <Router>
          <NavBar isAuthenticated={this.props.isAuthenticated} />
          <Switch>
            {/* <PrivateRoute exact path="/" component={HomePage} /> */}
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute exact path="/nasdaq100" component={Nasdaq100Page} />
            <PrivateRoute exact path="/ratings" component={RatingsPage} />
            <PrivateRoute exact path="/favorites" component={FavouritePage} />
            <PrivateRoute exact path="/currency" component={CurrencyPage} />
            <PrivateRoute exact path="/blog" component={BlogPage} />
            <PrivateRoute exact path="/news" component={NewsPage} />

            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
          </Switch>
        </Router>
        {/* <div
          className="footer13"
          style={{ position: "relative", top: 1700, left: 800 }}
        >
          <Footer />
        </div> */}
      </div>
    );
  }
}

/*

  <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/currency-converter">Currency Converter</Link>
      <Link to="/timer">Timer </Link>
      <Link to="/clock">Clock</Link>

*/
