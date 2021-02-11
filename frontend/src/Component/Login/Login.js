import React from "react";
import { connect } from "react-redux";
import { loginUserThunk, loginFacebookThunk } from "../../Redux/Auth/actions";
import "./loginStyle.css";
import FacebookLogin from "react-facebook-login";
import { Redirect, withRouter } from "react-router";

import { Button } from "@material-ui/core";
import { Input } from "reactstrap";

export class PureLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  login = () => {
    console.log("LOGIN");
    this.props.loginRedux(this.state.email, this.state.password);

    // if (this.props.isAuthenticated) {
    // }
  };

  componentClick() {
    return null;
  }

  responseFacebook = (userInfo) => {
    if (userInfo) {
      this.props.loginFacebookRedux(userInfo);
    }
    return null;
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-wrapper">
        <form>
          <div className="login-form">
            <div className="login-text-box">
              <h1>TECHTOK</h1>
              <p className="Intro">
                Start thinking and researching stocks. <span>Simply Technically.</span>
              </p>

              <p>
                "Whatever happens in the stock market <em>today</em> has happened <em>before</em> and will happen{" "}
                <em>again</em>
                .”
              </p>
              <cite>- Jesse Livermore</cite>
            </div>
            <div className="form-group">
              <Input
                onChange={this.onEmailChange}
                type="email"
                value={this.state.email}
                className="form-control"
                placeholder="Email Address"
                autoComplete="email"
                inputProps={{ "aria-label": "description" }}
              />
            </div>

            <br />
            <div className="form-group">
              <Input
                onChange={this.onPasswordChange}
                type="password"
                value={this.state.password}
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                inputProps={{ "aria-label": "description" }}
              />
            </div>
            <br />

            <div className="login-button-box">
              <div className="form-group">
                <Button
                  className="btn btn-primary btn-lg login-button-login-page"
                  onClick={() => {
                    this.login();
                  }}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Login
                </Button>
              </div>
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name, email, picture"
                onClick={this.componentClick}
                callback={this.responseFacebook}
                className="facebook-button"
                icon="fa-facebook"
              />
            </div>

            <div className="form-group">
              <Button
                className="btn btn-primary btn-lg signup-button-login-page"
                variant="contained"
                size="large"
                color="primary"
                href="/signup"
              >
                Sign Up
              </Button>
            </div>

            {/* <div className="form-group">
              <Button className="btn btn-primary btn-lg" href="/signup" variant="outlined" size="large" color="primary">
                Login
              </Button>
            </div> */}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authStore.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginRedux: (email, password) => {
      dispatch(loginUserThunk(email, password));
    },
    loginFacebookRedux: (userInfo) => {
      dispatch(loginFacebookThunk(userInfo));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PureLogin));
