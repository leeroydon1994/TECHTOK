import * as React from "react";
import { connect } from "react-redux";

import { logoutNowThunk } from "../../Redux/Auth/actions";

class Header extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }

  logout = () => {
    this.props.logoutRedux();
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => {
      dispatch(logoutNowThunk());
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);
