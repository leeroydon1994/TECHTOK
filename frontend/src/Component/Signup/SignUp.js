import React from "react";
import "./signupstyle.css";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
// import { withRouter } from 'react-router-dom';
import { signupUserThunk /*signupUserFatchThunk*/ } from "../../Redux/Signup/actions";
import { Input } from "reactstrap";

import { withRouter } from "react-router";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // let accessToken = localStorage.getItem("token");
    // this.props.signupUserFatchRedux(accessToken);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.signupRedux({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="signup-wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="signup-form">
            <div className="signup-text-box">
              <h1>TECHTOK</h1>
              <p>
                “In any sector, trade the leading stock – the one showing the <em>strongest</em> trend”
              </p>
              <cite>- Jesse Livermore</cite>
            </div>
            <div className="form-group">
              <Input
                value={this.state.name}
                onChange={this.onChange}
                type="name"
                name="name"
                className="signup-form-control"
                placeholder="Username"
                inputProps={{ "aria-label": "description" }}
              />
            </div>

            <div className="form-group">
              <Input
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                name="email"
                className="signup-form-control"
                placeholder="Email Address"
                inputProps={{ "aria-label": "description" }}
              />
            </div>

            <div className="form-group">
              <Input
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                className="signup-form-control"
                placeholder="Password"
                inputProps={{ "aria-label": "description" }}
              />
            </div>

            <div className="form-group">
              <Input
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                type="password"
                name="passwordConfirmation"
                className="signup-form-control"
                placeholder="Confirm password"
                inputProps={{ "aria-label": "description" }}
              />
            </div>

            <div className="signup-button-box">
              <div className="form-group">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className="btn btn-primary btn-lg signup-button-signup-page"
                >
                  Sign Up
                </Button>
              </div>

              <div className="form-group">
                <Button
                  className="btn btn-primary btn-lg login-button-signup-page"
                  variant="contained"
                  size="large"
                  color="primary"
                  href="/login"
                >
                  Already a member? Log in
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.signupStore.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupRedux: (user) => dispatch(signupUserThunk(user)),
    // signupUserFatchRedux: (accessToken) =>
    //   dispatch(signupUserFatchThunk(accessToken)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
