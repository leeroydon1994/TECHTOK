// import React, { useState } from "react";
import React from "react";
import * as FaIcons from "react-icons/fa"; // Import all asUse "FaIcons.IconName" as class name
// import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { LoginSidebarData } from "./LoginSidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { logoutNowThunk } from "../../Redux/Auth/actions";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Footer from "./NavbarFooter";

//Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// export default function Navbar(props) {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <div>
//       {props.isAuthenticated ? (
//         <div>
//           <div>
//             <IconContext.Provider value={{ color: "#fff" }}>
//               <div className="navbar">
//                 <Link to="#" className="menu-bars">
//                   <FaIcons.FaBars onClick={showSidebar} />
//                 </Link>
//               </div>
//               <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//                 <ul className="nav-menu-items" onClick={showSidebar}>
//                   <li className="navbar-toggle">
//                     <h1>TECHTOK</h1>
//                   </li>
//                   {SidebarData.map((item, index) => {
//                     return (
//                       <li key={index} className={item.cName}>
//                         <Link to={item.path}>
//                           {item.icon}
//                           <span>{item.title}</span>
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </nav>
//             </IconContext.Provider>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <IconContext.Provider value={{ color: "#fff" }}>
//             <div className="navbar">
//               <Link to="#" className="menu-bars">
//                 <FaIcons.FaBars onClick={showSidebar} />
//               </Link>
//             </div>
//             <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//               <ul className="nav-menu-items" onClick={showSidebar}>
//                 <li className="navbar-toggle">
//                   <h1>TECHTOK</h1>
//                 </li>
//                 {SidebarData.map((item, index) => {
//                   return (
//                     <li key={index} className={item.cName}>
//                       <Link to={item.path}>
//                         {item.icon}
//                         <span>{item.title}</span>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>
//           </IconContext.Provider>
//         </div>
//       )}
//     </div>
//   );
// }

export class Navbar extends React.Component {
  // const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);

  constructor(props) {
    super(props);

    this.state = {
      sidebar: false,
    };

    this.showSidebar = this.showSidebar.bind(this);
  }

  showSidebar() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  logout = () => {
    this.props.logoutRedux();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <div>
              <IconContext.Provider value={{ color: "#f5f5f5" }}>
                <div className="navbar">
                  <div className="left-elements">
                    <Link to="#" className="menu-bars">
                      <FaIcons.FaBars onClick={this.showSidebar} />
                    </Link>
                  </div>
                  <Button
                    style={{ backgroundColor: "#36364b", fontWeight: 600 }}
                    variant="contained"
                    size="large"
                    color="primary"
                    className="logoutbutton"
                    onClick={this.logout}
                    startIcon={<ExitToAppIcon />}
                  >
                    Log out
                  </Button>
                </div>
                <nav
                  className={
                    this.state.sidebar ? "nav-menu active" : "nav-menu"
                  }
                >
                  <ul className="nav-menu-items" onClick={this.showSidebar}>
                    <li className="navbar-toggle">
                      <h1>TECHTOK</h1>
                    </li>
                    {LoginSidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                    <div className="footer">
                      <Footer />
                    </div>
                  </ul>
                </nav>
              </IconContext.Provider>
            </div>
          </div>
        ) : (
          // <div></div>
          <div>
            <IconContext.Provider value={{ color: "#f5f5f5" }}>
              <div className="navbar">
                <Link to="#" className="menu-bars">
                  <FaIcons.FaBars onClick={this.showSidebar} />
                </Link>
              </div>
              <nav
                className={this.state.sidebar ? "nav-menu active" : "nav-menu"}
              >
                <ul className="nav-menu-items" onClick={this.showSidebar}>
                  <li className="navbar-toggle">
                    <h1>TECHTOK</h1>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <div className="footer">
                    <Footer />
                  </div>
                </ul>
              </nav>
            </IconContext.Provider>
          </div>
        )}
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
    logoutRedux: () => {
      dispatch(logoutNowThunk());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
