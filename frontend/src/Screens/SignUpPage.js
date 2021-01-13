import React from "react";
import SignUp from "../Component/Signup/SignUp";

export default class SignUpPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offsey-4">
          <SignUp />
        </div>
      </div>
    );
  }
}
