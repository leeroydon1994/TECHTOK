// API: Bloomberg Stock API

import React from "react";
import StockChart from "./StockChart";
import StockList from "./StockMoversList";
import "./DashboardStyles.css";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-wrapper">
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
