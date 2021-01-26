// API: Bloomberg Stock API

import React from "react";
// import axios from "axios";
// import Button from '@material-ui/core/Button';
import StockChart from "./StockChart";
import StockList from "./StockMoversList";
import "./DashboardStyles.css";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        {/* <h1 className="dashboard-title1">Dashboard</h1> */}
        <div className="graph">
          <StockChart />
        </div>
        <div className="dashboard-stocks">
          <StockList />
        </div>
      </div>
    );
  }
}
