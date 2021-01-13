import * as React from "react";
import Currency from "../Component/Currency/Currency";

export default class CurrencyPage extends React.Component {
  // logout = () => {
  //     this.props.logoutMDP()
  // }
  render() {
    return (
      <div>
        <Currency />
        {/* <button onClick={this.logout}>Now you can Logout</button> */}
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logoutMDP: () => {
//             dispatch(logoutNowThunk())
//         }
//     }
// }
// export default connect(null, mapDispatchToProps)(CurrencyPage)
