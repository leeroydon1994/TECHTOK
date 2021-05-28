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

    this.user = localStorage.getItem("token");

    this.getFaveData = this.getFaveData.bind(this);
    this.addFaveData = this.addFaveData.bind(this);
    this.deleteFaveData = this.deleteFaveData.bind(this);
  }

  // Change the color of the button
  changeDeleteButtonStyle(symbol) {
    let buttonAdd = document.getElementsByClassName(`${symbol}-add`);
    let buttonDelete = document.getElementsByClassName(`${symbol}-delete`);

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

    let displayArray = ["display: initial", "display: none"];

    for (let i = 0; i < buttonAdd.length; i++) {
      buttonAdd[i].setAttribute("style", displayArray[0]);
    }
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].setAttribute("style", displayArray[1]);
    }
  }

  getFaveData(stock) {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/stock/`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        if (res.data.some((row) => row.symbol === stock["symbol"])) {
          this.changeDeleteButtonStyle(stock["symbol"]);
        }
      })
      .catch((err) => console.error(err));
  }

  addFaveData(stock) {
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/stock/`,
        {
          company: stock["name"],
          symbol: stock["symbol"],
        },
        {
          headers: { Authorization: `Bearer ${this.user}` },
        },
      )
      .then((res) => {
        if (res.data.some((row) => row.symbol === stock["symbol"])) {
          this.changeDeleteButtonStyle(stock["symbol"]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteFaveData(stock) {
    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/stock/${stock["symbol"]}`,
        {
          headers: { Authorization: `Bearer ${this.user}` },
        },
      )
      .then((res) => {
        if (res.data.some((row) => row.symbol !== stock["symbol"])) {
          this.changeAddButtonStyle(stock["symbol"]);
        } else if (res.data.length === 0) {
          this.changeAddButtonStyle(stock["symbol"]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return this.props.type.map((stock) => (
      <tr
        className="stock-row"
        key={this.props.type.indexOf(stock)}
        onLoad={this.getFaveData(stock)}
      >
        {this.props.group === "nasdaq" ? (
          <StockInfoFull stock={stock} />
        ) : (
          <StockInfoShort stock={stock} />
        )}

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
