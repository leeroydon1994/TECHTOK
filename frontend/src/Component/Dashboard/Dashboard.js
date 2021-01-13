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
        <br />
        <h1 className="dashboard-title1">Dashboard</h1>
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

//   return (
//     <div className="nasdaq100-wrapper">
//       <br />
//       <h1>Dashboard</h1>
//       <Table striped>
//         <div className="active-stocks">
//           <div className="stocks-container">
//             <h2>Movers</h2>
//             <table className="stock-table">
//               <thead>{StockDescription()}</thead>
//               <tbody>{StockTable(activeStocks)}</tbody>
//             </table>
//           </div>
//         </div>

//         <div className="laggard-stocks">
//           <div className="stocks-container">
//             <h2>Laggards</h2>
//             <table className="stock-table">
//               <thead>{StockDescription()}</thead>
//               <tbody>{StockTable(laggardStocks)}</tbody>
//             </table>
//           </div>
//         </div>

//         <div className="leader-stocks">
//           <div className="stocks-container">
//             <h2>Leaders</h2>
//             <table className="stock-table">
//               <thead>{StockDescription()}</thead>
//               <tbody>{StockTable(leaderStocks)}</tbody>
//             </table>
//           </div>
//         </div>

//         <div className="button stock-refresh-button">
//           {/* <Button onClick={this.callStockAPI}>Refresh</Button> */}
//         </div>
//       </Table>
//     </div>
//   );
// }
// }
