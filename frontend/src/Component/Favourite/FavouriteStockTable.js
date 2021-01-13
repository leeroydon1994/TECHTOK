// Logic:
// 1. onClick function, send data(name, symbol) to the backend by axios
// 2. backend, router => controller, one file per feature
// 3. Query the table, check if the data exists
// 4. Send back the data to controller, then the frontend
// 5. Update the data by axios, render the button

import React from "react";
import { Button } from "@material-ui/core";

import StockInfoFull from "../StockTable/StockInfoFull";

export default class FavouriteStockTable extends React.Component {
  render() {
    return this.props.type.map((stock) => (
      <tr className="stock-row" key={this.props.type.indexOf(stock)}>
        <StockInfoFull stock={stock} />

        <td>
          <Button
            variant="contained"
            color="default"
            id={`${stock["symbol"]}-${this.props.type.indexOf(stock)}-delete`}
            onClick={() => this.props.delete(stock)}
            className={`${stock["symbol"]}-delete`}
            style={{ display: "initial" }}
          >
            DELETE
          </Button>
        </td>
      </tr>
    ));
  }
}

//   return type.map((stock) => (
//     <tr className="stock-row" key={type.indexOf(stock)}>
//       <td className="stock-info">{stock["name"]}</td>
//       <td className="stock-info">{stock["symbol"]}</td>
//       <td className="stock-info">{stock["last"]}</td>
//       <td className="stock-info">{stock["netChange"]}</td>
//       <td className="stock-info">{stock["pctChange"] + "%"}</td>
//       <td>
//         <Button
//           variant="contained"
//           color="primary"
//           id={`${stock["symbol"]}-add`}
//           onLoad={getFaveData(stock)}
//           onClick={() => {
//             addFaveData(stock);
//           }}
//           className="add-fave"
//           style={{ display: "initial" }}
//         >
//           Add
//         </Button>
//       </td>
//       <td>
//         <Button
//           variant="contained"
//           color="default"
//           id={`${stock["symbol"]}-delete`}
//           onLoad={getFaveData(stock)}
//           onClick={() => deleteFaveData(stock)}
//           className="delete-fave"
//           style={{ display: "none" }}
//         >
//           DELETE
//         </Button>
//       </td>
//     </tr>
//   ));
// }
