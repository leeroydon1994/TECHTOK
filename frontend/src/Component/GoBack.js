import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class GoBack extends React.Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Button className="btn btn-danger" onClick={this.goBack}>
          Go Back
        </Button>
      </div>
    );
  }
}

export default GoBack = withRouter(GoBack);
