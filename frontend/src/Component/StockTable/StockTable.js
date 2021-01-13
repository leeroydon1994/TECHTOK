// Logic:
// 1. onClick function, send data(name, symbol) to the backend by axios
// 2. backend, router => controller, one file per feature
// 3. Query the table, check if the data exists
// 4. Send back the data to controller, then the frontend
// 5. Update the data by axios, render the button

import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import StockInfoShort from "./StockInfoShort";
import StockInfoFull from "./StockInfoFull";

export default class StockTable extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   stockBoolean: [],
    // };

    this.user = localStorage.getItem("token");

    this.getFaveData = this.getFaveData.bind(this);
    this.addFaveData = this.addFaveData.bind(this);
    this.deleteFaveData = this.deleteFaveData.bind(this);
  }

  // Button switch
  // beforeFavoriteBoolean(symbol) {
  //   // Search if the stock name is inside the state
  //   console.log(this.state.stockBoolean);
  //   if (this.state.stockBoolean.some((item) => item.symbol === symbol)) {
  //     let newStockBoolean = this.state.stockBoolean.slice();
  //     newStockBoolean[this.state.stockBoolean.findIndex((element) => element.stock === symbol)] = {
  //       symbol: symbol,
  //       boolean: true,
  //     };
  //     console.log(newStockBoolean);
  //     this.setState({ stockBoolean: newStockBoolean });
  //   } else {
  //     // If the stock name is yet to be registered
  //     this.setState({
  //       stockBoolean: [...this.state.stockBoolean, { symbol: symbol, boolean: true }],
  //     });
  //   }
  // }

  // addedFavoriteBoolean(symbol) {
  //   // Search if the stock name is inside the state
  //   if (this.state.stockBoolean.some((item) => item.stock === symbol)) {
  //     let newStockBoolean = this.state.stockBoolean.slice();
  //     newStockBoolean[this.state.stockBoolean.findIndex((element) => element.stock === symbol)] = {
  //       stock: symbol,
  //       boolean: false,
  //     };
  //     console.log(newStockBoolean);

  //     this.setState({ stockBoolean: newStockBoolean });
  //   } else {
  //     // If the stock name is yet to be registered
  //     this.setState({
  //       stockBoolean: [...this.state.stockBoolean, { symbol: symbol, boolean: false }],
  //     });
  //   }
  // }

  //----

  // Change the color of the button
  changeDeleteButtonStyle(symbol) {
    // let buttonAdd = document.getElementById(`${symbol}-${id}-${type}-add`);
    // let buttonDelete = document.getElementById(`${symbol}-${id}-${type}-delete`);
    let buttonAdd = document.getElementsByClassName(`${symbol}-add`);
    let buttonDelete = document.getElementsByClassName(`${symbol}-delete`);

    console.log(buttonAdd);
    let displayArray = ["display: initial", "display: none"];

    for (let i = 0; i < buttonAdd.length; i++) {
      buttonAdd[i].setAttribute("style", displayArray[1]);
    }
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].setAttribute("style", displayArray[0]);
    }
  }

  changeAddButtonStyle(symbol) {
    let buttonAdd = document.getElementsByClassName(`${symbol}-add`);
    let buttonDelete = document.getElementsByClassName(`${symbol}-delete`);

    console.log(buttonAdd);
    let displayArray = ["display: initial", "display: none"];

    for (let i = 0; i < buttonAdd.length; i++) {
      buttonAdd[i].setAttribute("style", displayArray[0]);
    }
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].setAttribute("style", displayArray[1]);
    }
  }

  // ----

  // Interaction with backend
  getFaveData(stock) {
    console.log(this.user);

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/stock/`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(stock["symbol"]);
        console.log(res.data);

        if (res.data.some((row) => row[0].symbol === stock["symbol"])) {
          console.log("Change button for " + stock["symbol"] + "!");
          this.changeDeleteButtonStyle(stock["symbol"]);
          // this.addedFavoriteBoolean(stock["symbol"]);
        } else {
          console.log("Not to change the button for " + stock["symbol"] + "!");
          // this.beforeFavoriteBoolean(stock["symbol"]);
        }
      })
      .catch((err) => console.log(err));
  }

  addFaveData(stock) {
    console.log(stock["name"], stock["symbol"]);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/stock/`,
        {
          company: stock["name"],
          symbol: stock["symbol"],
        },
        {
          headers: { Authorization: `Bearer ${this.user}` },
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.some((row) => row[0].symbol === stock["symbol"])) {
          this.changeDeleteButtonStyle(stock["symbol"]);
          console.log(stock["symbol"] + "is added to the favorite list.");
          // this.addedFavoriteBoolean(stock["symbol"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFaveData(stock) {
    console.log(stock["name"], stock["symbol"]);

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/stock/${stock["symbol"]}`,
        {
          headers: { Authorization: `Bearer ${this.user}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.some((row) => row[0].symbol !== stock["symbol"])) {
          this.changeAddButtonStyle(stock["symbol"]);
          // this.beforeFavoriteBoolean(stock["symbol"]);
          console.log(stock["symbol"] + "is deleted from the favorite list.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return this.props.type.map((stock) => (
      <tr
        className="stock-row"
        key={this.props.type.indexOf(stock)}
        onLoad={this.getFaveData(stock)}
      >
        {/* {Separate the table data to be inserted as different components} */}
        {this.props.group === "nasdaq" ? (
          <StockInfoFull stock={stock} />
        ) : (
          <StockInfoShort stock={stock} />
        )}
        {/* {Determine the type of button by the state of the stock} */}

        <td>
          <Button
            variant="contained"
            color="primary"
            id={`${stock["symbol"]}-${this.props.type.indexOf(stock)}-${
              this.props.group
            }-add`}
            onClick={() => {
              this.addFaveData(stock);
            }}
            className={`${stock["symbol"]}-add`}
            style={{ display: "initial" }}
          >
            Add
          </Button>

          <Button
            variant="contained"
            color="default"
            id={`${stock["symbol"]}-${this.props.type.indexOf(stock)}-${
              this.props.group
            }-delete`}
            onClick={() => this.deleteFaveData(stock)}
            className={`${stock["symbol"]}-delete`}
            style={{ display: "none" }}
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
